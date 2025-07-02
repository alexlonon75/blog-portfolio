// server/scripts/seedProjects.js
const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const sampleProject = {
  title: "Automated Security Monitoring Dashboard",
  description: "To follow the creation of this portfolio site, I decided to use my skills in n8n to create an automated way to know if my site ever goes down. I created a workflow that triggers every 5 minutes, sending a GET request to my frontend. I then process this in a js code node to extract the status code and response time. This data is then sent to my database in MongoDB, and if the parameters do not meet the satisfactory conditions, a discord message is sent alerting me.",
  fullContent: `## Project Overview

This automated security monitoring dashboard represents a comprehensive approach to website uptime monitoring and alerting. The system combines workflow automation, real-time data processing, and intelligent alerting to ensure continuous monitoring of web services.

## Technical Implementation

### N8N Workflow Automation
The core of this system is built using n8n, a powerful workflow automation tool. The workflow is configured to:
- Trigger automatically every 5 minutes
- Send HTTP GET requests to the target website
- Process response data in real-time
- Store metrics in MongoDB
- Send alerts when issues are detected

### Data Processing
The JavaScript code node extracts critical metrics including:
- HTTP status codes
- Response times
- Availability status
- Error messages and timestamps

### Database Integration
All monitoring data is stored in MongoDB, providing:
- Historical uptime data
- Performance metrics over time
- Trend analysis capabilities
- Data persistence for reporting

### Alert System
The intelligent alerting system:
- Monitors for failed requests
- Checks response time thresholds
- Sends Discord notifications for immediate awareness
- Provides detailed error information

## Key Features

- **Real-time Monitoring**: Continuous 5-minute interval checks
- **Automated Alerts**: Instant Discord notifications for downtime
- **Data Persistence**: Historical data storage in MongoDB
- **Performance Tracking**: Response time monitoring
- **Error Analysis**: Detailed error logging and reporting

## Future Enhancements

- Dashboard visualization for historical data
- Multiple endpoint monitoring
- SMS/email alert options
- Performance threshold customization
- Integration with additional monitoring services`,
  preview: "Real-time monitoring system with automated alerts and dashboard visualization. Built with n8n workflows, MongoDB storage, and Discord notifications for comprehensive website uptime monitoring.",
  imageUrl: "security-dashboard.png",
  technologies: ["N8N", "Javascript", "HTTP Requests", "MongoDB", "APIs"],
  links: [
    { 
      title: "GitHub Repository", 
      url: "https://github.com/alexlonon75/n8n/tree/main/Automated%20Security%20Monitoring%20Dashboard" 
    }
  ],
  status: "Active",
  category: "Security & Monitoring",
  dateCreated: "06/2025",
  author: "Alex Lonon"
};

async function seedProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing projects (optional)
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Create the sample project
    const project = new Project(sampleProject);
    await project.save();
    
    console.log('Sample project created successfully:', project._id);
    
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedProjects();
