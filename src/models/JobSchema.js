const Schema = require('mongoose').Schema

const jobs = new Schema({
  _id: {
    type: String,
    es_indexed: true
  },
  "Job Posting Status:": {
    type: String,
    es_indexed: true
  },
  "Work Term:": {
    type: String,
    es_indexed: true
  },
  "Job Type:": {
    type: String,
    es_indexed: true
  },
  "Job Title:": {
    type: String,
    es_indexed: true
  },
  "Number of Job Openings:": {
    type: String,
    es_indexed: true
  },
  "Job Category (NOC):": {
    type: String,
    es_indexed: true
  },
  "Level:": {
    type: [String],
    es_indexed: true
  },
  "Region:": {
    type: String,
    es_indexed: true
  },
  "Job Location (if exact address unknown or multiple locations):": {
    type: String,
    es_indexed: true
  },
  "Job - Address Line One:": {
    type: String,
    es_indexed: true
  },
  "Job - Address Line Two:": {
    type: String,
    es_indexed: true
  },
  "Job - City:": {
    type: String,
    es_indexed: true
  },
  "Job - Province / State:": {
    type: String,
    es_indexed: true
  },
  "Job - Postal Code / Zip Code (X#X #X#):": {
    type: String,
    es_indexed: true
  },
  "Job - Country:": {
    type: String,
    es_indexed: true
  },
  "Work Term Duration:": {
    type: String,
    es_indexed: true
  },
  "Job Summary:": {
    type: String,
    es_indexed: true
  },
  "Job Responsibilities:": {
    type: String,
    es_indexed: true
  },
  "Required Skills:": {
    type: String,
    es_indexed: true
  },
  "Required skills:": {
    type: String,
    es_indexed: true
  },
  "Transportation and Housing:": {
    type: String,
    es_indexed: true
  },
  "Additional Information:": {
    type: String,
    es_indexed: true
  },
  "Compensation and Benefits Information:": {
    type: String,
    es_indexed: true
  },
  "Targeted Clusters:": {
    type: [String],
    es_indexed: true
  },
  "Targeted Degrees and Disciplines:": {
    type: String,
    es_indexed: true
  },
  "Application Deadline:": {
    type: String,
    es_indexed: true
  },
  "Application Documents Required:": {
    type: String,
    es_indexed: true
  },
  "Application Method:": {
    type: String,
    es_indexed: true
  },
  "Organization:": {
    type: String,
    es_indexed: true
  },
  "Division:": {
    type: String,
    es_indexed: true
  },
  "Special Job Requirements:": {
    type: String,
    es_indexed: true
  },
  "Reports to:": {
    type: String,
    es_indexed: true
  },
  "Employer Internal Job Number:": {
    type: String,
  },
  "Additional Application Information:": {
    type: String,
    es_indexed: true
  },
  "Additional Job Identifiers:": {
    type: String,
    es_indexed: true
  },
  "Department:": {
    type: String,
    es_indexed: true
  },
  "Title:": {
    type: String,
    es_indexed: true
  }
},
{
  collection: 'jobs_complete'
})

module.exports = jobs;
