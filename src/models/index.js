const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');

const jobs = require('./JobSchema');

mongoose.Promise = Promise;

const esClient = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_URL
});

jobs.plugin(mongoosastic, {
  index: "jobs_new",
  esClient: esClient,
  hydrate: true
});

const Job = mongoose.model('jobs_complete', jobs, 'jobs_complete');
var stream = Job.synchronize(), count = 0;

stream.on('data', function(err, doc){
  count++;
});
stream.on('close', function(){
  console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
  console.log(err);
});

module.exports = {
  mongoose,
  Job
}
