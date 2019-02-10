const app = require('./index.js');
const request = require('supertest');
const assert = require("chai").assert;
const { mongoose } = require('../src/models/index')

describe('Route Tests', () => {
  before(() => mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }))
  after(() => mongoose.connection.close())

  it('PREVIEW: Sample job by _id returned successfully', () => (
    request(app)
      .get('/v1/preview/62303')
      .expect(200)
  ));

  it('PREVIEW: Bad request (parameter) _id for job returns fail', () => (
    request(app)
      .get('/v1/preview/bad_product_id')
      .expect(404)
  ));

  it('FULL: Sample job by _id returned successfully', () => (
    request(app)
      .get('/v1/full/62303')
      .expect(200)
  ));

  it('FULL: Bad request (parameter) _id for job returns fail', () => (
    request(app)
      .get('/v1/full/bad_product_id')
      .expect(404)
  ));

  it('IDS: Sample job search', () => (
    request(app)
      .get('/v1/job/search?q=data%20analyst')
      .expect(res => assert(res.body))
      .expect(res => assert(res.body.ids.length > 0))
      .expect(200)
  ));

  it('IDS: Sample id search', () => (
    request(app)
      .get('/v1/id/search?q=data%20analyst')
      .expect(res => assert(res.body))
      .expect(res => assert(res.body.ids.length > 0))
      .expect(200)
  ));

  it('ALL: List of cities returned successfully', () => (
      request(app)
          .get('/v1/filter/country')
          .expect(200)
  ));

  it('ALL: List of cities returned successfully', () => (
      request(app)
          .get('/v1/filter/city')
          .expect(200)
  ));

});
