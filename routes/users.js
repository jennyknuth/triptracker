var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');

/* GET users listing. */
router.get('/index', function(req, res, next) {
  users.find({email: req.body.email}, function (err, docs) {
    if (err) throw err;
    res.render('users/index', docs);
  })
});

module.exports = router;
