const bunyan = require('bunyan');

// function for serializing http requests to use for logger
const reqSerializer = req => ({
  method: req.method,
  url: req.url,
  httpVersion: req.httpVersion,
  headers: {
    'x-forwarded-for': req.headers['X-Forwarded-For'],
    'x-real-ip': req.headers['x-real-ip'],
    'user-agent': req.headers['user-agent'],
  },
  remoteAddress: req.connection.remoteAddress,
  remotePort: req.connection.remotePort,
});

// function for serializing http responses to use for logger
const resSerializer = (req, res) => ({
  method: req.method,
  url: req.url,
  statusCode: res.statusCode,
  remoteAddress: req.connection.remoteAddress,
  remotePort: req.connection.remotePort,
});

// Set up bunyan logger
const log = bunyan.createLogger({
  name: 'WaterlooFinallyWorks',
  serializers: {
    req: reqSerializer,
    res: resSerializer,
  },
  level: process.env.NODE_ENV !== 'development' ? 'fatal' : 'info'
});

const extraLogger = bunyan.createLogger({
  name: 'WaterlooFinallyWorks2',
  level: process.env.NODE_ENV !== 'development' ? 'fatal' : 'info'
});

// use logger as a middleware
const logMiddleware = (req, res, next) => {
  log.info(reqSerializer(req), 'log-request');

  res.on('finish', () => {
    log.info(resSerializer(req, res), 'log-response');
  });

  next();
};

module.exports = {
  log,
  extraLogger,
  logMiddleware
};
