// models/SecurityMetrics.js
const mongoose = require('mongoose');

const uptimeCheckSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  url: { type: String, required: true },
  status: { type: Number, required: true }, // HTTP status code
  responseTime: { type: Number, required: true }, // in milliseconds
  isUp: { type: Boolean, required: true },
  errorMessage: { type: String, default: null }
});

const sslCheckSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  domain: { type: String, required: true },
  issuer: { type: String, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
  daysUntilExpiry: { type: Number, required: true },
  isValid: { type: Boolean, required: true },
  grade: { type: String, enum: ['A+', 'A', 'B', 'C', 'D', 'F'], required: true }
});

const securityHeadersSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  url: { type: String, required: true },
  headers: {
    contentSecurityPolicy: { type: Boolean, default: false },
    strictTransportSecurity: { type: Boolean, default: false },
    xFrameOptions: { type: Boolean, default: false },
    xContentTypeOptions: { type: Boolean, default: false },
    referrerPolicy: { type: Boolean, default: false },
    permissionsPolicy: { type: Boolean, default: false }
  },
  score: { type: Number, min: 0, max: 100, required: true },
  grade: { type: String, enum: ['A+', 'A', 'B', 'C', 'D', 'F'], required: true }
});

const UptimeCheck = mongoose.model('UptimeCheck', uptimeCheckSchema);
const SSLCheck = mongoose.model('SSLCheck', sslCheckSchema);
const SecurityHeaders = mongoose.model('SecurityHeaders', securityHeadersSchema);

module.exports = {
  UptimeCheck,
  SSLCheck,
  SecurityHeaders
};
