// server/models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fullContent: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  technologies: [{
    type: String
  }],
  links: [{
    title: String,
    url: String
  }],
  status: {
    type: String,
    enum: ['Active', 'Completed', 'In Progress', 'Archived'],
    default: 'In Progress'
  },
  category: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: 'Alex Lonon'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
