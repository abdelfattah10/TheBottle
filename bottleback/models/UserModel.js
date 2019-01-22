const mongoose = require('mongoose');

const user = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: {type: String, unique: true, required: true},
   name: {type: String, required: true},
   password: {type: String, required: true},
   points: {type: Number, required: true}
});

module.exports = mongoose.model('User', user);
