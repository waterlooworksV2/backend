const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = mongoose.model('Users');
const Jobs = mongoose.model('jobs_complete');

const { Schema } = mongoose;
const { SECRET } = process.env

const ListsSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: String,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: Users
  },
  jobIDs: [{
    type: String,
    ref: Jobs
  }]
});

ListsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    owner: this.owner,
    name: this.name,
    jobIDs: this.jobIDs,
  };
};

const List = mongoose.model('Lists', ListsSchema);