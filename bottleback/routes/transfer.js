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
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = router;
