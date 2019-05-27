const express = require('express');
var bodyParser = require('body-parser')

// Import controllers
const jobController = require('./controllers/jobController');
const idController = require('./controllers/idController');
const filterController = require('./controllers/filterController');
const listController = require('./controllers/listController');

// Import policies
const isPaginated = require('./policies/isPaginated');

const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Searching ID routes
router.get('/v1/id/search', [isPaginated], idController.search)

// Filters
router.get('/v1/filter/country', filterController.country)
router.get('/v1/filter/city', filterController.city)
router.get('/v1/filter/cover', filterController.cover)


// Custom Lists
router.get('/v1/list/:listid', [isPaginated], listController.jobIDs)
router.post('/v1/list/:jobid', listController.create)
router.patch('/v1/list/add/:listid', [urlencodedParser], listController.addJob)
router.patch('/v1/list/rem/:listid', [urlencodedParser], listController.remJob)
router.delete('/v1/list/:listid', listController.delete)
router.patch('/v1/list/:listid', listController.edit)

// Searching that returns more than just ID
router.get('/v1/job/search', [isPaginated], jobController.search)
// Get preview of job with jobid
router.get('/v1/preview/:jobid', jobController.previewFindId)

// Get entire job object of jobid
router.get('/v1/full/:jobid', jobController.fullFindId)


module.exports = router;
