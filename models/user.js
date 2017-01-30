var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');




var User = new Schema({
	username:  {
		type: String,
		required: true,
		validate: {
          validator: function(z) {
            return /^([a-zA-z]{8,})$/.test(z);
          },
          message: 'Invalid Username! Must have at least 8 alpha characters, Must not have numbers and special characters'
        },
	},
	password: {
		type: String,
	},
	first_name: String,
	last_name: String,
	email: {
		type: String,
		validate: {
          validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: 'Invalid Email!'
        },
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);