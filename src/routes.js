const express = require('express');
const router = express.Router();

router.use('/user', require('./controllers/users'));
router.use('/jobs', require('./controllers/jobs'));
router.use('/ids', require('./controllers/ids'));
router.use('/lists', require('./controllers/lists'));

module.exports = router;