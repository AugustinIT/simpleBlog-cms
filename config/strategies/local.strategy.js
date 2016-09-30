var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('../../connect.js');

module.exports = function() {

	passport.use(new LocalStrategy({
		usernameField: 'userName',
		passwordField: 'password'
	},
	function(username, password, done) {
		connection.execute("SELECT * FROM users WHERE username = ?;", [username], function(err, results) {
			if(err) throw err;
			if (results[0] && results[0].password === password) {
				var user = results[0];
				done(null, user);
			} else {
				done(null, false, {message: "Wrong user or password"});
			}
		});
	}));

};