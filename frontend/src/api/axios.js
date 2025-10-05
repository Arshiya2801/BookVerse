
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bookverse-9r9b.onrender.com/api', 
  timeout: 10000,
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export default API;
