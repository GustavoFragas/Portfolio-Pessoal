import type { Profile, Project, Experience, Skill, Certificate, Education } from '../types';
import {
  profileData,
  projectsData,
  experiencesData,
  skillsData,
  certificatesData,
  educationData
} from '../data/portfolioData';

// Simulação de resposta de API usando dados estáticos
// Isso permite que o site funcione sem necessidade de backend
const createResponse = <T>(data: T) => Promise.resolve({ data });

export const profileApi = {
  getAll: () => createResponse<Profile[]>([profileData]),
  getById: (id: string) => createResponse<Profile>(profileData),
};

export const projectsApi = {
  getAll: () => createResponse<Project[]>(projectsData),
  getById: (id: string) => createResponse<Project | undefined>(
    projectsData.find(p => p.id === id)
  ),
};

export const experiencesApi = {
  getAll: () => createResponse<Experience[]>(experiencesData),
  getById: (id: string) => createResponse<Experience | undefined>(
    experiencesData.find(e => e.id === id)
  ),
};

export const skillsApi = {
  getAll: () => createResponse<Skill[]>(skillsData),
  getByCategory: (category: string) => createResponse<Skill[]>(
    skillsData.filter(s => s.category === category)
  ),
  getById: (id: string) => createResponse<Skill | undefined>(
    skillsData.find(s => s.id === id)
  ),
};

export const certificatesApi = {
  getAll: () => createResponse<Certificate[]>(certificatesData),
  getById: (id: string) => createResponse<Certificate | undefined>(
    certificatesData.find(c => c.id === id)
  ),
};

export const educationApi = {
  getAll: () => createResponse<Education[]>(educationData),
  getById: (id: string) => createResponse<Education | undefined>(
    educationData.find(e => e.id === id)
  ),
};
