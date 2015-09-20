var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var trips = db.get('trips');
var users = db.get('users');

router.get('/', function (req, res) {
  users.find({}, function (err, users) {
    if (err) res.send(err);
    res.status(200).json(users);
  });
});

router.post('/', function (req, res) {
  users.insert(req.body, function (err, user) {
    if (err) res.send(err);
    res.status(200).json(user);
  });
});

router.get('/:id', function (req, res) {
  users.findOne({userId: parseInt(req.params.id)}, function (err, trips) {
    if (err) res.send(err);
    res.status(200).json(trips);
  });
});

module.exports = router;
