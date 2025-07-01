// scripts/updateImageUrls.js
// Run this script to update existing blog posts to use just filenames instead of full URLs

const mongoose = require('mongoose');
const Post = require('../models/Post');
require('dotenv').config();

async function updateImageUrls() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Find all posts with localhost URLs
    const posts = await Post.find({
      imageUrl: { $regex: /^http:\/\/localhost:5000\/images\// }
    });

    console.log(`Found ${posts.length} posts with localhost URLs`);

    for (const post of posts) {
      // Extract just the filename from the URL
      const filename = post.imageUrl.replace('http://localhost:5000/images/', '');
      
      console.log(`Updating post "${post.title}": ${post.imageUrl} -> ${filename}`);
      
      // Update the post
      await Post.findByIdAndUpdate(post._id, {
        imageUrl: filename
      });
    }

    console.log('✅ All posts updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating posts:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
updateImageUrls();
