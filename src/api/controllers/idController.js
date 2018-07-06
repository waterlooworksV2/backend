const queryUtils = require('../../utils/queryUtils');
const log = require('../../utils/log');

const { Job } = require('../../models');

const jobService = require('../services/jobService');

const idController = {};

var query = {query:{"match_all": {}}};

idController.search = async (req, res, next) => {
  const { pageSize, page } = req.context.pagination;
  if(req.query.q === "") {
    var match_all = {};
    const query = {
      size: pageSize,
      from: pageSize * page,
      query: { match_all }
    };
  } else {
    const multi_match = {};
    if (req.query.q) {
      const query = req.query.q;
      multi_match.query = query;
      multi_match.fields=['Job Title:', 'Job - Province / State:'];
    }

    const query = {
      size: pageSize,
      from: pageSize * page,
      query: { multi_match }
    };
  }

  try {
    const results = await jobService.search(query);
    const docs = results.hits.hits;
    var ids = []
    for(i in docs){
      ids.push(docs[i]["_id"])
    }
    res.json(ids);
  } catch (e) {
    next(e);
  }
};

module.exports = idController;
