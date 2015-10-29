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
  trips.find({userId: parseInt(req.params.id)}, function (err, doc) {
    if (err) res.send(err);
    res.status(200).json(doc);
  });
});

router.post('/user/:id', function(req, res) {
  // on the server, find the records by day / user (as opposed to ID)
  // and have logic to always just do the right thing
  console.log('doc to go into database: ', req.body);
  if (req.body.type === 'none'){
    console.log('type is none');
    trips.remove({"userId": req.body.userId, "date": req.body.date, "dayPart": req.body.dayPart}, function (err, doc) {
      if (err) throw err;
      console.log("to delete: ", doc);
      res.status(200).json(doc + " documents deleted!");
    })
  } else {
    console.log('type is not none');
    trips.findAndModify({
      query: {"userId": req.body.userId, "date": req.body.date, "dayPart": req.body.dayPart},
      update: {$set: req.body},
      options: {upsert: true, new: true}
    }).then(function (trip) {
      if (trip === null) {
        trips.insert(req.body, function (err, trip) {
          if (err) throw err;
          res.status(200).json(trip)
        }) // not sure why this is neccessary with upsert on...
        console.log('trip not found, so inserted');
      } else {
        console.log('trip updated');
        res.status(200).json(trip);
      }
    })
  }
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
