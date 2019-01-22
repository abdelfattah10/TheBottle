
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const user = require('./routes/user');
const scan = require('./routes/scan');
const transfer = require('./routes/transfer');

mongoose.connect('mongodb://localhost/bottle', { useNewUrlParser: true, replicaSet: 'rs' }).then(() => (console.log('Mongo Connected')));
//mongoose.connect('mongodb://localhost/bottle', { useNewUrlParser: true }).then(() => (console.log('Mongo Connected')));
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/scan', scan);
app.use('/transfer', transfer);


app.use(function (err, req, res, next) {
  console.log('Smth Broke!');
})


app.listen( process.env.PORT || 3000, function(){
   console.log('Server is running on Port', 3000);
});
