// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const allowedOrigins = [
  'http://www.alexlonon.com',
  'http://localhost:3000' // for development
];
const connectDB = require('./config/db');
const router = express.Router();
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

// Route Handler
app.get('/', (req, res) => {
    res.send('API Running');
});
router.get('/api/posts/:id', async (req, res) => {
  try {
    console.log('Received request for post ID:', req.params.id); // Debug log
    
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid post ID format' });
    }

    const post = await Post.findById(req.params.id);
    console.log('Found post:', post); // Debug log

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Server error when fetching post:', error); // Detailed error log
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message  // Include error message in development
    });
  }
});


// Import and use post routes 
const postRoutes = require('./routes/api/posts');
app.use('/api/posts', postRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});