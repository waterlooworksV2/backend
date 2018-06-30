require('dotenv').config();
const app = require('./app');
const { log } = require('./utils/log');
const { mongoose, Job } = require('./models/index')

const { PORT, DB_URI } = process.env
const stream = Job.synchronize();

mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => (
  app.listen(PORT, () => log.info(`Server Listening on port ${PORT}`))
))
  .catch(e => console.error(e))
