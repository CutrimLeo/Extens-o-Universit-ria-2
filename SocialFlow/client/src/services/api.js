import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (name, email, password) => apiClient.post('/auth/register', { name, email, password }),
  getMe: () => apiClient.get('/auth/me'),
};

export const postsAPI = {
  create: (data) => apiClient.post('/posts', data),
  getAll: (page = 1, limit = 10) => apiClient.get(`/posts?page=${page}&limit=${limit}`),
  getById: (id) => apiClient.get(`/posts/${id}`),
  update: (id, data) => apiClient.put(`/posts/${id}`, data),
  delete: (id) => apiClient.delete(`/posts/${id}`),
  publish: (id) => apiClient.post(`/posts/${id}/publish`),
};

export const metricsAPI = {
  getPost: (postId) => apiClient.get(`/metrics/post/${postId}`),
  getOverview: (period = '7d') => apiClient.get(`/metrics/overview?period=${period}`),
  getPlatform: (platform) => apiClient.get(`/metrics/platform/${platform}`),
};

export const activitiesAPI = {
  getAll: (page = 1, limit = 20) => apiClient.get(`/activities?page=${page}&limit=${limit}`),
  getById: (id) => apiClient.get(`/activities/${id}`),
};

export default apiClient;
