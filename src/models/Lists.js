const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = mongoose.model('Users');
const Jobs = mongoose.model('jobs_complete');

const { Schema } = mongoose;
const { SECRET } = process.env

const ListsSchema = new Schema({
  name: String,
  description: String,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: Users
  },
  jobIDs: [{
    type: String,
    ref: Jobs
  }],
  public: Boolean,
  accessible: [{
    type: mongoose.Types.ObjectId,
    ref: Users
  }]
});

ListsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    owner: this.owner,
    name: this.name,
    description: this.description,
    jobIDs: this.jobIDs,
    public: this.public,
    accessible: this.accessible,
    numJobs: this.numJobs,
  };
};

ListsSchema.virtual('numJobs').get(function () {
  return this.jobIDs.length;
})

const List = mongoose.model('Lists', ListsSchema);