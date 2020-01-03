const router = require('express').Router();
const auth = require('../middleware/auth');
const jobService = require('../services/jobService');

router.get('/full/:jobid', auth.required, async (req, res, next) => {
  const { payload: { id } } = req;
  
  try{
    const id = String(req.params.jobid);
    if (Number.isNaN(id) || id < 0) {
      return res.status(400).send({ message: `${req.params.sampleid} is not a valid index id` });
    }
    var index = await jobService.findById(id)
    return index ? res.send(index) : res.status(404).json({ message: `index ${id} not found` })
  } catch(e) {
    next(e);
  }
});

router.get('/:jobid', auth.required, async (req, res, next) => {
  const { payload: { id } } = req;
  
  try{
    const id = String(req.params.jobid);
    if (Number.isNaN(id) || id < 0) {
      return res.status(400).send({ message: `${req.params.sampleid} is not a valid index id` });
    }
    var index = await jobService.previewById(id);
    index = index ? {"Job Title:": index["Job Title:"], "Organization:": index["Organization:"], '_id' : index['_id'], 'Job Summary:' : index['Job Summary:'].replace('\n\n','\n').length > 400 ? index['Job Summary:'].replace('\n\n','\n').substring(0, 400 - 3) + "..." : index['Job Summary:'].replace('\n\n','\n').substring(0, 400)} : index;
    return index ? res.send(index) : res.status(404).json({ message: `index ${id} not found` })
  } catch(e) {
    console.log(e);
    next();
  }
});

module.exports = router;