var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');

var index = require('./routes/index');
var users = require('./routes/users');
var create = require('./routes/create');
var about = require('./routes/about');


var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var mdbUrl = "mongodb://elijahdeasis:elijahdeasis30@ds111469.mlab.com:11469/coen3463-t12"
MongoClient.connect(mdbUrl, function(err, database) {

    if (err) {
        console.log(err)
        return;
    }

    console.log("Connected to DB!");

    // set database
    db = database;

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', index);
    app.use('/create', create);
    app.use('/about', about);
    
    app.get('/about', function(req, res) {
          res.render('about', { title: 'Top Manila Restaurants 2017' });
    });

    app.get('/create', function(req, res) {
          res.render('create', { title: 'Top Manila Restaurants 2017' });
    });
    app.get('/restaurants/create', function(req, res) {
          res.render('create', { title: 'Top Manila Restaurants 2017' });
    });


    app.get('/restaurants', function(req, res) {
        var restaurantsCollection = db.collection('restaurants');
        restaurantsCollection.find().toArray(function(err, restaurants) {
           console.log('restaurants loaded', restaurants);
          res.render('restaurants', {
            restaurants: restaurants
          });
        })

    });



    app.post('/restaurants/create', function(req, res) {
        console.log(req.body);
        var dataToSave = {
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            cuisine: req.body.cuisine,
            maplink: req.body.maplink,
            contact: req.body.contact,
            zomato: req.body.zomato,
            photo: req.body.photo,
            photoslink: req.body.photoslink,
            createdate: moment().format('LLL'),
        };
        db.collection('restaurants')
          .save(dataToSave, function(err, restaurant){
            if (err) {
                console.log('Saving Data Failed!');
                return;
            }
            console.log("Saving Data Successful!");
            res.redirect('/restaurants');
        })
    });

    app.get('/restaurant/:restaurantId', function(req, res) {
        var restaurantId = req.params.restaurantId;
        var restaurantCollection = db.collection('restaurants');
        restaurantCollection.findOne({ _id: new ObjectId(restaurantId) }, function(err, restaurant) {
            res.render('restaurant', {
                restaurant: restaurant
            });
        });	
    });
    
    app.get('/restaurant/:restaurantId/edit', function(req, res) { 
    	//res.render('edit', {restaurantId:req.params.restaurantId})
     	var restaurantId = req.params.restaurantId;
        var restaurantCollection = db.collection('restaurants');
        restaurantCollection.findOne({ _id: new ObjectId(restaurantId) }, function(err, restaurant) {
            res.render('edit', {
                edit: restaurant
            });
        });
    });

    app.post('/restaurant/:restaurantId/edit', function(req, res) {
        var restaurantId = req.params.restaurantId;
        var restaurantCollection = db.collection('restaurants');
        var datasave={
			name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            cuisine: req.body.cuisine,
            maplink: req.body.maplink,
            contact: req.body.contact,
            zomato: req.body.zomato,
            photo: req.body.photo,
            photoslink: req.body.photoslink,
            updatedate: moment().format('LLL'),
        };
        restaurantCollection.updateOne({ _id: new ObjectId(restaurantId)},{$set: datasave}, function(err, restaurant) {
            if(err){
			return console.log(err)
			}
			console.log("Updating Data Successful!");
	        res.redirect('/restaurant/'+restaurantId)
			// db.collection('restaurants')
   //        		.update(datasave,function(err, restaurant){
	            // if (err) {
	            //     console.log('Saving Data Failed!');
	            //     return;
	            // }
	            // console.log("Saving Data Successfull!");
	            // res.redirect('/restaurant/'+restaurantId)
	        // })
			
        });
    });

    app.get('/restaurant/:restaurantId/delete', function(req, res) {
        var restaurantId = req.params.restaurantId;
        var restaurantCollection = db.collection('restaurants');
        restaurantCollection.deleteOne({ _id: new ObjectId(restaurantId)}, function(err, restaurant) {
        	// res.render('restaurant', {
         //        restaurant: restaurant
         //    });
            if(err){
			return console.log(err)
			}
			console.log("Deleting Data Successful!");
	        res.redirect('/restaurants')
			
        });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
});





module.exports = app;
