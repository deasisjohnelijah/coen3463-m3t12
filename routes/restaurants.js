var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var Restaurant = require('../models/restaurants');


router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Restaurant.find( function(err, restaurants, count) {
    res.render('restaurants', {restaurants: restaurants, user: req.user});
  })
});

router.post('/', function(req, res) {
    new Restaurant({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      cuisine: req.body.cuisine,
      maplink: req.body.maplink,
      contact: req.body.contact,
      zomato: req.body.zomato,
      photo: req.body.photo,
      photoslink: req.body.photoslink,
      createdate: moment().tz("Asia/Manila").format('LLL'),
      
    }).save(function(err, restaurant, count) {
      if(err) {
        res.render('create', {error: err});
      } else {
        res.redirect('/restaurants');
      }
    })
});

router.get('/create', function(req, res) {
  res.render('create', {restaurant: {}, user: req.user});
});



router.route('/:restaurant_id')
  .all(function(req, res, next) {
    restaurant_id = req.params.restaurant_id;
    restaurant = {};
    Restaurant.findById(restaurant_id, function(err, c) {
      restaurant = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('restaurant', {restaurant: restaurant, moment: moment, user: req.user});
  })

  // .post(function(req, res) {
  //   restaurant.notes.push({
  //     note: req.body.notes
  //   });

  //   restaurant.save(function(err, contact, count) {
  //     if(err) {
  //       res.status(400).send('Error adding note: ' + err);
  //     } else {
  //       res.send('Note added!');
  //     }
  //   });
  // })
router.route('/:restaurant_id/edit')
  .all(function(req, res, next) {
    restaurant_id = req.params.restaurant_id;
    restaurant = {};
    Restaurant.findById(restaurant_id, function(err, c) {
      restaurant = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit', {edit: restaurant, moment: moment, user: req.user});
  })
  .post(function(req, res) {

    restaurant.name = req.body.name;
    restaurant.address = req.body.address;
    restaurant.description = req.body.description;
    restaurant.cuisine = req.body.cuisine;
    restaurant.maplink = req.body.maplink;
    restaurant.contact = req.body.contact;
    restaurant.zomato = req.body.zomato;
    restaurant.photo = req.body.photo;
    restaurant.photoslink = req.body.photoslink;
    restaurant.updatedate = moment().tz("Asia/Manila").format('LLL'),

    restaurant.save(function(err, restaurant, count) {
      if(err) {
        res.status(400).send('Error saving restaurant: ' + err);
      } else {
        res.redirect('/restaurants/'+restaurant_id)
      }
    });
  })

router.route('/:restaurant_id/delete')
  .all(function(req, res, next) {
    restaurant_id = req.params.restaurant_id;
    restaurant = {};
    Restaurant.findById(restaurant_id, function(err, c) {
      restaurant = c;
      next();
    });
  })
  .get(function(req, res) {
    restaurant.remove(function(err, restaurant) {
      if(err) {
        res.status(400).send("Error removing restaurant: " + err);
      } else {
        res.redirect('/restaurants');
      }
    });
  });

module.exports = router;
