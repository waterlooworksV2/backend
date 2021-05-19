const router = require('express').Router();
const auth = require('../middleware/auth');
const jobService = require('../services/jobService');
const isPaginated = require('../policies/isPaginated');

router.get('/', [auth.required, isPaginated], async (req, res, next) => {
  const { payload: { id } } = req;
  const { pageSize, page } = req.context.pagination;
  
  let count_query = [
    { '$count': 'total_hits' },
  ];
  
  let query = [
    { '$skip': page*pageSize },
    { '$limit': pageSize },
  ];
  if(req.query.q.length != 0){
    const search_query = [{
        '$search': {
          'index': 'default', 
          'text': {
            'query': req.query.q, 
            'path': {
              'wildcard': '*'
            }
          }
        }
      },
      {
        '$project': {
          'id': 1, 
          'score': {
            '$meta': 'searchScore'
          }
        }
      }
    ]

    const sort_query = [
      {
        '$sort': {
          'score': -1, 
          'id': 1
        }
      }
    ]
    query = search_query.concat(sort_query).concat(query);
    count_query = search_query.concat(count_query);
  } 
  
  let count;
  try {
    const count_result = await jobService.aggregate(count_query);
    count = count_result[0].total_hits;
  } catch (e) {
    next(e);
    return;
  }
  
  try {
    const results = await jobService.aggregate(query);
    var ids = [];
    for(const i of results){
      ids.push(parseInt(i['id']));
    }
    res.json({'pages': Math.ceil(count/pageSize), 'ids': ids});
  } catch (e) {
    next(e);
  }

  
});


module.exports = router;