var express = require('express');
var aboutRoute = express.Router();
var connection = require('../connect.js');

aboutRoute.route('/').get(function(req, res) {
	connection.query('SELECT * FROM config', function(err, results) {
		if(err) {
			res.send(err);
		} else {
			res.render('about', {
				blogDetails: results[0]
			});
		}

	});
});

module.exports = aboutRoute;