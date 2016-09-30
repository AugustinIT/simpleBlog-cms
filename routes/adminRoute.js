var express = require('express');
var adminRoute = express.Router();
var passport = require('passport');
var adminController = require('../controllers/adminController')();

adminRoute.route('/')
	.all(function(req, res, next) {(req.user) ? res.redirect('/admin/dashboard') : next()})
	.get(adminController.getIndex);

adminRoute.route('/signin').post(passport.authenticate('local', {
	failureRedirect: '/admin'
}), function(req, res) {
		res.redirect('/admin/dashboard');
});

adminRoute.route('/dashboard').get(adminController.isLogged, adminController.getDash);

adminRoute.route('/logout').get(adminController.isLogged, adminController.logout);

adminRoute.route('/edit/:id')
	.get(adminController.isLogged, adminController.getEdit)
	.post(adminController.isLogged, adminController.update);

adminRoute.route('/add')
	.get(adminController.isLogged, adminController.getAdd)
	.post(adminController.isLogged, adminController.publish);

adminRoute.route('/settings')
	.get(adminController.isLogged, adminController.getSettings)
	.post(adminController.isLogged, adminController.updateSettings);

adminRoute.route('/deletePost/:id').get(adminController.isLogged, adminController.deletePost);

module.exports = adminRoute;