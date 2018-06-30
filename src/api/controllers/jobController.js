const queryUtils = require('../../utils/queryUtils');
const log = require('../../utils/log');

const { Job } = require('../../models');

const jobService = require('../services/jobService');

const indexController = {};

indexController.findId = async (req, res, next) => {
  try{
    const id = String(req.params.sampleid);
    // Check to make sure id is valid
    if (Number.isNaN(id) || id < 0) {
      return res.status(400).send({ message: `${req.params.sampleid} is not a valid index id` });
    }
    // console.log(id, typeof(id))
    var index = await jobService.findById(id)
    // console.log(index);
    return index ? res.send(index) : res.status(404).json({ message: `index ${id} not found` })
  } catch(e) {
    console.log(e);
    next();
  }
};

var query = {query:{"match_all": {}}};

indexController.default = async (req, res, next) => {
  const bool = {};

  if (req.query.q) {
    const query = req.query.q;
    // console.log(query);
    const should = [];

    should.push(
        { term: { _id: { value: query, boost: 100 } } },
        {
          query_string: {
            default_field: "Job Title:",
            default_operator: 'AND',
            query: queryUtils.fuzzyifyString(query),
            phrase_slop: 5
          }
        }
    );

    bool.should = should;
    bool.minimum_should_match = 1;
  }

  const { pageSize, page } = req.context.pagination;

  const query = {
    size: pageSize,
    from: pageSize * page,
    query: { bool }
  };

  try {
    const results = await jobService.search(query);
    const docs = results.hits.hits;

    res.json(docs);
  } catch (e) {
    next(e);
  }
};

module.exports = indexController;
