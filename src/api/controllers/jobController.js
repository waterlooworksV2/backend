const queryUtils = require('../../utils/queryUtils');
const log = require('../../utils/log');

const { Job } = require('../../models');

const jobService = require('../services/jobService');

const jobController = {};

jobController.fullFindId = async (req, res, next) => {
  try{
    const id = String(req.params.sampleid);
    if (Number.isNaN(id) || id < 0) {
      return res.status(400).send({ message: `${req.params.sampleid} is not a valid index id` });
    }
    var index = await jobService.findById(id)
    return index ? res.send(index) : res.status(404).json({ message: `index ${id} not found` })
  } catch(e) {
    console.log(e);
    next();
  }
};

jobController.previewFindId = async (req, res, next) => {
  try{
    const id = String(req.params.sampleid);
    if (Number.isNaN(id) || id < 0) {
      return res.status(400).send({ message: `${req.params.sampleid} is not a valid index id` });
    }
    var index = await jobService.findById(id);
    index = index ? {"Job Title:": index["Job Title:"], "Organization:": index["Organization:"], '_id' : index['_id'], 'Job Summary:' : index['Job Summary:'].length > 400 ? index['Job Summary:'].substring(0, 400 - 3) + "..." : index['Job Summary:'].substring(0, 400)} : index;
    return index ? res.send(index) : res.status(404).json({ message: `index ${id} not found` })
  } catch(e) {
    console.log(e);
    next();
  }
};

jobController.search = async (req, res, next) => {
  console.log('LMASDOASDIOASJD')
  log.info('LMASDOASDIOASJD', req);
  const { pageSize, page } = req.context.pagination;
  var query = {};
  if(req.query.q === "") {
    var match_all = {};
    query = {
      size: pageSize,
      from: pageSize * page,
      query: { match_all }
    };
  } else {
    const multi_match = {};
    if (req.query.q) {
      multi_match.query = req.query.q;
      multi_match.fields=['Job Title:', 'Job - Province / State:', 'Targeted Degrees and Disciplines:'];
    }
    query = {
      size: pageSize,
      from: pageSize * page,
      query: { multi_match }
    };
  }

  try {
    const results = await jobService.search(query);
    const docs = results.hits.hits;
    console.log(results);

    log.info(docs);
    var ids = [];
    for(i in docs){
        ids.push(docs[i]["_id"])
    }
    log.info(Math.ceil(results.hits.total.value/pageSize));
    console.log('aha')
    res.status(200).json({"pages": Math.ceil(results.hits.total.value/pageSize), "ids": ids});
  } catch (e) {
    next(e);
  }
};

module.exports = jobController;
