// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const allowedOrigins = [
  'https://alexlonon.com',
  'https://www.alexlonon.com',
  'http://www.alexlonon.com',
  'http://localhost:3000', // for development
  'http://localhost:5678', // for n8n local development
  null // for server-to-server requests (n8n webhooks)
];
const connectDB = require('./config/db');
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
    res.json({
      message: 'Blog Portfolio API Running',
      status: 'healthy',
      timestamp: new Date().toISOString(),
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
});


// Import and use post routes 
const postRoutes = require('./routes/api/posts');
app.use('/api/posts', postRoutes);

// MongoDB connection
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URL exists:', !!process.env.MONGODB_URL);
console.log('MongoDB URL (first 20 chars):', process.env.MONGODB_URL ? process.env.MONGODB_URL.substring(0, 20) + '...' : 'undefined');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    console.error('Full error:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});