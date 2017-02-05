var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment-timezone');

var RestaurantSchema = new Schema({

  // id is created automatically
  name: {

    type: String,

    required: [true, 'Fill up Name']
  },
  address: {

    type: String,

    required: [true, 'Fill up Address']

  },
  description: String,
  cuisine: String,
  maplink: String,
  contact: String,
  zomato: String,
  photo: String,
  photoslink: String,
  createdate: {

    type: Date,
  },
  updatedate: String,

});

module.exports = mongoose.model('Restaurant', RestaurantSchema);