// server/controllers/postController.js
const Post = require('../models/Post');

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags, author, imageUrl } = req.body;

    const newPost = new Post({
      title,
      content,
      imageUrl,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      author
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.imageUrl = imageUrl || post.imageUrl;
    post.tags = tags ? tags.split(',').map(tag => tag.trim()) : post.tags;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};