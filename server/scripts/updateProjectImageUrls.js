// scripts/updateProjectImageUrls.js
// Run this script to update existing projects to use just filenames instead of full URLs

const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

async function updateProjectImageUrls() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Find all projects with localhost URLs or paths starting with /
    const projects = await Project.find({
      $or: [
        { imageUrl: { $regex: /^http:\/\/localhost:5000\/images\// } },
        { imageUrl: { $regex: /^\/images\// } },
        { imageUrl: { $regex: /^\// } }
      ]
    });

    console.log(`Found ${projects.length} projects with URLs that need updating`);

    for (const project of projects) {
      let filename = project.imageUrl;
      
      // Extract filename from localhost URL
      if (project.imageUrl.startsWith('http://localhost:5000/images/')) {
        filename = project.imageUrl.replace('http://localhost:5000/images/', '');
      }
      // Extract filename from /images/ path
      else if (project.imageUrl.startsWith('/images/')) {
        filename = project.imageUrl.replace('/images/', '');
      }
      // Extract filename from any path starting with /
      else if (project.imageUrl.startsWith('/')) {
        filename = project.imageUrl.replace('/', '');
      }
      
      console.log(`Updating project "${project.title}": ${project.imageUrl} -> ${filename}`);
      
      // Update the project
      await Project.findByIdAndUpdate(project._id, {
        imageUrl: filename
      });
    }

    console.log('✅ All projects updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating projects:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
updateProjectImageUrls();
