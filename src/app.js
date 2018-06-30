const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { log, logMiddleware } = require('./utils/log');

const routes = require('./api/routes');

var app = express();

// setup cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// Setup logger middleware
app.use(logMiddleware);

// Setup context for pagination
app.use((req, res, next) => {
  req.context = req.context || {};
  next();
});

// Use our defined routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    log.error(err);
  }
  res.status(statusCode).send({ message: err.message });
});

module.exports = app;
