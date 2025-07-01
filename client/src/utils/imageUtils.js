// utils/imageUtils.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If the URL starts with localhost, replace it with the deployed API URL
  if (imageUrl.startsWith('http://localhost:5000')) {
    return imageUrl.replace('http://localhost:5000', API_URL);
  }
  
  // If it's a relative path, prepend the API URL
  if (imageUrl.startsWith('/images/')) {
    return `${API_URL}${imageUrl}`;
  }
  
  // If it's already a full URL, return as is
  return imageUrl;
};
