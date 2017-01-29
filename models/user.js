var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

require('mongoose-type-email');

var User = new Schema({
	username: String,
	password: String,
	first_name: String,
	last_name: String,
	email: String,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);