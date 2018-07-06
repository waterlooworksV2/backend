const express = require('express');

// Import controllers
const jobController = require('./controllers/jobController');
const idController = require('./controllers/idController');

// Import policies if we make any here
const isPaginated = require('./policies/isPaginated');

const router = express.Router();

router.get('/v1/id/search', [isPaginated], idController.search)

router.get('/v1/job/search', [isPaginated], jobController.search)
router.get('/v1/preview/:sampleid', jobController.previewFindId)
router.get('/v1/full/:sampleid', jobController.fullFindId)


module.exports = router;
