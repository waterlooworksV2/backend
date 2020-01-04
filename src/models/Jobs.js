const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const mongoosePaginate = require('mongoose-paginate-v2');
const elasticsearch = require('elasticsearch');

const { Schema } = mongoose;

const JobSchema = new Schema({
  'Additional Application Information:': {
    type: String,
    es_indexed: true
  },
 'Additional Information:': {
   type: String,
   es_indexed: true
 },
 'Application Deadline:': {
   type: String,
   es_indexed: true
 },
 'Application Documents Required:': {
   type: [String],
   es_indexed: true
 },
 'Application Method:': {
   type: String,
   es_indexed: true
 },
 'Compensation and Benefits Information:': {
   type: String,
   es_indexed: true
 },
 'Division:': {
   type: [String],
   es_indexed: true
 },
 'Employer Internal Job Number:': {
   type: String,
   es_indexed: true
 },
 'Job - Address Line One:': {
   type: String,
   es_indexed: true
 },
 'Job - Address Line Two:': {
   type: String,
   es_indexed: true
 },
 'Job - City:': {
   type: [String],
   es_indexed: true
 },
 'Job - Country:': {
   type: String,
   es_indexed: true
 },
 'Job - Postal Code / Zip Code (X#X #X#):': {
   type: 'String',
   es_indexed: 'true'
 },
 'Job - Province / State:': {
   type: String,
   es_indexed: true
 },
 'Job Category (NOC):': {
   type: String,
   es_indexed: true
 },
 'Job Location (if exact address unknown or multiple locations):': {
   type: String,
   es_indexed: true
 },
 'Job Posting Status:': {
   type: [String],
   es_indexed: true
 },
 'Job Responsibilities:': {
   type: String,
   es_indexed: true
 },
 'Job Summary:': {
   type: String,
   es_indexed: true
 },
 'Job Title:': {
   type: String,
   es_indexed: true
 },
 'Job Type:': {
   type: String,
   es_indexed: true
 },
 'Level:': {
   type: [String],
   es_indexed: true
 },
 'Organization:': {
   type: String,
   es_indexed: true
 },
 'Region:': {
   type: String,
   es_indexed: true
 },
 'Required Skills:': {
   type: String,
   es_indexed: true
 },
 'Special Job Requirements:': {
   type: String,
   es_indexed: true
 },
 'Targeted Degrees and Disciplines:': {
   type: String,
   es_indexed: true
 },
 'Transportation and Housing:': {
   type: String,
   es_indexed: true
 },
 'Work Term Duration:': {
   type: String,
   es_indexed: true
 },
 'Work Term:': {
   type: String,
   es_indexed: true
 },
 '_id': {
   type: String,
   es_indexed: true
 },
 id: {
   type: String,
   es_indexed: true
 },
 'Number of Job Openings:': {
   type: Number,
   es_indexed: true
 },
 'cover_letter': {
   type: Boolean,
   es_indexed: true
 },
 'viewed': {
   type: Boolean,
   es_indexed: true
 },
 'count': {
   type: Number,
   es_indexed: true
 }
},
{
  collection: 'jobs_complete'
})

const esClient = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_URL
});

JobSchema.plugin(mongoosastic, {
  index: "jobs_f19",
  esClient: esClient,
  hydrate: true,
  // bulk: {
    // size: 1, // preferred number of docs to bulk index
    // delay: 100 //milliseconds to wait for enough docs to meet size constraint
  // },
});
JobSchema.plugin(mongoosePaginate);
const Job = mongoose.model('jobs_complete', JobSchema, 'jobs_complete');

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


