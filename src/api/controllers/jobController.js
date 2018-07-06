const queryUtils = require('../../utils/queryUtils');
const log = require('../../utils/log');

const { Job } = require('../../models');

const jobService = require('../services/jobService');

const jobController = {};

jobController.fullFindId = async (req, res, next) => {
  try{
    const id = String(req.params.sampleid);
    if (Number.isNaN(id) || id < 0) {
      return res.status(400).send({ message: `${req.params.sampleid} is not a valid index id` });
    }
    var index = await jobService.findById(id)
    return index ? res.send(index) : res.status(404).json({ message: `index ${id} not found` })
  } catch(e) {
    console.log(e);
    next();
  }
};

jobController.previewFindId = async (req, res, next) => {
  try{
    const id = String(req.params.sampleid);
    if (Number.isNaN(id) || id < 0) {
      return res.status(400).send({ message: `${req.params.sampleid} is not a valid index id` });
    }
    var index = await jobService.findById(id)
    index = index ? {'_id' : index['_id'], 'Job Summary:' : index['Job Summary:'].length > 400 ? index['Job Summary:'].substring(0, 400 - 3) + "..." : index['Job Summary:'].substring(0, 400)} : index;
    // console.log(index);
    return index ? res.send(index) : res.status(404).json({ message: `index ${id} not found` })
  } catch(e) {
    console.log(e);
    next();
  }
};

var query = {query:{"match_all": {}}};

jobController.search = async (req, res, next) => {
  const multi_match = {};
  if (req.query.q) {
    const query = req.query.q;
    multi_match.query = query;
    multi_match.fields=["Job Title:", 'Job - Province / State:'];
  }

  const { pageSize, page } = req.context.pagination;

  const query = {
    size: pageSize,
    from: pageSize * page,
    query: { multi_match }
  };

  try {
    const results = await jobService.search(query);
    const docs = results.hits.hits;

    res.json(docs);
  } catch (e) {
    next(e);
  }
};

module.exports = jobController;
