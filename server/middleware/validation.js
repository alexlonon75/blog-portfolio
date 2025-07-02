// server/middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  // Sanitize against NoSQL injection
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.query);
  mongoSanitize.sanitize(req.params);
  
  // XSS protection for string fields
  const sanitizeObject = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = xss(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  };
  
  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  
  next();
};

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Post validation rules
const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content must be between 1 and 10000 characters'),
  body('author')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author must be between 1 and 100 characters'),
  body('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a string'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  handleValidationErrors
];

// Project validation rules
const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  body('fullContent')
    .trim()
    .isLength({ min: 1, max: 20000 })
    .withMessage('Full content must be between 1 and 20000 characters'),
  body('preview')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Preview must be between 1 and 500 characters'),
  body('category')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category must be between 1 and 100 characters'),
  body('technologies')
    .optional()
    .isString()
    .withMessage('Technologies must be a string'),
  body('status')
    .optional()
    .isIn(['Active', 'Completed', 'In Progress', 'Archived'])
    .withMessage('Status must be one of: Active, Completed, In Progress, Archived'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  handleValidationErrors
];

// Contact form validation
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters'),
  handleValidationErrors
];

// ID parameter validation
const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors
];

// Query parameter validation
const validateTimeframe = [
  query('timeframe')
    .optional()
    .isIn(['1h', '24h', '7d', '30d'])
    .withMessage('Timeframe must be one of: 1h, 24h, 7d, 30d'),
  handleValidationErrors
];

module.exports = {
  sanitizeInput,
  validatePost,
  validateProject,
  validateContact,
  validateObjectId,
  validateTimeframe,
  handleValidationErrors
};
