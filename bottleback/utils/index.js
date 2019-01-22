const jwt = require('jwt-simple');
const secret = require('../config').secret;


function tokenForUser(user){
  const timeNow = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timeNow}, secret)
}

module.exports = {
  tokenForUser : tokenForUser
}
