var connection = require('../connect.js');

var adminController = function() {
	var getIndex = function(req, res) {
		res.render('admin');
	};

	var getDash = function(req, res) {

		connection.execute("SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS niceDate FROM posts WHERE author = ? ORDER BY id DESC", [req.user.username], function(err, results) {
			if(err) throw err;
			res.render('adminViews/dashboard', {
				username: req.user.username,
				results: results
			});
				});
	};

	var getEdit = function(req, res) {
		connection.execute("SELECT * FROM posts WHERE id = ?", [req.params.id], function(err, results) {
			if(err) throw err;
			res.render('adminViews/edit', {
				results: results[0],
				username: req.user.username
			});
		});
	};

	var getAdd = function(req, res) {
		res.render('adminViews/add', {
			username: req.user.username
		})
	};

	var getSettings = function(req, res) {
		connection.execute("SELECT * FROM config", function(err, results) {
			if(err) throw err;
			res.render('adminViews/settings', {
				username: req.user.username,
				results: results[0]
			})
		});
	};

	var update = function(req, res) {
		var post = {
			title: req.body.title,
			body: req.body.contentPost
		};

		connection.execute("UPDATE posts SET title = ?, body = ? WHERE posts.id = ?;", [post.title, post.body, req.params.id], function(err, results) {
			if(err) throw err;
			res.redirect('/admin/dashboard');
		});
	};

	var updateSettings = function(req, res) {
		var settings  = {
			name: req.body.blogName,
			title: req.body.blogTitle,
			description: req.body.blogDescription
		};

		connection.execute("UPDATE config SET name = ?, title = ?, description = ?;", [settings.name, settings.title, settings.description], function(err, results) {
			if(err) throw err;
			res.redirect('/admin/settings');
		});
	};

	var deletePost = function(req, res) {
		connection.execute("DELETE FROM posts WHERE posts.id = ?;", [req.params.id], function(err, results) {
			if(err) throw err;
			res.redirect('/admin/dashboard');
		});
	};

	var publish = function(req, res) {
		var post = {
			title: req.body.title,
			body: req.body.contentPost,
			date: new Date(),
			author: req.user.username
		};

		connection.execute("INSERT INTO posts (`title`, `body`, `author`, `date`) VALUES (?, ?, ?, ?);", [post.title, post.body, post.author, post.date], function(err, results) {
			if(err) throw err;
			res.redirect('/admin/dashboard');
		});
	};

	var isLogged = function(req, res, next) {
		if (!req.user) {
			return res.redirect('/admin');
		}

		next();
	};

	var logout = function(req, res) {
		req.logout();
		res.redirect('/admin');
	};

	return {
		getIndex: getIndex,
		getDash: getDash,
		isLogged: isLogged,
		logout: logout,
		getEdit: getEdit,
		update: update,
		getAdd: getAdd,
		publish: publish,
		getSettings: getSettings,
		updateSettings: updateSettings,
		deletePost: deletePost
	};
};

module.exports = adminController;