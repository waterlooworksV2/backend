require('dotenv').config();
const app = require('./app');
const { log } = require('./utils/log');
const { mongoose, Job } = require('./models/index')

const { HTTP_PORT, HTTPS_PORT, DB_URI } = process.env
const stream = Job.synchronize();

mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => {
  httpServer.listen(HTTP_PORT, () => {
  	log.info(`HTTP Server Listening on port ${HTTP_PORT}`);
  });

  httpsServer.listen(HTTPS_PORT, () => {
    log.info(`HTTPS Server running on port ${HTTPS_PORT}`);
  });
})
  .catch(e => console.error(e))
