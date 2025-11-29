import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// OCR Module
export const ocrAPI = {
  uploadDocument: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/ocr/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getDocuments: () => api.get('/ocr/documents'),
  getDocument: (id: string) => api.get(`/ocr/documents/${id}`),
  verifyDocument: (id: string, data: any) => api.post(`/ocr/documents/${id}/verify`, data),
  rejectDocument: (id: string, reason: string) => api.post(`/ocr/documents/${id}/reject`, { reason }),
};

// TICS Module
export const ticsAPI = {
  getSummary: () => api.get('/tics/summary'),
  getEfficiencyData: () => api.get('/tics/efficiency'),
  getStationThroughput: () => api.get('/tics/stations'),
};

// Traceability Module
export const traceAPI = {
  getShipments: (params?: { search?: string }) => api.get('/trace/shipments', { params }),
  getShipment: (id: string) => api.get(`/trace/shipments/${id}`),
};

// Auth
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
};

export default api;
