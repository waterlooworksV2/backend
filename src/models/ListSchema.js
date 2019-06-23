const Schema = require('mongoose').Schema

const permissions = new Schema({
  _id: Schema.Types.ObjectId,
  'public': {
    type: Boolean,
    required: true,
    default: false,
  },
  'owner': {
    type: String,
    required: true,
  },
  'visible': {
    type: [String],
    required: true,
    default: [],
  }
})

const lists = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  'ListId': {
    type: Number,
    required: true,
    unique: true,
  },
  'Name': {
    type: String,
    es_indexed: true,
  },
  'JobIds': {
    type: [Number],
    default: [],
  },
  permission: {
    type: permissions,
    required: true,
  }
},
{
  autoCreate: true,
  collection: 'lists'
})

module.exports = lists;
