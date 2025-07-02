// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {
  securityHeaders,
  generalLimiter,
  apiLimiter,
  webhookLimiter,
  httpsRedirect,
  requestLogger
} = require('./middleware/security');
const { sanitizeInput } = require('./middleware/validation');

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

// Security Middleware (applied first)
app.use(httpsRedirect);
app.use(securityHeaders);
app.use(requestLogger);
app.use(generalLimiter);

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parsing and sanitization
app.use(express.json({
  extended: false,
  limit: '10mb' // Prevent large payload attacks
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(sanitizeInput);

// Static files with security
app.use('/images', express.static('public/images', {
  maxAge: '1d',
  etag: false
}));

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


// Import and use post routes with API rate limiting
const postRoutes = require('./routes/api/posts');
app.use('/api/posts', apiLimiter, postRoutes);

// Import and use project routes with API rate limiting
const projectRoutes = require('./routes/api/projects');
app.use('/api/projects', apiLimiter, projectRoutes);

// Import and use security routes with webhook rate limiting for webhooks
const securityRoutes = require('./routes/api/security');
app.use('/api/security', (req, res, next) => {
  // Apply webhook limiter only to webhook endpoints
  if (req.path.includes('/webhook/')) {
    return webhookLimiter(req, res, next);
  }
  // Apply API limiter to other security endpoints
  return apiLimiter(req, res, next);
}, securityRoutes);

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