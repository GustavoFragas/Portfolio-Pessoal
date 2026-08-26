export interface Profile {
  id: string;
  name: string;
  role?: string;
  officialTitle?: string;
  headline?: string;
  bio: string;
  email: string;
  phone: string;
  linkedIn: string;
  gitHub: string;
  location: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  repoUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  createdAt: string;
}

export interface ProofItem {
  id: string;
  domain: string;
  evidence: string;
  validation: string;
}

export interface Experience {
  id: string;
  company?: string;
  organization?: string;
  role: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  description?: string;
  notes?: string[];
  isCurrent: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  problem: string;
  constraints: string[];
  responsibility: string;
  decisions: string[];
  validation: string[];
  stack: string[];
  link?: string;
  caveat?: string;
}

export interface CapabilityGroup {
  id: string;
  area: string;
  evidence: string;
  tools: string[];
  validation: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  period?: string;
  credentialUrl: string;
  logoUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  isCurrent: boolean;
  description?: string;
  url?: string;
}
