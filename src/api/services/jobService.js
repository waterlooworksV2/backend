const { Job } = require('../../models');

const findById = id => Job.findById(id);

const findAll = query => DrinkRecipe.findAll(query);

const search = query => new Promise((resolve, reject) => {
  Job.esSearch(query, (err, res) => {
    if (err) return reject(err);
    resolve(res);
  });
});

module.exports = {
  findById,
  findAll,
  search
};
