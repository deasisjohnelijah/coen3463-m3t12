var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/restaurants/create', function(req, res, next) {
  res.render('create', { title: 'Top Manila Restaurants 2017' });
});

module.exports = router;
