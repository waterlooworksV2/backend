const app = require('./index.js');
const request = require('supertest');
const assert = require("chai").assert;
const { mongoose } = require('../src/models/index')

describe('Route Tests', () => {
  before(() => mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }))
  after(() => mongoose.connection.close())

  it('Sample job by _id returned successfully', () => (
    request(app)
      .get('/v1/job/62303')
      .expect(200)
  ));

  it('Bad request (parameter) _id for job returns fail', () => (
    request(app)
      .get('/v1/job/bad_product_id')
      .expect(404)
  ));

  it('Sample job search', () => (
    request(app)
      .get('/v1/job/search?q=data%20analyst')
      .expect(res => assert(res.body.length>0))
      .expect(200)
  ));

  it('Sample id search', () => (
    request(app)
      .get('/v1/id/search?q=data%20analyst')
      .expect(res => assert(res.body.length>0))
      .expect(200)
  ));

});
