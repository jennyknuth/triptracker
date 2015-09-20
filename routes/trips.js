var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var trips = db.get('trips');
var users = db.get('users');

router.get('/', function (req, res) {
  trips.find({}, function (err, trips) {
    if (err) res.send(err);
    res.status(200).json(trips);
  });
});

router.post('/', function(req, res) {
  trips.insert(req.body, function(err, trip) {
    if (err) res.send(err);
    res.status(201).json(trip);
  });
});

router.get('/:id', function(req, res) {
  console.log(req.params.id);
  trips.findOne({_id: req.params.id}, function (err, doc) {
    if (err) res.send(err);
    res.status(200).json(doc);
  });
});

router.get('/user/:id', function(req, res) {
  console.log('hey', req.params.id);
  trips.find({userId: parseInt(req.params.id)}, function (err, doc) {
    if (err) res.send(err);
    res.status(200).json(doc);
  });
});

router.put('/:id', function(req, res) {
  trips.findAndModify({query: {_id: req.params.id}, options: {new: true}, update: {$set: req.body}}, function(err, trip) {
    if (err) throw err;
    res.status(200).json(trip);
  });
});

router.delete('/:id', function(req, res) {
  trips.remove({_id: req.params.id}, function (err, doc) {
    console.log("to delete: ", doc);
    res.status(200).json(doc + " documents deleted!");
  });
});
module.exports = router;
