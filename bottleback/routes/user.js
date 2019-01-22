const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwtt = require('jsonwebtoken');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/UserModel');
const tokenForUser = require('../utils').tokenForUser;
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false})
const requireSignin = passport.authenticate('local', { session: false})


  router.post('/signup', function(req, res) {
    User.findOne({email: req.body.email.toLowerCase()}, function(err, existingUser){
      if(err){return err}
      if(existingUser){return res.status(422).json({error: 'Email already exists'})}

     bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err) {
           return res.status(500).json({
              error: err
           });
        }
        else {
           const user = new User({
              _id: new  mongoose.Types.ObjectId(),
              email: req.body.email.toLowerCase(),
              name: req.body.name,
              password: hash,
              points: 0
           });
           user.save().then(function(result) {
               res.json({ token: tokenForUser(result)})
               
           }).catch(error => {
              res.status(500).json({
                 error: err
              });
           });
        }
     });
  })
});

router.post('/signin', requireSignin, function(req, res){
  res.send({ token: tokenForUser(req.user) });
})

router.get('/user', requireAuth, function(req, res){
  res.send(req.user);
})
/*
router.post('/signin', function(req, res){
   User.findOne({email: req.body.email})
   .exec()
   .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result){
         if(err) {
            return res.status(401).json({
               failed: 'Unauthorized Access'
            });
         }
         if(result) {
           const JWTToken = jwt.sign({
              email: user.email,
              _id: user._id
            },
            'secret',
             {
               expiresIn: '2h'
             });
             return res.status(200).json({
               success: 'Success',
               token: JWTToken
            });
         }
         return res.status(401).json({
            failed: 'Unauthorized Access'
         });
      });
   })
   .catch(error => {
      res.status(500).json({
         error: error
      });
   });;
});
*/
module.exports = router;
