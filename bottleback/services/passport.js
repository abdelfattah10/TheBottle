const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/UserModel');
const secret = require('../config').secret;


const localOptions = {
  usernameField: 'email'
}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  User.findOne({email: email.toLowerCase()}, function(err, user){
    if(err) { return done(err) }
    if(!user){
      return done(null, false);
    }else {
      bcrypt.compare(password, user.password, function(err, result){
        if(err){
          return done(err);
        }else if(result){
          return done(null, user);
        }else {
          return done(null, false);
        }
      })
    }
  })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
}
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, false); }
    if(user){
      const u = {email: user.email, name: user.name, points: user.points}
      done(null, u)
    } else{
      done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)
