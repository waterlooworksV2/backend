const queryUtils = require('../../utils/queryUtils');
const { extraLogger } = require('../../utils/log');

const { List } = require('../../models');

const listService = require('../services/listService');
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
    const maxInDB = await listService.findMaxListNo();
    const maxCustomListNumber = Object.keys(listControllerIndexToKey).length - 1;
    const maxListNumber = Math.max(maxCustomListNumber, maxInDB);
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
    }else{
      var list = await listService.findOne({ListId: id});
      var response = {
        "pages": Math.floor(list.JobIds.length/pageSize)+1,
        "ids": list.JobIds.slice(pageSize*(page-1), pageSize),
        "listName": list.Name
      };
      console.log(list.JobIds, list.JobIds.length, pageSize, list.JobIds.length/pageSize);
      res.send(response);
    }
  } catch (e) {
    next(e);
  }
};

listController.create = async (req, res, next) => {
  try {
    const jobid = Number(req.params.jobid);
    const maxCustomListNumber = Object.keys(listControllerIndexToKey).length - 1;

    const maxListNumberMember = await listService.findMaxListNo();
    if(maxListNumberMember){
      var maxListNumber = maxListNumberMember.ListId;
    }else{
      var maxListNumber = 0;
    }
    console.log(req.body.owner)
    var l5 = new List({
      ListId: Math.max(maxListNumber, maxCustomListNumber)+1,
      Name: req.body.Name,
      JobIds: [jobid],
      Users: [-1],
      permission: {
        public: false,
        owner: req.body.owner,
        visible: [],
      }
    });
    l5.save(function(err) {
      if (err) throw err;
    });
    res.send({
      listid: l5.ListId,
    });
  } catch (e) {
    next(e);
  }
};

listController.addJob = async (req, res, next) => {
  try {
    const listid = Number(req.params.listid);
    console.log(req.body)
    const jobids = req.body.jobids;
    console.log(listid)
    List.findOne({ListId: listid}, function(err, doc){
      console.log(doc)
      if (err) return res.send(500, { error: err });
      for (var i = 0; i < jobids.length; i++) {
        var flag = true;
        for (var j = 0; j < doc.JobIds.length; j++){
          if(doc.JobIds[j] === Number(jobids[i])){
            flag = false;
            break;
          }
        }
        if(flag){
          doc.JobIds.push(Number(jobids[i]));
          doc.markModified('JobIds');
        }
      }
      doc.save(function(err) {
        if (err) throw err;
      })
      res.send({listid: listid, jobids: doc.JobIds});
    });
  } catch (e) {
    next(e);
  }
};

listController.remJob = async (req, res, next) => {
  try {
    const listid = Number(req.params.listid);
    const jobids = req.body.jobids;
    List.findOne({ListId: listid}, function(err, doc){
      if (err) return res.send(500, { error: err });
      for (var i = 0; i < jobids.length; i++) {
        for (var j = 0; j < doc.JobIds.length; j++){
          if(doc.JobIds[j] === Number(jobids[i])){
            doc.markModified('JobIds');
            doc.JobIds.splice(j,1);
          }
        }
      }
      doc.save(function(err) {
        if (err) throw err;
      })
      res.send({listid: listid, jobids: doc.JobIds});
    });
  } catch (e) {
    next(e);
  }
};

listController.delete = async (req, res, next) => {
  try {
    const listid = Number(req.params.listid);
    List.findOneAndRemove({ListId: listid}, function(err, rep){
      if(err) throw err;
      res.send({listid: listid});
    })
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

listController.usersLists = async (req, res, next) => {
  try {
    // share and rename
    const userid = Number(req.params.userid);
    let lists = await listService.find({Users: userid})
    res.send({lists: lists});
  } catch (e) {
    next(e);
  }
};

module.exports = listController;
