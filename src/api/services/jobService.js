const { Job } = require('../../models');

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
  distinct,
  aggregate
};
