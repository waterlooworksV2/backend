const { List } = require('../../models');
const { extraLogger } = require('../../utils/log');

const find = query => List.find(query);

const findById = id => List.findById(id);

const findAll = query => List.findAll(query);

const search = query => new Promise((resolve, reject) => {
  List.esSearch(query, (err, res) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    resolve(res);
  });
});

const paginate = query => new Promise((resolve, reject) => {
  extraLogger.info(query);
  List.paginate(
    query['q'],
    {
      page: query['page'],
      limit:query['limit']
    }, (err, res) => {
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
  paginate
};
