const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();
const User = require('../models/UserModel');

const requireAuth = passport.authenticate('jwt', { session: false})


router.post('/transfer', requireAuth, function(req, res){
  const from = req.user.email.toLowerCase();
  const to = req.body.to.toLowerCase().trim();
  const amount = req.body.amount

    transfer(from, to, amount)
      .then(() => {
        res.status(200).send({message: 'Transfer done successfully'});
      }
      ,(e) => {
        res.status(400).send({message: e.message});
      })

})

async function transfer(from, to, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, useFindAndModify: false };

    const A = await User.
      findOneAndUpdate({ email: from }, { $inc: { points: -amount } }, opts);
        if(!A){
          throw new Error('Smth went wrong');
        }

    if (A.points < 0) {
      // If A would have negative balance, fail and abort the transaction
      // `session.abortTransaction()` will undo the above `findOneAndUpdate()`
      throw new Error('Insufficient points');
    }

    const B = await User.
      findOneAndUpdate({ email: to }, { $inc: { points: amount } }, opts);
      if(!B){
        throw new Error('User email not found');
      }
    await session.commitTransaction();
    session.endSession();
    console.log({ from: A, to: B });
    return { from: A, to: B };
  } catch (error) {
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    throw error; // Rethrow so calling function sees error
  }
}

// router.post('/transfer', requireAuth, function(req, res){
//   const destemail = req.body.destemail;
//   const amount = req.body.amount
//   const userPoints = req.user.points
//
//    if(userPoints < amount){
//      res.status(400).json({error: 'Do not have enough points'})
//    } else {
//
//      User.findOneAndUpdate({email: req.user.email}, { $inc: { points: -amount }}, {new: true}, function(err, result){
//        if(err)
//          return err
//
//          User.findOneAndUpdate({email: destemail}, { $inc: { points: amount }}, {new: true}, function(err, result){
//            if(err)
//              return err
//              res.json({message: 'Transfer is done successfully'})
//          })
//      })
//   }
// })

module.exports = router;
