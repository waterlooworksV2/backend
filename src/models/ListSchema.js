const Schema = require('mongoose').Schema

const lists = new Schema({
  _id: Schema.Types.ObjectId,
  'ListId': {
    type: Number
  },
  'Name': {
    type: String
  },
  'JobIds': {
    type: [Number]
  },
  'Users': {
    type: [Number]
  },
},
{
  autoCreate: true,
  collection: 'list'
})

module.exports = lists;
