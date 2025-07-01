// server/routes/api/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const postController = require('../../controllers/postController');
const upload = require('../../middleware/upload');

// @route   GET api/posts
// @desc    Get all posts
router.get('/', postController.getPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
router.get('/:id', postController.getPost);

// @route   POST api/posts
// @desc    Create a post
router.post('/', postController.createPost);

// @route   PUT api/posts/:id
// @desc    Update a post
router.put('/:id', postController.updatePost);

// @route   DELETE api/posts/:id
// @desc    Delete a post
router.delete('/:id', postController.deletePost);

module.exports = router;