import type { Profile, Project, Experience, Skill, Certificate, Education } from '../types';

// Dados do Profile
export const profileData: Profile = {
  id: "1",
  name: "Gustavo Fragas Cunha",
  role: "Software Engineer C#/.NET | Backend, APIs & AI Automation",
  bio: "Oi, tudo bem? Sou desenvolvedor de software com foco em C#/.NET, backend, APIs, integrações e automações com IA. Trabalho transformando processos manuais e dados espalhados em sistemas mais limpos, observáveis e fáceis de manter, usando também TypeScript, React, AWS, Notion, Monday e ferramentas modernas de AI-assisted development.",
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
    role: "Software Engineer | Desenvolvimento de Sistemas",
    startDate: "2025-10-27",
    endDate: undefined,
    isCurrent: true,
    description: "• Desenvolvimento de APIs, integrações e automações para plataformas internas e ferramentas SaaS\n• Construção de rotinas de observabilidade, saneamento de dados e rastreio de execuções para apoiar decisões técnicas\n• Uso de C#/.NET, TypeScript, Node.js, React, AWS, SQL/NoSQL e integrações com Notion, Monday e Google APIs\n• Aplicação prática de AI-assisted development com Codex, Kiro e Windsurf para acelerar entregas com revisão técnica"
  },
  {
    id: "2",
    company: "Atento",
    role: "Suporte Técnico Trilíngue (META)",
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    isCurrent: false,
    description: "• Suporte técnico especializado para plataformas Meta, com análise de incidentes, comunicação clara e priorização de problemas\n• Atendimento trilíngue em Português, Espanhol e Inglês, atuando em cenários de alta pressão e alto volume\n• Criação de documentação e melhoria de processos para reduzir retrabalho e acelerar resolução de chamados"
  },
  {
    id: "3",
    company: "IJCSUD",
    role: "Representante Institucional",
    startDate: "2023-03-01",
    endDate: "2025-04-30",
    isCurrent: false,
    description: "• Liderança e treinamento de equipes multiculturais, com foco em comunicação, rotina e acompanhamento de indicadores\n• Organização de dados operacionais, análise de métricas e padronização de processos para apoiar decisões locais\n• Experiência internacional na Argentina, fortalecendo fluência em Espanhol e colaboração em contextos diversos"
  },
  {
    id: "4",
    company: "Beneficência Portuguesa de São Paulo",
    role: "Jovem Aprendiz - Suporte Técnico",
    startDate: "2021-05-01",
    endDate: "2022-11-30",
    isCurrent: false,
    description: "• Suporte técnico em ambiente hospitalar com sistema Tasy e atendimento a usuários internos\n• Diagnóstico de incidentes, documentação de processos e criação de base de conhecimento\n• Experiência inicial com operação crítica, suporte a sistemas e comunicação com áreas não técnicas"
  }
];

// Dados das Skills
export const skillsData: Skill[] = [
  // Backend
  { id: "1", name: "C#", category: "Backend", level: 78 },
  { id: "2", name: ".NET / ASP.NET Core", category: "Backend", level: 76 },
  { id: "3", name: "API REST", category: "Backend", level: 78 },
  { id: "4", name: "TypeScript", category: "Backend", level: 72 },
  { id: "5", name: "Node.js", category: "Backend", level: 70 },
  { id: "6", name: "Python", category: "Backend", level: 62 },
  
  // Frontend
  { id: "7", name: "React.js", category: "Frontend", level: 68 },
  { id: "8", name: "TypeScript UI", category: "Frontend", level: 66 },
  { id: "9", name: "TailwindCSS", category: "Frontend", level: 64 },
  { id: "10", name: "HTML5 / CSS3", category: "Frontend", level: 72 },
  
  // Database
  { id: "11", name: "SQL Server", category: "Database", level: 68 },
  { id: "12", name: "PostgreSQL", category: "Database", level: 62 },
  { id: "13", name: "MySQL", category: "Database", level: 64 },
  { id: "14", name: "NoSQL", category: "Database", level: 58 },
  { id: "15", name: "Data Cleanup", category: "Database", level: 74 },
  
  // Cloud & DevOps
  { id: "16", name: "AWS", category: "Cloud & DevOps", level: 66 },
  { id: "17", name: "Docker", category: "Cloud & DevOps", level: 58 },
  { id: "18", name: "Git / GitHub", category: "Cloud & DevOps", level: 76 },
  { id: "19", name: "GitHub Actions", category: "Cloud & DevOps", level: 56 },
  { id: "20", name: "Observability", category: "Cloud & DevOps", level: 70 },
  { id: "21", name: "Linux / macOS", category: "Cloud & DevOps", level: 64 },

  // AI & Automation
  { id: "22", name: "Codex / AI Coding", category: "AI & Automation", level: 82 },
  { id: "23", name: "Kiro / Windsurf", category: "AI & Automation", level: 76 },
  { id: "24", name: "Notion API", category: "AI & Automation", level: 84 },
  { id: "25", name: "Monday API", category: "AI & Automation", level: 72 },
  { id: "26", name: "Google APIs", category: "AI & Automation", level: 66 },
  { id: "27", name: "Webhooks", category: "AI & Automation", level: 72 },
  
  // Soft Skills
  { id: "28", name: "Liderança", category: "Soft Skills", level: 85 },
  { id: "29", name: "Comunicação", category: "Soft Skills", level: 90 },
  { id: "30", name: "Resolução de Problemas", category: "Soft Skills", level: 86 },
  { id: "31", name: "Trabalho em Equipe", category: "Soft Skills", level: 86 },
  { id: "32", name: "Proatividade", category: "Soft Skills", level: 90 },
  
  // Languages
  { id: "33", name: "Português (Nativo)", category: "Languages", level: 100 },
  { id: "34", name: "Espanhol (Fluente)", category: "Languages", level: 95 },
  { id: "35", name: "Inglês (B2)", category: "Languages", level: 85 }
];

// Dados dos Projetos
export const projectsData: Project[] = [
  {
    id: "1",
    title: "ATS Optimizer | C#/.NET, React e IA aplicada",
    description: "Aplicação que analisa currículo, LinkedIn e descrição de vaga para gerar melhorias ATS-friendly sem inventar experiências. Inclui backend em C#/.NET, parsing de PDF, prompts anti-alucinação, geração de PDF e frontend React.",
    techStack: "C#, .NET, React, TypeScript, LLM, PDF Parsing",
    repoUrl: "https://github.com/GustavoFragas/ats-optimizer",
    demoUrl: undefined,
    imageUrl: "/images/projects/ats-optimizer.jpg",
    createdAt: "2026-06-01"
  },
  {
    id: "2",
    title: "Plataforma Interna de Observabilidade e Adoção Digital",
    description: "Case profissional descrito de forma pública e segura: construção de rotinas para acompanhar uso, custo, execuções, dados e integrações de plataformas internas, apoiando análise operacional e melhoria contínua.",
    techStack: "React, TypeScript, Node.js, AWS, APIs, Notion, Monday",
    repoUrl: undefined,
    demoUrl: undefined,
    imageUrl: "/images/projects/observability.jpg",
    createdAt: "2026-05-01"
  },
  {
    id: "3",
    title: "Portfólio Técnico",
    description: "Portfolio profissional com frontend responsivo em React/Vite, dados centralizados em TypeScript e backend .NET mantido como referência arquitetural para API, entidades, repositórios e testes.",
    techStack: "React, TypeScript, TailwindCSS, .NET 10, Clean Architecture",
    repoUrl: "https://github.com/GustavoFragas/Portfolio-Pessoal",
    demoUrl: "https://portfolio-pessoal-vert.vercel.app/",
    imageUrl: "/images/projects/portfolio.jpg",
    createdAt: "2025-11-01"
  },
  {
    id: "4",
    title: "Sistema para Estacionamento",
    description: "Projeto em C# para praticar regras de domínio, controle de entrada e saída de veículos, cálculo de tarifas e organização de fluxo em aplicação de console.",
    techStack: "C#, .NET, OOP",
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
    description: "Programa internacional com foco em fundamentos de engenharia de software, programação, banco de dados, desenvolvimento web e comunicação profissional em inglês.",
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
    description: "Formação superior voltada a análise, desenvolvimento de sistemas, banco de dados, engenharia de software e construção de aplicações corporativas.",
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
    description: "Base técnica em programação, lógica, banco de dados, web e documentação de sistemas.",
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
    description: "Trilhas práticas de C#, .NET, orientação a objetos, APIs, Git/GitHub e banco de dados.",
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
    description: "Estudos em serviços AWS, arquitetura cloud, serverless, fundamentos de segurança, custo e observabilidade.",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
  },
  {
    id: "6",
    institution: "Autodidata",
    degree: "Estudos",
    field: "Automação e Integrações SaaS",
    startDate: "2025-10-01",
    endDate: undefined,
    isCurrent: true,
    description: "Estudo e prática de integrações entre Notion, Monday, Google APIs, webhooks e rotinas de sincronização.",
    url: "https://monday.com/"
  },
  {
    id: "7",
    institution: "Notion",
    degree: "Certificação e prática",
    field: "Notion Admin, documentação e dados",
    startDate: "2025-10-01",
    endDate: undefined,
    isCurrent: true,
    description: "Uso avançado do Notion para documentação técnica, bases relacionais, workflows, automações e observabilidade.",
    url: "https://www.notion.so/"
  }
];
