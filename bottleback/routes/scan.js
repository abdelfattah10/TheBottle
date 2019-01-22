const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();
const User = require('../models/UserModel');

const requireAuth = passport.authenticate('jwt', { session: false})


router.post('/scan', requireAuth, function(req, res){
  const points = req.body.points;
   User.findOneAndUpdate({email: req.user.email}, { $inc: { points: points }}, {new: true, useFindAndModify: false }, function(err, result){
     if(err)
       return err
      res.status(200).send({message: `You got ${points} points`})
   })
})


module.exports = router;
