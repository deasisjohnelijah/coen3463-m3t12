var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Top Manila Restaurants 2017', user: req.user });
});
router.get('/home', function(req, res) {
  res.render('home', { title: 'Top Manila Restaurants 2017', user: req.user });
});
router.get('/about', function(req, res) {
  res.render('about', { title: 'Top Manila Restaurants 2017' user: req.user });
});

module.exports = router;
