var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Trip Tracker' });
});
router.get('/about', function (req, res, next) {
  res.render('about', {})
})

module.exports = router;
