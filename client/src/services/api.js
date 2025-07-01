// services/api.js
const BASE_URL = process.env.REACT_APP_API_URL;

export const api = {
  // Blog Posts
  getPosts: async () => {
    const response = await fetch(`${BASE_URL}/api/posts`);
    return response.json();
  },

  getPost: async (id) => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`);
    return response.json();
  },

  createPost: async (postData) => {
    const response = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  // Projects
  getProjects: async () => {
    const response = await fetch(`${BASE_URL}/api/projects`);
    return response.json();
  },

  getProject: async (id) => {
    const response = await fetch(`${BASE_URL}/api/projects/${id}`);
    return response.json();
  },

  createProject: async (projectData) => {
    const response = await fetch(`${BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    return response.json();
  },

  updateProject: async (id, projectData) => {
    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    return response.json();
  },

  deleteProject: async (id) => {
    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Contact
  sendContact: async (formData) => {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  },
};