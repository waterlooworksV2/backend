const { List } = require('../../models');
const { extraLogger } = require('../../utils/log');

const find = query => List.find(query);

const findOne = query => List.findOne(query);

const findMaxListNo = query => List.findOne().sort('-ListId');

const findOneAndRemove = query => List.findOneAndRemove();

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
  findOne,
  findMaxListNo,
  findOneAndRemove,
  findById,
  findAll,
  search,
  paginate
};
