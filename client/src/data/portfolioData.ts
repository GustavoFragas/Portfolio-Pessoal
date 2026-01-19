import type { Profile, Project, Experience, Skill, Certificate, Education } from '../types';

// Dados do Profile
export const profileData: Profile = {
  id: "1",
  name: "Gustavo Fragas Cunha",
  role: "Desenvolvedor de Software (.NET + React)",
  bio: "Desenvolvedor fullstack com experiência em .NET, C#, React e SQL. Transição de carreira de suporte técnico trilíngue para desenvolvimento de software, com forte experiência em liderança e resolução de problemas. Fluente em Português, Espanhol e Inglês (B2).",
  email: "gustavofragascunha@gmail.com",
  phone: "+55 11 98019-2710",
  linkedIn: "https://linkedin.com/in/gustavofragascunha",
  gitHub: "https://github.com/GustavoFragas",
  location: "São Paulo, Brasil",
  imageUrl: "/images/profile.jpg"
};

// Dados das Experiências
export const experiencesData: Experience[] = [
  {
    id: "1",
    company: "Alest Consultoria",
    role: "Estagiário em Desenvolvimento de Sistemas",
    startDate: "2025-10-27",
    endDate: undefined,
    isCurrent: true,
    description: "• Desenvolvimento Backend com TypeScript e Python\n• Criação de integrações e produtos para plataformas parceiras\n• Trabalho com Google Cloud Platform (GCP), bancos de dados SQL e NoSQL\n• Aplicação de metodologias ágeis e foco em soluções escaláveis"
  },
  {
    id: "2",
    company: "Atento",
    role: "Suporte Técnico Trilíngue (META)",
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    isCurrent: false,
    description: "• Suporte técnico especializado para plataformas Meta (Facebook, Instagram, WhatsApp)\n• Atendimento trilíngue (Português, Espanhol, Inglês) com resolução de 95% dos casos no primeiro contato\n• Redução de 30% no tempo médio de atendimento através de otimização de processos"
  },
  {
    id: "3",
    company: "IJCSUD",
    role: "Representante Institucional",
    startDate: "2023-03-01",
    endDate: "2025-04-30",
    isCurrent: false,
    description: "• Liderança e gestão de equipe de 70+ pessoas, resultando em crescimento de 210% nas métricas principais (38 para 118 batizados)\n• Implementação de sistema de treinamento que capacitou 70+ pessoas, aumentando a produtividade em 40%\n• Gestão de dados e análise de métricas usando Excel, otimizando processos e tomada de decisões estratégicas"
  },
  {
    id: "4",
    company: "Beneficência Portuguesa de São Paulo",
    role: "Jovem Aprendiz - Suporte Técnico",
    startDate: "2021-05-01",
    endDate: "2022-11-30",
    isCurrent: false,
    description: "• Suporte técnico em ambiente hospitalar com sistema Tasy (gestão hospitalar)\n• Atendimento a 50+ usuários diários, mantendo 98% de satisfação\n• Redução de 25% no tempo de resolução de incidentes através de documentação de processos e criação de base de conhecimento"
  }
];

// Dados das Skills
export const skillsData: Skill[] = [
  // Backend
  { id: "1", name: "C#", category: "Backend", level: 55 },
  { id: "2", name: ".NET", category: "Backend", level: 50 },
  { id: "3", name: "Python", category: "Backend", level: 60 },
  { id: "4", name: "TypeScript", category: "Backend", level: 45 },
  { id: "5", name: "PHP", category: "Backend", level: 40 },
  { id: "6", name: "Laravel", category: "Backend", level: 30 },
  
  // Frontend
  { id: "7", name: "React.js", category: "Frontend", level: 30 },
  { id: "8", name: "HTML5", category: "Frontend", level: 70 },
  { id: "9", name: "CSS3", category: "Frontend", level: 70 },
  { id: "10", name: "TailwindCSS", category: "Frontend", level: 30 },
  
  // Database
  { id: "11", name: "SQL Server", category: "Database", level: 50 },
  { id: "12", name: "MySQL", category: "Database", level: 55 },
  { id: "13", name: "PostgreSQL", category: "Database", level: 30 },
  { id: "14", name: "NoSQL", category: "Database", level: 30 },
  { id: "15", name: "phpMyAdmin", category: "Database", level: 50 },
  
  // Tools
  { id: "16", name: "Git", category: "Tools", level: 60 },
  { id: "17", name: "GitHub", category: "Tools", level: 60 },
  { id: "18", name: "Visual Studio", category: "Tools", level: 55 },
  { id: "19", name: "VS Code", category: "Tools", level: 65 },
  { id: "20", name: "Windsurf IDE", category: "Tools", level: 60 },
  { id: "21", name: "Notion", category: "Tools", level: 80 },
  { id: "22", name: "XAMPP", category: "Tools", level: 30 },
  { id: "23", name: "USBWebServer", category: "Tools", level: 50 },
  { id: "24", name: "Google Cloud Platform", category: "Tools", level: 30 },
  
  // Soft Skills
  { id: "25", name: "Liderança", category: "Soft Skills", level: 85 },
  { id: "26", name: "Comunicação", category: "Soft Skills", level: 90 },
  { id: "27", name: "Resolução de Problemas", category: "Soft Skills", level: 85 },
  { id: "28", name: "Trabalho em Equipe", category: "Soft Skills", level: 85 },
  { id: "29", name: "Proatividade", category: "Soft Skills", level: 90 },
  
  // Languages
  { id: "30", name: "Português (Nativo)", category: "Languages", level: 100 },
  { id: "31", name: "Espanhol (Fluente)", category: "Languages", level: 95 },
  { id: "32", name: "Inglês (B2)", category: "Languages", level: 85 }
];

// Dados dos Projetos
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Portfólio Pessoal Fullstack",
    description: "Portfólio profissional desenvolvido com arquitetura Clean Architecture, demonstrando habilidades em .NET e React. API RESTful com Swagger e frontend responsivo com design moderno.",
    techStack: ".NET 9, React, TypeScript, TailwindCSS, Entity Framework",
    repoUrl: "https://github.com/GustavoFragas/Portfolio-Pessoal",
    demoUrl: "https://portfolio-pessoal-vert.vercel.app/",
    imageUrl: "/images/projects/portfolio.jpg",
    createdAt: "2025-11-01"
  },
  {
    id: "2",
    title: "Sistema para Estacionamento",
    description: "Sistema completo para gestão de estacionamentos com controle de entrada/saída de veículos, cálculo automático de tarifas e geração de relatórios. Desenvolvido em C# com Windows Forms.",
    techStack: "C#, Windows Forms, SQL Server",
    repoUrl: "https://github.com/GustavoFragas/Sistema-para-Estacionamento",
    demoUrl: undefined,
    imageUrl: "/images/projects/parking.jpg",
    createdAt: "2024-06-01"
  }
];

// Dados dos Certificados
export const certificatesData: Certificate[] = [
  {
    id: "1",
    name: "Certificação B2 - Inglês Avançado",
    issuer: "LingoPass",
    issueDate: "2025-08-15",
    credentialUrl: "/certificates/Lingopass certificate B2 Advanced.pdf",
    logoUrl: "/images/certificates/lingopass.png"
  },
  {
    id: "2",
    name: "Versionamento de Código com Git e GitHub",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-07-10",
    credentialUrl: "/certificates/Versionamento de Código com Git e GitHub.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "3",
    name: "Sintaxe Básica com .NET C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-07-15",
    credentialUrl: "/certificates/Sintaxe Básica com .NET CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "4",
    name: "Sintaxe e Tipos de Dados em C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-07-18",
    credentialUrl: "/certificates/Sintaxe e Tipos de Dados em CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "5",
    name: "Operadores Aritméticos em C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-07-20",
    credentialUrl: "/certificates/Operadores Aritméticos em CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "6",
    name: "Tipos de Operadores em C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-07-22",
    credentialUrl: "/certificates/Tipos de Operadores em CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "7",
    name: "Conhecendo a Organização de um Programa C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-07-25",
    credentialUrl: "/certificates/Conhecendo a Organização de um Programa CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "8",
    name: "Conhecendo as Estruturas de Repetição em C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-07-28",
    credentialUrl: "/certificates/Conhecendo as Estruturas de Repetição em CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "9",
    name: "Array e Listas em C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-08-01",
    credentialUrl: "/certificates/Array e Listas em CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "10",
    name: "Propriedades, Métodos e Construtores com C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-08-05",
    credentialUrl: "/certificates/Propriedades, Métodos e Construtores com CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "11",
    name: "Comentários e Boas Práticas em C#",
    issuer: "Digital Innovation One (DIO)",
    issueDate: "2025-08-08",
    credentialUrl: "/certificates/Comentários e Boas Práticas em CSharp.pdf",
    logoUrl: "/images/certificates/dio.png"
  },
  {
    id: "12",
    name: "Notion Certified Admin",
    issuer: "Notion",
    issueDate: "2025-10-15",
    credentialUrl: "https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946",
    logoUrl: "/certificates/notion-certified-admin.png"
  }
];

// Dados de Educação
export const educationData: Education[] = [
  {
    id: "1",
    institution: "BYU Pathway Worldwide 🇺🇸",
    degree: "Bacharelado",
    field: "Software Development",
    startDate: "2025-05-01",
    endDate: undefined,
    isCurrent: true,
    description: "Programa internacional de desenvolvimento de software com foco em programação, banco de dados e desenvolvimento web. Instituição americana credenciada. Atualmente no 4º bloco do programa.",
    url: "https://www.byupathway.edu/"
  },
  {
    id: "2",
    institution: "UFBRA",
    degree: "Tecnólogo",
    field: "Análise e Desenvolvimento de Sistemas",
    startDate: "2025-10-01",
    endDate: undefined,
    isCurrent: true,
    description: "Curso superior de tecnologia focado em desenvolvimento de sistemas, banco de dados e engenharia de software. 1º semestre em andamento.",
    url: "https://www.ufbra.edu.br/"
  },
  {
    id: "3",
    institution: "ETEC Parque Belém",
    degree: "Técnico",
    field: "Desenvolvimento de Sistemas",
    startDate: "2020-02-01",
    endDate: "2022-12-31",
    isCurrent: false,
    description: "Curso técnico completo em desenvolvimento de sistemas com foco em programação, banco de dados e desenvolvimento web.",
    url: "https://www.cps.sp.gov.br/"
  },
  {
    id: "4",
    institution: "Digital Innovation One (DIO)",
    degree: "Bootcamp",
    field: ".NET e Banco de Dados MySQL",
    startDate: "2025-06-01",
    endDate: undefined,
    isCurrent: true,
    description: "Plataforma de aprendizado com foco em .NET, C#, MySQL e desenvolvimento backend.",
    url: "https://www.dio.me/"
  },
  {
    id: "5",
    institution: "Autodidata",
    degree: "Estudos",
    field: "AWS Cloud Practitioner",
    startDate: "2025-11-01",
    endDate: undefined,
    isCurrent: true,
    description: "Estudando para certificação AWS Cloud Practitioner com foco em serviços de nuvem e arquitetura AWS.",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
  },
  {
    id: "6",
    institution: "Autodidata",
    degree: "Estudos",
    field: "Monday.com Platform",
    startDate: "2025-10-01",
    endDate: undefined,
    isCurrent: true,
    description: "Aprendendo gerenciamento de projetos e automação de processos com Monday.com.",
    url: "https://monday.com/"
  },
  {
    id: "7",
    institution: "Notion",
    degree: "Ferramenta",
    field: "Organização e Produtividade",
    startDate: "2025-10-01",
    endDate: undefined,
    isCurrent: true,
    description: "Uso avançado do Notion para organização pessoal, gestão de projetos e documentação.",
    url: "https://www.notion.so/"
  }
];
