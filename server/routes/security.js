// routes/security.js
const express = require('express');
const router = express.Router();
const { UptimeCheck, SSLCheck, SecurityHeaders } = require('../models/SecurityMetrics');

// Get uptime statistics
router.get('/uptime', async (req, res) => {
  try {
    const { timeframe = '24h' } = req.query;
    
    let startTime = new Date();
    switch (timeframe) {
      case '1h':
        startTime.setHours(startTime.getHours() - 1);
        break;
      case '24h':
        startTime.setHours(startTime.getHours() - 24);
        break;
      case '7d':
        startTime.setDate(startTime.getDate() - 7);
        break;
      case '30d':
        startTime.setDate(startTime.getDate() - 30);
        break;
    }

    const checks = await UptimeCheck.find({
      timestamp: { $gte: startTime }
    }).sort({ timestamp: -1 });

    const totalChecks = checks.length;
    const upChecks = checks.filter(check => check.isUp).length;
    const uptime = totalChecks > 0 ? (upChecks / totalChecks) * 100 : 0;
    const avgResponseTime = checks.length > 0 
      ? checks.reduce((sum, check) => sum + check.responseTime, 0) / checks.length 
      : 0;

    res.json({
      uptime: uptime.toFixed(2),
      totalChecks,
      upChecks,
      avgResponseTime: Math.round(avgResponseTime),
      recentChecks: checks.slice(0, 20),
      currentStatus: checks.length > 0 ? checks[0].isUp : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get SSL certificate status
router.get('/ssl', async (req, res) => {
  try {
    const latestCheck = await SSLCheck.findOne().sort({ timestamp: -1 });
    
    if (!latestCheck) {
      return res.json({ message: 'No SSL checks available' });
    }

    res.json({
      domain: latestCheck.domain,
      issuer: latestCheck.issuer,
      validTo: latestCheck.validTo,
      daysUntilExpiry: latestCheck.daysUntilExpiry,
      isValid: latestCheck.isValid,
      grade: latestCheck.grade,
      lastChecked: latestCheck.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get security headers status
router.get('/headers', async (req, res) => {
  try {
    const latestCheck = await SecurityHeaders.findOne().sort({ timestamp: -1 });
    
    if (!latestCheck) {
      return res.json({ message: 'No security header checks available' });
    }

    res.json({
      headers: latestCheck.headers,
      score: latestCheck.score,
      grade: latestCheck.grade,
      lastChecked: latestCheck.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoints for n8n to post data
router.post('/webhook/uptime', async (req, res) => {
  try {
    const { url, status, responseTime, isUp, errorMessage } = req.body;
    
    const uptimeCheck = new UptimeCheck({
      url,
      status,
      responseTime,
      isUp,
      errorMessage
    });
    
    await uptimeCheck.save();
    res.json({ success: true, message: 'Uptime check recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook/ssl', async (req, res) => {
  try {
    const { domain, issuer, validFrom, validTo, daysUntilExpiry, isValid, grade } = req.body;
    
    const sslCheck = new SSLCheck({
      domain,
      issuer,
      validFrom: new Date(validFrom),
      validTo: new Date(validTo),
      daysUntilExpiry,
      isValid,
      grade
    });
    
    await sslCheck.save();
    res.json({ success: true, message: 'SSL check recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook/headers', async (req, res) => {
  try {
    const { url, headers, score, grade } = req.body;
    
    const securityHeaders = new SecurityHeaders({
      url,
      headers,
      score,
      grade
    });
    
    await securityHeaders.save();
    res.json({ success: true, message: 'Security headers check recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard overview
router.get('/dashboard', async (req, res) => {
  try {
    // Get latest data from each check type
    const [latestUptime, latestSSL, latestHeaders] = await Promise.all([
      UptimeCheck.findOne().sort({ timestamp: -1 }),
      SSLCheck.findOne().sort({ timestamp: -1 }),
      SecurityHeaders.findOne().sort({ timestamp: -1 })
    ]);

    // Calculate 24h uptime
    const last24h = new Date();
    last24h.setHours(last24h.getHours() - 24);
    
    const uptimeChecks = await UptimeCheck.find({
      timestamp: { $gte: last24h }
    });
    
    const uptime24h = uptimeChecks.length > 0 
      ? (uptimeChecks.filter(check => check.isUp).length / uptimeChecks.length) * 100 
      : 0;

    res.json({
      overview: {
        currentStatus: latestUptime?.isUp || false,
        uptime24h: uptime24h.toFixed(2),
        sslDaysLeft: latestSSL?.daysUntilExpiry || 0,
        sslGrade: latestSSL?.grade || 'Unknown',
        securityScore: latestHeaders?.score || 0,
        securityGrade: latestHeaders?.grade || 'Unknown',
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
