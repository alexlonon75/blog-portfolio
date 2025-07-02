// server/routes/api/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const projectController = require('../../controllers/projectController');
const upload = require('../../middleware/upload');
const { validateProject, validateObjectId } = require('../../middleware/validation');

// @route   GET api/projects
// @desc    Get all projects
router.get('/', projectController.getProjects);

// @route   GET api/projects/:id
// @desc    Get project by ID
router.get('/:id', validateObjectId, projectController.getProject);

// @route   POST api/projects
// @desc    Create a project
router.post('/', validateProject, projectController.createProject);

// @route   PUT api/projects/:id
// @desc    Update a project
router.put('/:id', validateObjectId, validateProject, projectController.updateProject);

// @route   DELETE api/projects/:id
// @desc    Delete a project
router.delete('/:id', validateObjectId, projectController.deleteProject);

module.exports = router;
