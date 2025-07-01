// services/api.js
const BASE_URL = process.env.REACT_APP_API_URL;

export const api = {
  getPosts: async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    return response.json();
  },
  
  getProject: async () => {
    const response = await fetch(`${BASE_URL}/projects`);
    return response.json();
  },
  
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