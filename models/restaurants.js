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

restify.serve(router, mongoose.model('Customer', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
})));

app.use(router);

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
});
module.exports = app;