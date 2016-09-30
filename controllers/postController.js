var connection = require('../connect.js');

var postController = function() {

	var getIndex = function(req, res) {
		res.redirect('/');
	};

	var getById = function(req, res) {
		var id = req.params.id;

		connection.query("SELECT * FROM config; SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS niceDate FROM posts WHERE id = ?", [id], function(err, results) {
			if (err) {
				res.send(err);
			} else {
				res.render('post', {
					results: results[1][0],
					blogDetails: results[0][0]
				});
			}
		});
	};

	return {
		getIndex: getIndex,
		getById: getById
	};
};

module.exports = postController;