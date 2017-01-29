var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Top Manila Restaurants 2017', user: req.user });
});

module.exports = router;
