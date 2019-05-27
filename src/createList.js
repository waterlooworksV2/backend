const { mongoose, Job, List } = require('./models');
require('dotenv').config();
const { log } = require('./utils/log');

const { LOCAL_PORT, HTTP_PORT, HTTPS_PORT, DB_URI} = process.env

mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => {
  var l5 = new List({
    _id: new mongoose.Types.ObjectId(),
    ListId: 5,
    Name: 'Test List',
    JobIds: [],
    Users: [-1],
  });
  l5.save(function(err) {
    if (err) throw err;
  });
})
  .catch(e => console.error(e))
