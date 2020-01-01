const express = require('express');
const router = express.Router();

router.use('/user', require('./controllers/users'));
router.use('/jobs', require('./controllers/jobs'));

module.exports = router;