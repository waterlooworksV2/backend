const express = require('express');

// Import controllers
const jobController = require('./controllers/jobController');

// Import policies if we make any here
const isPaginated = require('./policies/isPaginated');

const router = express.Router();

router.get('/v1/job/search', [isPaginated], jobController.default)
router.get('/v1/job/:sampleid', jobController.findId)


module.exports = router;
