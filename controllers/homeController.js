var connection = require('../connect.js');

var homeController = function() {

	var getIndex = function(req, res) {
		connection.query("SELECT * FROM config; SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS niceDate FROM posts ORDER BY id DESC", function(err, results) {
			if (err) {
				res.send(err);
			} else {
				res.render('home', {
					results: results[1],
					blogDetails: results[0][0]
				});
			}
			
		});
	};

	return {
		getIndex: getIndex
	};

};

module.exports = homeController;