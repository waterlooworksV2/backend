const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../middleware/auth');
const Lists = mongoose.model('Lists');
const Jobs = mongoose.model('jobs_complete');
const Users = mongoose.model('Users');

router.post('/:listid/:jobid', auth.required, async (req, res, next) => {
  const jobid = String(req.params.jobid);
  const job = await Jobs.findById(jobid);
  if(!job) {
    return res.sendStatus(401);
  }
  const listid = String(req.params.listid);
  try {
    const list = await Lists.findById(listid);
    if(!list.jobIDs.includes(job.id)) {
      list.jobIDs.push(job);
      list.save();
    }
    res.json({ list: list.toJSON() });
  } catch(err) {
    next(err);
  }
});

router.delete('/:listid/:jobid', auth.required, async (req, res, next) => {
  const jobid = String(req.params.jobid);
  const job = await Jobs.findById(jobid);
  if(!job) {
    return res.sendStatus(401);
  }
  const listid = String(req.params.listid);
  try {
    const list = await Lists.findById(listid);
    list.jobIDs.remove(job);
    list.save()
    res.json({ list: list.toJSON() });
  } catch(err) {
    next(err);
  }
});

router.get('/:listid/', auth.required, async (req, res, next) => {
  const listid = String(req.params.listid);
  try {
    const list = await Lists.findById(listid);
    return res.json(list.toJSON())
  } catch(err) {
    console.log(err)
    next(err);
  }
  return res.json({
    listid: listid,
    status: 'deleted',
  });
});

router.delete('/:listid/', auth.required, async (req, res, next) => {
  const listid = String(req.params.listid);
  try {
    const list = await Lists.findById(listid);
    if(list){
      list.deleteOne();
    } else {
      return res.json({
        listid: listid,
        status: 'does not exist',
      });
    }
  } catch(err) {
    console.log(err)
    next(err);
  }
  return res.json({
    listid: listid,
    status: 'deleted',
  });
});


router.get('/', auth.required, async (req, res, next) => {
  const { payload: { id } } = req;
  const lists = await Lists.find({owner: id})
  //.populate({
  //     path: 'jobIDs'
  //   });
  if(!lists) {
    return res.sendStatus(401);
  }
  try {
    res.json({ lists: lists });
  } catch(err) {
    next(err);
  }
});

router.post('/', auth.required, async (req, res, next) => {
  const { body: { list } } = req;
  const { payload: { id } } = req;
  const user = await Users.findById(id);
  if(!user) {
    return res.sendStatus(401);
  }
  if(!list.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }
  const newList = new Lists(list);
  newList.owner = user;
  try {
    await newList.save();
    res.json({ list: newList.toJSON() });
  } catch(err) {
    next(err);
  }
});

module.exports = router;