import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// attach token
api.setToken = token => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
