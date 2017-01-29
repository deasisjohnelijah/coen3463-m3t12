var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username, first_name: req.body.full_name, last_name:req.body.last_name, email:req.body.email
    }), req.body.password, function(err, account) {
      if(err) {
        console.log(err)
        return res.render('register', {error: err});
      }

      req.login(account, function(err) {
        res.redirect('/auth/login');
      });
    })
  })

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});
});
router.get('/login-', function(req, res, next) {
  res.render('login-', {user: req.user});
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login-' }),
  function(req, res) {
    res.redirect('/home');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;