const mongoose = require('mongoose');
const Jobs = mongoose.model('jobs_complete');

const find = query => Jobs.find(query);

const findById = id => Jobs.findById(id);

const previewById = id => Jobs.findById(id).select({
  "Job Title:": 1, 
  "Organization:": 1, 
  "_id" : 1, 
  "Job Summary:": 1,
  "cover_letter": 1,
});

const findAll = query => Jobs.findAll(query);

const search = query => new Promise((resolve, reject) => {
  Jobs.search(query.query, {hydrate: true, ...query.pagination},(err, res) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    resolve(res);
  });
});

const paginate = query => new Promise((resolve, reject) => {
  Jobs.paginate(
    query['q'],
    {
      page: query['page'],
      limit:query['limit'],
      sort: {"Organization:": 1}
    }, (err, res) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    resolve(res);
  });
});

const distinct = query => new Promise((resolve, reject) => {
  Jobs.distinct(query, (err, res) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    resolve(res);
  });
});

const aggregate = query => new Promise((resolve, reject) => {
  Jobs.aggregate(query, (err, res) => {
    if (err) {
        console.log(err);
        return reject(err);
    }
    resolve(res);
  });
});

module.exports = {
  find,
  findById,
  previewById,
  findAll,
  search,
  paginate,
  distinct,
  aggregate
};