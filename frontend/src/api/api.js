import axios from 'axios';

// Base API URL with environment variable support or Vite proxy fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Request interceptor to attach JWT auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learnnova_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified response handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.warn('[API Client Warning]', error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// Auth Service
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

// Courses Service
export const courseService = {
  getCourses: (params) => api.get('/courses', { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  enroll: (id) => api.post(`/courses/${id}/enroll`),
};

// Assignments Service
export const assignmentService = {
  getAssignments: (params) => api.get('/assignments', { params }),
  submitAssignment: (id, payload) => api.post(`/assignments/${id}/submit`, payload),
};

// Quizzes Service
export const quizService = {
  getQuizzes: () => api.get('/quizzes'),
  getQuizById: (id) => api.get(`/quizzes/${id}`),
  submitQuiz: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers }),
};

// Lectures / Keynotes Service
export const lectureService = {
  getLectures: (params) => api.get('/lectures', { params }),
  registerLecture: (id) => api.post(`/lectures/${id}/register`),
};

// Study Materials Service
export const materialService = {
  getMaterials: (params) => api.get('/materials', { params }),
  uploadMaterial: (payload) => api.post('/materials/upload', payload),
  downloadMaterial: (id) => api.post(`/materials/${id}/download`),
};

// Dashboard Service
export const dashboardService = {
  getOverview: () => api.get('/dashboard/overview'),
  getTimetable: () => api.get('/dashboard/timetable'),
};

// AI Study Assistant Service
export const aiService = {
  ask: (question) => api.post('/ai/ask', { question }),
};
