import axios from 'axios';
import type { Profile, Project, Experience, Skill, Certificate } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5167';

const api = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/$/, '')}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const profileApi = {
  getAll: () => api.get<Profile[]>('/profile'),
  getById: (id: string) => api.get<Profile>(`/profile/${id}`),
};

export const projectsApi = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: string) => api.get<Project>(`/projects/${id}`),
};

export const experiencesApi = {
  getAll: () => api.get<Experience[]>('/experiences'),
  getById: (id: string) => api.get<Experience>(`/experiences/${id}`),
};

export const skillsApi = {
  getAll: () => api.get<Skill[]>('/skills'),
  getByCategory: (category: string) => api.get<Skill[]>(`/skills/by-category/${category}`),
  getById: (id: string) => api.get<Skill>(`/skills/${id}`),
};

export const certificatesApi = {
  getAll: () => api.get<Certificate[]>('/certificates'),
  getById: (id: string) => api.get<Certificate>(`/certificates/${id}`),
};

export default api;
