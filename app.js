require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var trips = require('./routes/trips');
var cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', users);
app.use('/api/trips', trips);

app.listen(process.env.PORT || 8080);
console.log('Woot, up and running!')

module.exports = app;
