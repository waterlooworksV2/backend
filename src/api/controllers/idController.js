const queryUtils = require('../../utils/queryUtils');
const log = require('../../utils/log');

const { Job } = require('../../models');

const jobService = require('../services/jobService');

const idController = {};

idController.search = async (req, res, next) => {
  const { pageSize, page } = req.context.pagination;
  var query = [];
  if(req.query.q === "") {
    var match_all = {};
    query = {
      size: pageSize,
      from: pageSize * page,
      query: { match_all }
    };
  } else {
    const multi_match = {};
    if (req.query.q) {
      multi_match.query = req.query.q;
      multi_match.fields=['Job Title:', 'Targeted Degrees and Disciplines:', 'Organization:'];
    }
    query = {
      size: pageSize,
      from: pageSize * page,
      query: {
        bool :{
          "should": [
            { "match": { 'Job Title:':req.query.q }},
            { "match": { 'Targeted Degrees and Disciplines:':req.query.q }},
            { "match": { 'Organization:':req.query.q }}
          ],
          'filter': [
            {"match": {
              "Job - Country:": "United States"
            }}
          ]
        }
      }
    };
    // query = {
    //   size: pageSize,
    //   from: pageSize * page,
    //   query: {
    //     bool :{
    //       "should": [
    //         { "match": { 'Targeted Degrees and Disciplines:':req.query.q }}
    //       ]
    //     }
    //   }
    // };
  }
  try {
    const results = await jobService.search(query);
    const docs = results.hits.hits;
    var ids = [];
    for(i in docs){
      ids.push(docs[i]["_id"])
    }
    res.json({"pages": Math.ceil(results.hits.total.value/pageSize), "ids": ids});
  } catch (e) {
    next(e);
  }
};

module.exports = idController;
