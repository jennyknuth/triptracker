var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function (req, res, next) {
  var errors = []
  if (!req.body.password) {
    errors.push("Password can't be blank")
  }
  if (!req.body.email) {
    errors.push("Email can't be blank")
  }
  if (errors.length) {
    console.log(req.body);
    res.render('login', {
      errors: errors,
      content: req.body
    })
  } else {
    users.findOne({email: req.body.email}, function (err, doc) {
      console.log(doc);
      if (err) throw err
      if (!doc) {
        // errors.push('New user?')
        res.render('login', {register: " "})
      } else {
        bcrypt.compare(req.body.password, doc.password, function (err, match){
          if (err) throw err
          if(!match) {
            errors.push('Login invalid')
            res.render('login', {errors: errors})
          } else {
            req.session.email = req.body.email
            res.redirect('/:user') // login good to go!
          }
        })
      }
    })
  }
})
router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;
