// server/controllers/projectController.js
const Project = require('../models/Project');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      fullContent, 
      preview, 
      imageUrl, 
      technologies, 
      links, 
      status, 
      category, 
      dateCreated, 
      author 
    } = req.body;

    const newProject = new Project({
      title,
      description,
      fullContent,
      preview,
      imageUrl,
      technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : [],
      links: links || [],
      status: status || 'In Progress',
      category,
      dateCreated,
      author: author || 'Alex Lonon'
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      fullContent, 
      preview, 
      imageUrl, 
      technologies, 
      links, 
      status, 
      category, 
      dateCreated 
    } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.fullContent = fullContent || project.fullContent;
    project.preview = preview || project.preview;
    project.imageUrl = imageUrl || project.imageUrl;
    project.technologies = technologies ? technologies.split(',').map(tech => tech.trim()) : project.technologies;
    project.links = links || project.links;
    project.status = status || project.status;
    project.category = category || project.category;
    project.dateCreated = dateCreated || project.dateCreated;
    project.updatedAt = Date.now();

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
