require('dotenv').config()

process.env.NODE_ENV = 'test'

module.exports = require('../src/app.js');
