var express = require('express');
var homeRoute = express.Router();
var homeController = require('../controllers/homeController')();

homeRoute.route('/').get(homeController.getIndex);

module.exports = homeRoute;