const jwt = require('express-jwt');
const { SECRET } = process.env;

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if(authorization && authorization.split(' ')[0] === 'Token') {
    console.log(authorization.split(' ')[1])
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;