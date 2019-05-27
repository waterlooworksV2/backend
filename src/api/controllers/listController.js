const queryUtils = require('../../utils/queryUtils');
const { extraLogger } = require('../../utils/log');

const { List } = require('../../models');

const jobService = require('../services/jobService');

const listController = {};

const listControllerIndexToKey = {
  0: 'United States',
  1: 'Canada',
  2: 'Toronto',
  3: 'Kitchener/Waterloo',
  4: 'Apple'
}

const listControllerToQuery = {
  'United States': {"Job - Country:" : "United States"},
  'Canada': {"Job - Country:" : "Canada"},
  'Toronto': {"Job - City:" : "Toronto"},
  'Kitchener/Waterloo': { $or: [{"Job - City:" : "Waterloo"}, {"Job - City:" : "Kitchener"}] },
  'Apple': {"Organization:" : "Apple Inc"}
}

listController.jobIDs = async (req, res, next) => {
  try {
    // need to make this transaction atomic to avoid list number conflicts
    var maxInDB = 0; // need to grab max list id from database
    var maxListNumber = Math.max(Object.keys(listControllerIndexToKey).length, maxInDB);
    const { pageSize, page } = req.context.pagination;
    const id = Number(req.params.listid);
    if (Number.isNaN(id) || id < 0 || (id > maxListNumber)) {
      return res.status(404).send({ message: `${req.params.sampleid} is not a valid list id` });
    }
    if(id < Object.keys(listControllerIndexToKey).length){
      const query = listControllerToQuery[listControllerIndexToKey[id]]
      var index = await jobService.paginate({q: query,
                                             page:page+1,
                                             limit:pageSize,
                                             select: 'id'
                                           });
      var ids = [];
      for(i in index['docs']){
        ids.push(index["docs"][i]["_id"])
      }
      res.send({"pages": index.totalPages-1, "ids": ids, "listName": listControllerIndexToKey[id]});
    }
  } catch (e) {
    next(e);
  }
};

listController.create = async (req, res, next) => {
  try {
    const jobid = Number(req.params.jobid);
    res.send({jobid: jobid});
  } catch (e) {
    next(e);
  }
};

listController.addJob = async (req, res, next) => {
  try {
    const listid = Number(req.params.listid);
    const jobids = req.body.jobids;
    res.send({listid: listid, jobids: jobids});
  } catch (e) {
    next(e);
  }
};

listController.remJob = async (req, res, next) => {
  try {
    const listid = Number(req.params.listid);
    const jobids = req.body.jobids;
    res.send({listid: listid, jobids: jobids});
  } catch (e) {
    next(e);
  }
};

listController.delete = async (req, res, next) => {
  try {
    const listid = Number(req.params.listid);
    res.send({listid: listid});
  } catch (e) {
    next(e);
  }
};

listController.edit = async (req, res, next) => {
  try {
    // share and rename
    const listid = Number(req.params.listid);
    console.log(req.params);
    console.log(listid);
    res.send({listid: listid});
  } catch (e) {
    next(e);
  }
};

module.exports = listController;
