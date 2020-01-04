const { api: apiConfig } = require('../config');

module.exports = (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || apiConfig.defaultQueryCount;
  const page = Number(req.query.page) || 0;
  if (pageSize > apiConfig.maxQueryCount) {
    return res.status(400).send({
      message: `Cannot request a page greater than ${apiConfig.maxQueryCount} items`
    });
  }
  req.context.pagination = {
    pageSize,
    page: page-1
  };
  return next();
};