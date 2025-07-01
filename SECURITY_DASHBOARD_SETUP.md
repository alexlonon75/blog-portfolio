# Automated Security Monitoring Dashboard Setup

This project demonstrates automated security monitoring using n8n workflows integrated with your portfolio site.

## Architecture

```
n8n Workflows → Your Backend API → MongoDB → React Dashboard
```

## Prerequisites

1. **n8n Installation**
   ```bash
   npm install n8n -g
   # or
   npx n8n
   ```

2. **MongoDB** (already set up in your project)

3. **Your existing Node.js backend**

## Setup Steps

### 1. Backend Setup

1. **Install the security routes** (already created in `server/routes/security.js`)

2. **Add to your main server file** (`server/server.js`):
   ```javascript
   const securityRoutes = require('./routes/security');
   app.use('/api/security', securityRoutes);
   ```

3. **Install additional dependencies**:
   ```bash
   cd server
   npm install
   ```

### 2. n8n Workflow Setup

1. **Start n8n**:
   ```bash
   npx n8n
   ```
   Access at: http://localhost:5678

2. **Import workflows**:
   - Go to n8n interface
   - Click "Import from file"
   - Import `n8n-workflows/uptime-monitor.json`

3. **Configure webhook URLs** in workflows:
   - Update URLs to point to your backend: `http://localhost:5000/api/security/webhook/`

4. **Set up credentials** (if using Discord/Slack alerts):
   - Add Discord webhook URL
   - Configure any other notification services

### 3. Frontend Integration

1. **Add the SecurityDashboard component** to your portfolio:

   ```javascript
   // In your PortfolioPage or create a new route
   import SecurityDashboard from '../components/SecurityDashboard/SecurityDashboard';
   
   // Add to your portfolio projects or create dedicated route
   <SecurityDashboard />
   ```

2. **Add route** (optional - for dedicated security page):
   ```javascript
   // In App.jsx
   <Route path="/security" element={<SecurityDashboard />} />
   ```

### 4. Workflow Configurations

#### Uptime Monitor Workflow
- **Frequency**: Every 5 minutes
- **Checks**: HTTP status, response time
- **Alerts**: Discord/Slack when site is down
- **Data**: Stores in MongoDB via webhook

#### SSL Certificate Monitor Workflow
- **Frequency**: Daily
- **Checks**: Certificate expiry, issuer, validity
- **Alerts**: When certificate expires in <30 days
- **Data**: SSL grade and expiry information

#### Security Headers Workflow
- **Frequency**: Weekly
- **Checks**: CSP, HSTS, X-Frame-Options, etc.
- **Scoring**: Security posture grade (A-F)
- **Data**: Header compliance and security score

## Portfolio Showcase Points

### Technical Skills Demonstrated
1. **Automation**: n8n workflow design and implementation
2. **API Integration**: Webhook handling and data processing
3. **Database Design**: Security metrics schema
4. **Frontend Development**: Real-time dashboard with React
5. **DevOps**: Monitoring and alerting systems
6. **Cybersecurity**: Security header analysis, SSL monitoring

### Real-World Application
- **Continuous Monitoring**: 24/7 automated security checks
- **Incident Response**: Automated alerting for issues
- **Compliance Tracking**: Security posture over time
- **Performance Metrics**: Response time and uptime tracking

## Extending the Project

### Additional Workflows You Could Add
1. **GitHub Security Alerts**: Monitor your repos for vulnerabilities
2. **Domain Monitoring**: Check for subdomain takeovers
3. **Certificate Transparency**: Monitor for unauthorized certificates
4. **Blacklist Monitoring**: Check if your domain is blacklisted
5. **Performance Monitoring**: Core Web Vitals tracking

### Advanced Features
1. **Incident Response Automation**: Auto-create tickets when issues detected
2. **Report Generation**: Weekly security reports via email
3. **Compliance Dashboards**: SOC 2, ISO 27001 compliance tracking
4. **Threat Intelligence**: Integration with threat feeds

## Demo Script for Interviews

1. **Show the Dashboard**: Live security metrics
2. **Explain the Architecture**: n8n → API → Database → Frontend
3. **Demonstrate Workflows**: Show n8n interface and workflow logic
4. **Discuss Security Value**: Why each metric matters
5. **Show Alerting**: Demonstrate incident response automation

## Cost and Scalability

- **Development Cost**: ~20-30 hours to build
- **Running Cost**: Minimal (local n8n instance)
- **Scalability**: Can monitor multiple sites/services
- **Production Ready**: With proper hosting and monitoring

This project showcases both your technical skills and understanding of cybersecurity operations, making it perfect for your portfolio!
