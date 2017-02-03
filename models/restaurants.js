const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://elijahdeasis:elijahdeasis30@ds111469.mlab.com:11469/coen3463-t12');

restify.serve(router, mongoose.model('Restaurant', new mongoose.Schema({
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

  createdate: String,

  updatedate: String,
})));

app.use(router);


module.exports = app;