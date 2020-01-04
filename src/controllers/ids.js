const router = require('express').Router();
const auth = require('../middleware/auth');
const jobService = require('../services/jobService');
const isPaginated = require('../policies/isPaginated');

router.get('/', [auth.required, isPaginated], async (req, res, next) => {
  const { payload: { id } } = req;
  const { pageSize, page } = req.context.pagination;
  var query = [];
  if(req.query.q === "") {
    var match_all = {};
    query = {
      query: {
        match_all: match_all,
      },
      pagination: {
        from: page*pageSize,
        size: pageSize,
        sort: {
          'Number of Job Openings:' : {"order" : "desc"}
        },
      },
      
    };
  } else {
    const multi_match = {};
    if (req.query.q) {
      multi_match.query = req.query.q;
      multi_match.fields=['_id', 'Job Title:', 'Targeted Degrees and Disciplines:', 'Organization:'];
    }
    query = {
      pagination: {
        from: page*pageSize,
        size: pageSize
      },
      query: {
        bool :{
          "should": [
            { "match": { '_id:':req.query.q }},
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
      ids.push(parseInt(docs[i]["_id"]))
    }
    console.log(results)
    res.json({"pages": Math.ceil(results.hits.total/pageSize), "ids": ids});
  } catch (e) {
    next(e);
  }
});


module.exports = router;