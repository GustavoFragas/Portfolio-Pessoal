export interface Profile {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  linkedIn: string;
  gitHub: string;
  location: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  repoUrl: string;
  demoUrl?: string;
  imageUrl: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  isCurrent: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  logoUrl: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  url: string;
}
