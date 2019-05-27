require('dotenv').config();
const {httpServer, app, httpsServer} = require('./app');
const { log } = require('./utils/log');
const { mongoose, Job, List } = require('./models/index')

const { LOCAL_PORT, HTTP_PORT, HTTPS_PORT, DB_URI} = process.env
const stream = Job.synchronize();

mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => {
  if(!process.env.LOCAL){
    httpServer.listen(HTTP_PORT, () => {
    	log.info(`HTTP Server Listening on port ${HTTP_PORT}`);
    });

    httpsServer.listen(HTTPS_PORT, () => {
      log.info(`HTTPS Server running on port ${HTTPS_PORT}`);
    });
  }
  else {
    app.listen(LOCAL_PORT, () => {
      log.info(`LOCAL Server running on port ${LOCAL_PORT}`);
    })
  }
})
  .catch(e => console.error(e))
