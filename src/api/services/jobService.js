const { Job } = require('../../models');
const { extraLogger } = require('../../utils/log');

const find = query => Job.find(query);

const findById = id => Job.findById(id);

const findAll = query => Job.findAll(query);

const search = query => new Promise((resolve, reject) => {
  Job.esSearch(query, (err, res) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    resolve(res);
  });
});

const paginate = query => new Promise((resolve, reject) => {
  extraLogger.info(query);
  Job.paginate(
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
  Job.distinct(query, (err, res) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    resolve(res);
  });
});

const aggregate = query => new Promise((resolve, reject) => {
  Job.aggregate(query, (err, res) => {
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
  findAll,
  search,
  paginate,
  distinct,
  aggregate
};
