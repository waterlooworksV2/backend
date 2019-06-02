const express = require('express');

// Import controllers
const jobController = require('./controllers/jobController');
const idController = require('./controllers/idController');
const filterController = require('./controllers/filterController');
const customList = require('./controllers/customList');

// Import policies if we make any here
const isPaginated = require('./policies/isPaginated');

const router = express.Router();
router.get('/v1/id/search', [isPaginated], idController.search)
router.get('/v1/filter/country', filterController.country)
router.get('/v1/filter/city', filterController.city)
router.get('/v1/filter/cover', filterController.cover)
router.get('/v1/list/:id', [isPaginated], customList.customListIDs)
router.get('/v1/job/search', [isPaginated], jobController.search)
router.get('/v1/preview/:sampleid', jobController.previewFindId)
router.get('/v1/full/:sampleid', jobController.fullFindId)


module.exports = router;
