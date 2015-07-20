var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');
var trips = db.get('trips');

/* GET users listing. */
router.get('/index', function(req, res, next) {
  users.find({email: req.session.email, password: undefined}, function (err, docs) {
    if (err) throw err;
    res.render('users/index', {users: docs, email: req.session.email});
  })
});
router.post('/index', function(req, res, next) {
  req.body.email = req.session.email
  req.body.firstName.trim()
  req.body.lastName.trim()
  console.log('body', req.body);
  // find out if student already exists
  users.find({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName}, function (err, docs) {
    console.log('how many', docs.length)
    if (docs.length === 0) {
        // req.session.id = doc._id
      users.insert(req.body, function (err, doc) {
        if (err) throw err
        res.redirect('/users/index')
      })
    } else {
      users.find({email: req.session.email}, function (err, docs) {
        if (err) throw err;
        res.render('users/index', {users: docs, errors: 'You have already registered that student'});
      })
    }
  })
});
router.get('/new', function(req, res, next) {
  res.render('users/new', {});
});
router.get('/:id', function(req, res, next) {
  users.findOne({_id: req.params.id}, function (err, doc) {
    res.render('users/show', doc);
  })
});
router.get('/:id/calendar', function(req, res, next) {
  users.findOne({_id: req.params.id}, function (err, doc) {
    res.render('users/calendar', doc);
  })
});
router.post('/:id/update', function(req, res, next) {
  // before inserting, look to see if entry for that date already there. If so, update instead!
  req.body.user = req.params.id
  console.log('new body', req.body);
  trips.insert(req.body, function (err, doc) {
    console.log('doc', doc);
    res.render('users/calendar', doc);
  })
});


module.exports = router;
