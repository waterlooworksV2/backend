const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const mongoosePaginate = require('mongoose-paginate-v2');
const elasticsearch = require('elasticsearch');

const jobs = require('./JobSchema');

mongoose.Promise = Promise;

const esClient = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_URL
});

jobs.plugin(mongoosastic, {
  index: "jobs_f19",
  esClient: esClient,
  hydrate: true
});

jobs.plugin(mongoosePaginate);

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
