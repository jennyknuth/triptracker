var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var trips = db.get('trips');
var users = db.get('users');

router.get('/:id', function (req, res) {
  trips.find({userId: req.params.id}, function (err, trips) {
    if (err) res.send(err);
    res.status(200).json(trips);
  });
});

module.exports = router;
