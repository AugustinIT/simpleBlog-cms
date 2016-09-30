var express = require('express'),
	singlePost = express.Router(),
	postController = require('../controllers/postController')();

singlePost.route('/').get(postController.getIndex);
singlePost.route('/:id').get(postController.getById);

module.exports = singlePost;