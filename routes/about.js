var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Top Manila Restaurants 2017',  user: req.user});
});

module.exports = router;
