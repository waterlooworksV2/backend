require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const { logMiddleware } = require('./src/util/log');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

const { LOCAL_PORT, SECRET } = process.env

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
// Setup logger middleware
app.use(require('morgan')('dev'));
// app.use(logMiddleware);
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.use(bodyParser.json());
app.use(session({ 
  secret: SECRET, 
  cookie: { 
    maxAge: 60000 
  }, 
  resave: false, 
  saveUninitialized: false 
}));

//Configure Mongoose
mongoose.connect(process.env.DB_URI,
{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

if(!isProduction) {
  app.use(errorHandler());
  mongoose.set('debug', true);
}

//Models & routes
require('./src/models/Users');
require('./src/models/Jobs');
require('./src/config/passport');

app.use(require('./src/routes.js'));

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

if(!isProduction){
  app.listen(LOCAL_PORT, () => console.log(`Server running on http://localhost:/${LOCAL_PORT}`));
}
