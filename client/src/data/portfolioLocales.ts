import {
  capabilities as ptCapabilities,
  cases as ptCases,
  credentials as ptCredentials,
  education as ptEducation,
  experiences as ptExperiences,
  languages as ptLanguages,
  navItems as ptNavItems,
  profile as ptProfile,
} from './portfolioContent';

export const supportedLocales = ['pt', 'en', 'es'] as const;
export type PortfolioLocale = (typeof supportedLocales)[number];

export type CaseItem = {
  title: string;
  label: string;
  summary: string;
  problem: string;
  did: string;
  decisions: readonly string[];
  validation: readonly string[];
  tools: readonly string[];
  caveat: string;
  link: string;
};

export type Credential = { issuer: string; name: string; url: string; art: string };
type NavItem = { label: string; href: string };
type Capability = readonly [string, string, string];
type ExperienceItem = readonly [string, string, string, readonly string[], string];
type EducationItem = readonly [string, string, string];
type LanguageItem = readonly [string, string, string];

const sharedProfile = {
  name: ptProfile.name,
  firstName: ptProfile.firstName,
  lastName: ptProfile.lastName,
  image: ptProfile.image,
  email: ptProfile.email,
  phoneDisplay: ptProfile.phoneDisplay,
  phoneLink: ptProfile.phoneLink,
  linkedIn: ptProfile.linkedIn,
  linkedInDisplay: ptProfile.linkedInDisplay,
  gitHub: ptProfile.gitHub,
  gitHubDisplay: ptProfile.gitHubDisplay,
};

type Profile = typeof sharedProfile & { officialTitle: string; location: string };

const ptUi = {
  meta: {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    siteName: 'Portfólio de Gustavo Fragas Cunha',
    title: 'Gustavo Fragas Cunha | Desenvolvedor Pleno',
    description: 'Oi, eu sou o Gustavo: desenvolvedor pleno em São Paulo. Backend, APIs, integrações e AWS, com DevOps como próximo passo.',
    socialDescription: 'Backend, APIs e integrações com C#/.NET, TypeScript e AWS. Cases anonimizados, contados do jeito que aconteceram.',
    socialImageAlt: 'Gustavo Fragas Cunha ao lado de um fluxo visual de backend, APIs, filas, workers, snapshots e validação.',
  },
  skipLink: 'Pular para o conteúdo',
  fatal: {
    kicker: 'Portfólio disponível',
    title: 'A parte visual não carregou por completo.',
    description: 'O conteúdo continua aqui. Recarregue a página para tentar de novo.',
    action: 'Recarregar',
  },
  navigation: {
    mainLabel: 'Navegação principal',
    mobileLabel: 'Navegação no celular',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    languageLabel: 'Escolher idioma',
    home: 'Início',
  },
  hero: {
    hello: 'Oi, eu sou o',
    lead: 'Desenvolvedor pleno na Alest. Faço sistemas conversarem — APIs, filas, integrações e a nuvem por trás. Meu próximo passo é DevOps.',
    primaryCta: 'Ver projetos',
    secondaryCta: 'Falar comigo',
    actionsLabel: 'Atalhos',
    hintPointer: 'passe o mouse no mosaico',
    hintTouch: 'toque no mosaico',
    portraitAlt: 'Foto de Gustavo Fragas Cunha sorrindo, de suéter vinho e crachá do AWS Summit, em frente a um painel de pixels rosa e azul-escuro.',
  },
  about: {
    kicker: 'Sobre',
    title: 'Curioso por natureza. Dev por escolha.',
    paragraphs: [
      'Entrei na Alest como estagiário em outubro de 2025 e virei pleno em 2026. Antes disso, passei dois anos na Argentina em serviço voluntário — daí o espanhol fluente.',
      'Gosto de entender como as peças se conectam. No dia a dia trabalho com backend, integrações e automação, e uso agentes de IA, sempre com revisão humana, para aprender mais rápido com o que construo.',
    ],
    facts: [
      ['Base', 'São Paulo'],
      ['Idiomas', 'português, espanhol e inglês'],
      ['Estudando', 'Software Development na BYU\u2011Idaho'],
    ],
  },
  projects: {
    kicker: 'Projetos',
    title: 'Coisas que eu construí',
    intro: 'Dois cases do trabalho (anonimizados, sem cliente nem dado interno), uma integração e um projeto pessoal.',
    details: 'Problema, o que eu fiz e como validei',
    problem: 'Problema',
    did: 'O que eu fiz',
    validated: 'Como validei',
    toolsPrefix: 'Com',
    and: 'e',
    repository: 'Ver repositório',
    newTab: 'abre em nova guia',
  },
  experience: {
    kicker: 'Trajetória',
    title: 'O caminho até aqui',
    openOfficialSite: 'abrir site oficial em nova guia',
    current: 'agora',
  },
  skills: {
    kicker: 'Ferramentas',
    title: 'Com o que eu trabalho',
    intro: 'O que eu uso de verdade no trabalho, sem barrinha de porcentagem.',
  },
  education: {
    kicker: 'Formação',
    title: 'Ainda estudando',
    languagesKicker: 'Idiomas',
    languagesTitle: 'Falo três línguas',
  },
  certificates: {
    kicker: 'Credenciais',
    title: 'Aprender também faz parte do trabalho',
    hintPointer: 'Passe o mouse ou use Tab para virar.',
    hintTouch: 'Toque para virar.',
    flip: 'Virar credencial',
    open: 'Ver credencial',
    openPdf: 'Ver certificado (PDF)',
    issuedBy: 'Emitida por',
    badge: 'Selo',
  },
  contact: {
    kicker: 'Contato',
    title: 'Bora conversar?',
    description: 'Tem um projeto, uma vaga ou uma ideia? Me chama por onde for mais fácil.',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    disclaimer: 'Cases profissionais anonimizados.',
    builtWith: 'Feito com React, TypeScript e Canvas 2D.',
    backToTop: 'Voltar ao topo',
  },
};

type Ui = typeof ptUi;

export type PortfolioContent = {
  profile: Profile;
  navItems: readonly NavItem[];
  cases: readonly CaseItem[];
  capabilities: readonly Capability[];
  experiences: readonly ExperienceItem[];
  education: readonly EducationItem[];
  languages: readonly LanguageItem[];
  credentials: readonly Credential[];
  ui: Ui;
};

const enUi: Ui = {
  meta: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    siteName: 'Gustavo Fragas Cunha’s portfolio',
    title: 'Gustavo Fragas Cunha | Mid-level Software Developer',
    description: 'Hi, I’m Gustavo: a mid-level software developer in São Paulo. Backend, APIs, integrations and AWS, with DevOps as the next step.',
    socialDescription: 'Backend, APIs and integrations with C#/.NET, TypeScript and AWS. Anonymized work cases, told the way they happened.',
    socialImageAlt: 'Gustavo Fragas Cunha next to a visual flow of backend, APIs, queues, workers, snapshots and validation.',
  },
  skipLink: 'Skip to content',
  fatal: {
    kicker: 'Portfolio available',
    title: 'The visual part did not fully load.',
    description: 'The content is still here. Reload the page to try again.',
    action: 'Reload',
  },
  navigation: {
    mainLabel: 'Main navigation',
    mobileLabel: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Choose language',
    home: 'Home',
  },
  hero: {
    hello: 'Hi, I’m',
    lead: 'Mid-level developer at Alest. I get systems talking to each other — APIs, queues, integrations and the cloud behind them. DevOps is my next step.',
    primaryCta: 'See projects',
    secondaryCta: 'Talk to me',
    actionsLabel: 'Shortcuts',
    hintPointer: 'hover over the mosaic',
    hintTouch: 'touch the mosaic',
    portraitAlt: 'Photo of Gustavo Fragas Cunha smiling, in a burgundy sweater with an AWS Summit badge, in front of a pink and dark blue pixel panel.',
  },
  about: {
    kicker: 'About',
    title: 'Curious by nature. Developer by choice.',
    paragraphs: [
      'I joined Alest as an intern in October 2025 and became a mid-level developer in 2026. Before that, I spent two years in Argentina doing volunteer service — that’s where my fluent Spanish comes from.',
      'I like understanding how the pieces connect. Day to day I work on backend, integrations and automation, and I use AI agents, always with human review, to learn faster from what I build.',
    ],
    facts: [
      ['Based in', 'São Paulo'],
      ['Languages', 'Portuguese, Spanish and English'],
      ['Studying', 'Software Development at BYU\u2011Idaho'],
    ],
  },
  projects: {
    kicker: 'Projects',
    title: 'Things I’ve built',
    intro: 'Two cases from work (anonymized, no client or internal data), one integration and a personal project.',
    details: 'Problem, what I did and how I validated it',
    problem: 'Problem',
    did: 'What I did',
    validated: 'How I validated it',
    toolsPrefix: 'Built with',
    and: 'and',
    repository: 'View repository',
    newTab: 'opens in a new tab',
  },
  experience: {
    kicker: 'Journey',
    title: 'The road so far',
    openOfficialSite: 'open official website in a new tab',
    current: 'now',
  },
  skills: {
    kicker: 'Tools',
    title: 'What I work with',
    intro: 'What I actually use at work — no percentage bars.',
  },
  education: {
    kicker: 'Education',
    title: 'Still studying',
    languagesKicker: 'Languages',
    languagesTitle: 'I speak three languages',
  },
  certificates: {
    kicker: 'Credentials',
    title: 'Learning is part of the job',
    hintPointer: 'Hover or press Tab to flip.',
    hintTouch: 'Tap to flip.',
    flip: 'Flip credential',
    open: 'View credential',
    openPdf: 'View certificate (PDF)',
    issuedBy: 'Issued by',
    badge: 'Badge',
  },
  contact: {
    kicker: 'Contact',
    title: 'Let’s talk.',
    description: 'Got a project, a role or an idea? Reach me wherever is easiest for you.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    disclaimer: 'Work cases are anonymized.',
    builtWith: 'Built with React, TypeScript and Canvas 2D.',
    backToTop: 'Back to top',
  },
};

const esUi: Ui = {
  meta: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    siteName: 'Portafolio de Gustavo Fragas Cunha',
    title: 'Gustavo Fragas Cunha | Desarrollador Semi Senior',
    description: 'Hola, soy Gustavo: desarrollador semi senior en São Paulo. Backend, APIs, integraciones y AWS, con DevOps como próximo paso.',
    socialDescription: 'Backend, APIs e integraciones con C#/.NET, TypeScript y AWS. Casos anonimizados, contados tal como pasaron.',
    socialImageAlt: 'Gustavo Fragas Cunha junto a un flujo visual de backend, APIs, colas, workers, snapshots y validación.',
  },
  skipLink: 'Saltar al contenido',
  fatal: {
    kicker: 'Portafolio disponible',
    title: 'La parte visual no terminó de cargar.',
    description: 'El contenido sigue aquí. Recarga la página para intentarlo de nuevo.',
    action: 'Recargar',
  },
  navigation: {
    mainLabel: 'Navegación principal',
    mobileLabel: 'Navegación en el celular',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    languageLabel: 'Elegir idioma',
    home: 'Inicio',
  },
  hero: {
    hello: 'Hola, soy',
    lead: 'Desarrollador semi senior en Alest. Hago que los sistemas se entiendan — APIs, colas, integraciones y la nube que hay detrás. Mi próximo paso es DevOps.',
    primaryCta: 'Ver proyectos',
    secondaryCta: 'Hablemos',
    actionsLabel: 'Accesos',
    hintPointer: 'pasa el mouse por el mosaico',
    hintTouch: 'toca el mosaico',
    portraitAlt: 'Foto de Gustavo Fragas Cunha sonriendo, con suéter bordó y credencial del AWS Summit, frente a un panel de píxeles rosa y azul oscuro.',
  },
  about: {
    kicker: 'Sobre mí',
    title: 'Curioso por naturaleza. Desarrollador por elección.',
    paragraphs: [
      'Entré a Alest como pasante en octubre de 2025 y en 2026 pasé a semi senior. Antes viví dos años en Argentina haciendo servicio voluntario — de ahí mi español fluido.',
      'Me gusta entender cómo se conectan las piezas. En el día a día trabajo con backend, integraciones y automatización, y uso agentes de IA, siempre con revisión humana, para aprender más rápido de lo que construyo.',
    ],
    facts: [
      ['Base', 'São Paulo'],
      ['Idiomas', 'portugués, español e inglés'],
      ['Estudiando', 'Software Development en BYU\u2011Idaho'],
    ],
  },
  projects: {
    kicker: 'Proyectos',
    title: 'Cosas que construí',
    intro: 'Dos casos del trabajo (anonimizados, sin cliente ni datos internos), una integración y un proyecto personal.',
    details: 'Problema, qué hice y cómo lo validé',
    problem: 'Problema',
    did: 'Qué hice',
    validated: 'Cómo lo validé',
    toolsPrefix: 'Con',
    and: 'y',
    repository: 'Ver repositorio',
    newTab: 'se abre en una pestaña nueva',
  },
  experience: {
    kicker: 'Trayectoria',
    title: 'El camino hasta aquí',
    openOfficialSite: 'abrir sitio oficial en una pestaña nueva',
    current: 'ahora',
  },
  skills: {
    kicker: 'Herramientas',
    title: 'Con qué trabajo',
    intro: 'Lo que uso de verdad en el trabajo, sin barritas de porcentaje.',
  },
  education: {
    kicker: 'Formación',
    title: 'Sigo estudiando',
    languagesKicker: 'Idiomas',
    languagesTitle: 'Hablo tres idiomas',
  },
  certificates: {
    kicker: 'Credenciales',
    title: 'Aprender también es parte del trabajo',
    hintPointer: 'Pasa el mouse o usa Tab para girar.',
    hintTouch: 'Toca para girar.',
    flip: 'Girar credencial',
    open: 'Ver credencial',
    openPdf: 'Ver certificado (PDF)',
    issuedBy: 'Emitida por',
    badge: 'Insignia',
  },
  contact: {
    kicker: 'Contacto',
    title: '¿Hablamos?',
    description: '¿Tienes un proyecto, una vacante o una idea? Escríbeme por donde te quede más cómodo.',
    email: 'Correo',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    disclaimer: 'Los casos del trabajo están anonimizados.',
    builtWith: 'Hecho con React, TypeScript y Canvas 2D.',
    backToTop: 'Volver arriba',
  },
};

const enCases: CaseItem[] = [
  {
    title: 'Internal telemetry and data quality platform',
    label: 'Work case, anonymized',
    summary: 'I helped move an internal telemetry platform’s cache off Redis and onto S3 snapshots, with a fallback and separate credentials per collector.',
    problem: 'Internal flows had to keep telemetry and data quality healthy despite API limits, storage, cardinality, noisy sources and freshness.',
    did: 'I worked on collection, integration, data quality and validation, shipped the frontend on AWS Amplify and did the backend work with guidance from the tech lead.',
    decisions: [
      'Controlled migration from ElastiCache/Redis to Amazon S3 snapshots with 90-day expiration.',
      'Fallback to the last valid snapshot and an internal sync view during the transition.',
      'Separate credentials per collector/function: least privilege, per-source diagnosis and isolated failures.',
      'Datadog → Notion integration with processing scheduled through Amazon EventBridge.',
    ],
    validation: [
      'Parallel validation before switching off the previous cache.',
      'Local SQS/DLQ tests covering consumption, visibility timeout, retries and redrive.',
      'I logged the tests and handed off to acceptance testing when the scope called for it.',
    ],
    tools: ['C#/.NET', 'TypeScript/Node.js', 'Lambda', 'S3', 'SQS/DLQ', 'EventBridge', 'Datadog', 'Notion API'],
    caveat: 'Anonymized for confidentiality: no client, metrics or internal details.',
    link: '',
  },
  {
    title: 'Asynchronous notification service',
    label: 'Work case, anonymized',
    summary: 'Together with the tech lead, I documented and evolved a service that validates requests, queues callbacks on SQS FIFO and handles failures without blocking the API.',
    problem: 'The service had to validate requests, queue callbacks and deal with failures without blocking the API or leaking sensitive data into logs.',
    did: 'I worked on documenting and evolving the backend flow, environment configuration and local validation: controller/use case, SQS FIFO queue, log masking and global exception handling.',
    decisions: [
      'Synchronous API response kept apart from asynchronous callback processing.',
      'FIFO queue to keep ordering and deduplication compatible with the contract.',
      'Sensitive fields masked and exceptions handled the same way across logs.',
    ],
    validation: [
      'Specs for controller, use case, queue, logger, masking and the global exception filter.',
      'Local tests for consumption, retry and DLQ forwarding.',
      'Everything documented before moving up an environment.',
    ],
    tools: ['TypeScript', 'REST API', 'SQS FIFO', 'DLQ', 'Jest', 'structured logs'],
    caveat: 'Heavily anonymized: no client, business domain or internal architecture.',
    link: '',
  },
  {
    title: 'Sync between two SaaS platforms',
    label: 'Integration',
    summary: 'I wrote the webhooks that keep matching properties in sync across both platforms, in both directions, without one webhook endlessly triggering the other.',
    problem: 'Keep equivalent properties in sync across two SaaS platforms without loops, duplicates or silent drift.',
    did: 'I implemented the webhook handlers and the read, normalize, compare and write flow in both directions, with AI assistance and human review.',
    decisions: [
      'Identifiers normalized before comparing.',
      'A record of recent syncs to stop webhook ping-pong.',
      'Data transformation kept separate from writes to each API.',
    ],
    validation: [
      'Local validation of both sync directions.',
      'In a controlled local test, feedback dropped from up to 60 seconds to under 2 seconds.',
    ],
    tools: ['TypeScript', 'Node.js', 'webhooks', 'Notion API', 'Monday API'],
    caveat: 'Controlled local test number; not a production latency guarantee.',
    link: '',
  },
  {
    title: 'ATS Optimizer',
    label: 'Personal project',
    summary: 'A tool that compares a résumé with a job post without inventing experience: the AI suggests, I review before accepting anything.',
    problem: 'Assess how well a résumé matches a role without fabricating experience or inflating responsibilities.',
    did: 'I defined the problem, the UX, the acceptance criteria and the real-data tests, and did the review and refinement. Part of the React, TypeScript and .NET code was AI-assisted.',
    decisions: ['Anti-hallucination criteria.', 'A flow centered on factual alignment.', 'Human review before accepting a recommendation.'],
    validation: ['Tests with real data.', 'Manual review of the suggestions.', 'Acceptance criteria that block invented experience.'],
    tools: ['React', 'TypeScript', '.NET', 'PDF parsing', 'AI-assisted LLM'],
    caveat: '',
    link: 'https://github.com/GustavoFragas/ats-optimizer',
  },
];

const esCases: CaseItem[] = [
  {
    title: 'Plataforma interna de telemetría y calidad de datos',
    label: 'Caso del trabajo, anonimizado',
    summary: 'Ayudé a sacar el caché de una plataforma interna de telemetría de Redis y llevarlo a snapshots en S3, con fallback y credenciales separadas por recolector.',
    problem: 'Los flujos internos tenían que mantener la telemetría y la calidad de datos en pie a pesar de límites de API, almacenamiento, cardinalidad, ruido en el origen y freshness.',
    did: 'Trabajé en la evolución de la recolección, integración, calidad de datos y validación, publiqué el frontend en AWS Amplify e hice la parte de backend con la guía del líder técnico.',
    decisions: [
      'Migración controlada de ElastiCache/Redis a snapshots en Amazon S3 con expiración de 90 días.',
      'Fallback al último snapshot válido y una vista interna de sincronización durante la transición.',
      'Credenciales separadas por recolector/función: menor privilegio, diagnóstico por fuente y fallas aisladas.',
      'Integración Datadog → Notion con procesamiento programado en Amazon EventBridge.',
    ],
    validation: [
      'Validación en paralelo antes de apagar el caché anterior.',
      'Pruebas locales con SQS/DLQ que cubren consumo, visibility timeout, retries y redrive.',
      'Registré las pruebas y pasé a homologación cuando el alcance lo pedía.',
    ],
    tools: ['C#/.NET', 'TypeScript/Node.js', 'Lambda', 'S3', 'SQS/DLQ', 'EventBridge', 'Datadog', 'Notion API'],
    caveat: 'Anonimizado por confidencialidad: sin cliente, métricas ni detalles internos.',
    link: '',
  },
  {
    title: 'Servicio de notificaciones asíncronas',
    label: 'Caso del trabajo, anonimizado',
    summary: 'Junto con el líder técnico, documenté y evolucioné un servicio que valida solicitudes, encola callbacks en SQS FIFO y maneja fallas sin trabar la API.',
    problem: 'El servicio tenía que validar solicitudes, encolar callbacks y lidiar con fallas sin bloquear la API ni filtrar datos sensibles en los logs.',
    did: 'Participé en la documentación y evolución del flujo backend, la configuración del entorno y la validación local: controller/use case, cola SQS FIFO, enmascaramiento de logs y manejo global de excepciones.',
    decisions: [
      'Respuesta síncrona de la API separada del procesamiento asíncrono del callback.',
      'Cola FIFO para mantener orden y deduplicación compatibles con el contrato.',
      'Campos sensibles enmascarados y excepciones tratadas igual en todos los logs.',
    ],
    validation: [
      'Specs para controller, caso de uso, cola, logger, enmascaramiento y filtro global de excepciones.',
      'Pruebas locales de consumo, retry y envío a la DLQ.',
      'Todo documentado antes de subir de entorno.',
    ],
    tools: ['TypeScript', 'API REST', 'SQS FIFO', 'DLQ', 'Jest', 'logs estructurados'],
    caveat: 'Muy anonimizado: sin cliente, dominio de negocio ni arquitectura interna.',
    link: '',
  },
  {
    title: 'Sincronización entre dos plataformas SaaS',
    label: 'Integración',
    summary: 'Escribí los webhooks que mantienen iguales ciertas propiedades en las dos plataformas, en ambos sentidos, sin que un webhook dispare al otro sin fin.',
    problem: 'Mantener propiedades equivalentes sincronizadas entre dos plataformas SaaS sin loops, duplicados ni divergencias silenciosas.',
    did: 'Implementé los handlers de webhook y el flujo de lectura, normalización, comparación y escritura en ambos sentidos, con asistencia de IA y revisión humana.',
    decisions: [
      'Identificadores normalizados antes de comparar.',
      'Registro de las sincronizaciones recientes para cortar el ping-pong entre webhooks.',
      'Transformación de datos separada de la escritura en cada API.',
    ],
    validation: [
      'Validación local de ambos sentidos de la sincronización.',
      'En una prueba local controlada, el retorno bajó de hasta 60 segundos a menos de 2 segundos.',
    ],
    tools: ['TypeScript', 'Node.js', 'webhooks', 'Notion API', 'Monday API'],
    caveat: 'Número de una prueba local controlada; no es garantía de latencia en producción.',
    link: '',
  },
  {
    title: 'ATS Optimizer',
    label: 'Proyecto personal',
    summary: 'Una herramienta que compara currículum y vacante sin inventar experiencia: la IA sugiere y yo reviso antes de aceptar cualquier cosa.',
    problem: 'Evaluar qué tan alineados están un currículum y una vacante sin fabricar experiencia ni inflar responsabilidades.',
    did: 'Definí el problema, la UX, los criterios de aceptación y las pruebas con datos reales, e hice la revisión y el refinamiento. Parte del código en React, TypeScript y .NET tuvo asistencia de IA.',
    decisions: ['Criterios antialucinación.', 'Un flujo centrado en el alineamiento factual.', 'Revisión humana antes de aceptar una recomendación.'],
    validation: ['Pruebas con datos reales.', 'Revisión manual de las sugerencias.', 'Criterios de aceptación para no inventar experiencia.'],
    tools: ['React', 'TypeScript', '.NET', 'lectura de PDF', 'LLM asistido'],
    caveat: '',
    link: 'https://github.com/GustavoFragas/ats-optimizer',
  },
];

const enCapabilities: Capability[] = [
  ['Backend and APIs', 'Services, endpoints and integrations built with the contract, the validation and the next maintainer in mind.', 'C#, .NET, ASP.NET Core, REST, TypeScript and Node.js'],
  ['SaaS integrations', 'Routines that connect Notion, Datadog, DocuSign CLM and other APIs, with error handling and per-source tracing.', 'Notion API, Datadog, DocuSign CLM, webhooks and EventBridge'],
  ['Data', 'Deduplication, freshness, backfill and reconciliation: data arriving right before it turns into a dashboard.', 'SQL, Athena, S3 and QuickSight'],
  ['AWS and delivery', 'I shipped a frontend on Amplify, and I use or have reviewed workloads on App Runner, Lambda, S3 and SQS.', 'Amplify, Lambda, S3, SQS/DLQ, App Runner, GitHub Actions and Docker'],
  ['Testing and observability', 'I test the scenarios that matter locally before anything goes to acceptance testing.', 'Datadog, Sonar, Gitleaks and integration tests'],
  ['Engineering with agents', 'Agent chains, MCPs and Learning Loop to split context and review work. Scope, code, tests and the final call stay with me.', 'Codex, Kiro, MCP and Learning Loop'],
];

const esCapabilities: Capability[] = [
  ['Backend y APIs', 'Servicios, endpoints e integraciones pensando en el contrato, la validación y en quien los va a mantener después.', 'C#, .NET, ASP.NET Core, REST, TypeScript y Node.js'],
  ['Integraciones SaaS', 'Rutinas que conectan Notion, Datadog, DocuSign CLM y otras APIs, con manejo de errores y trazabilidad por fuente.', 'Notion API, Datadog, DocuSign CLM, webhooks y EventBridge'],
  ['Datos', 'Deduplicación, freshness, backfill y conciliación: que el dato llegue bien antes de convertirse en panel.', 'SQL, Athena, S3 y QuickSight'],
  ['AWS y entrega', 'Publiqué un frontend en Amplify, y uso o revisé workloads en App Runner, Lambda, S3 y SQS.', 'Amplify, Lambda, S3, SQS/DLQ, App Runner, GitHub Actions y Docker'],
  ['Pruebas y observabilidad', 'Pruebo localmente los escenarios que importan antes de pasar a homologación.', 'Datadog, Sonar, Gitleaks y pruebas de integración'],
  ['Ingeniería con agentes', 'Cadenas de agentes, MCPs y Learning Loop para dividir contexto y revisar entregas. El alcance, el código, las pruebas y la decisión final siguen siendo míos.', 'Codex, Kiro, MCP y Learning Loop'],
];

const enExperiences: ExperienceItem[] = [
  ['Jun 2026 – now', 'Alest', 'Mid-level Software Developer', ['Data and telemetry platforms, SaaS integrations and backend services.', 'Documentation, configuration, messaging, testing and validation alongside the tech lead.'], 'https://alest.com.br/'],
  ['Mar 2026 – May 2026', 'Alest', 'Junior Software Developer', ['Hired full-time on March 30, 2026, after the internship.', 'Integrations, automation and data quality routines.'], 'https://alest.com.br/'],
  ['Oct 2025 – Mar 2026', 'Alest', 'Software Development Intern', ['Support on internal integrations and automation with C#/.NET, TypeScript/Node.js and SaaS APIs.', 'Early stages of an internal telemetry and data platform.', 'DocuSign CLM flows focused on validation, traceability and error handling.'], 'https://alest.com.br/'],
  ['Aug 2025 – Oct 2025', 'Atento', 'Bilingual support in Spanish', ['Customer support in Spanish: communication, triage and request follow-up.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['Mar 2023 – Apr 2025', 'Argentina', 'Full-time volunteer service', ['Community work in a multicultural setting, speaking Spanish every day.', 'Visits, scheduling, following up with people and working with local teams.'], ''],
  ['Mar 2021 – Nov 2022', 'Beneficência Portuguesa de São Paulo', 'Apprentice', ['First corporate job: operational routines and communication with internal teams.'], 'https://www.bp.org.br/'],
];

const esExperiences: ExperienceItem[] = [
  ['jun. 2026 – hoy', 'Alest', 'Desarrollador Semi Senior', ['Plataformas de datos y telemetría, integraciones SaaS y servicios backend.', 'Documentación, configuración, mensajería, pruebas y validación junto al líder técnico.'], 'https://alest.com.br/'],
  ['mar. 2026 – may. 2026', 'Alest', 'Desarrollador Junior', ['Efectivo desde el 30/03/2026, después de la pasantía.', 'Integraciones, automatizaciones y rutinas de calidad de datos.'], 'https://alest.com.br/'],
  ['oct. 2025 – mar. 2026', 'Alest', 'Pasante de Desarrollo de Software', ['Apoyo en integraciones y automatizaciones internas con C#/.NET, TypeScript/Node.js y APIs SaaS.', 'Primeras etapas de una plataforma interna de telemetría y datos.', 'Flows en DocuSign CLM con foco en validación, trazabilidad y manejo de errores.'], 'https://alest.com.br/'],
  ['ago. 2025 – oct. 2025', 'Atento', 'Soporte bilingüe en español', ['Atención y soporte a clientes en español: comunicación, triaje y seguimiento de solicitudes.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['mar. 2023 – abr. 2025', 'Argentina', 'Servicio voluntario de tiempo completo', ['Trabajo comunitario en un contexto multicultural, hablando español todos los días.', 'Visitas, agenda, acompañamiento de personas y colaboración con equipos locales.'], ''],
  ['mar. 2021 – nov. 2022', 'Beneficência Portuguesa de São Paulo', 'Joven aprendiz', ['Primera experiencia en un entorno corporativo: rutina operativa y comunicación con áreas internas.'], 'https://www.bp.org.br/'],
];

const enEducation: EducationItem[] = [
  ['May 2025 – Dec 2027', 'Brigham Young University\u2011Idaho', 'Bachelor of Science in Software Development (in progress)'],
  ['Oct 2025 – Jul 2027', 'UFBRA', 'Technology degree in Systems Analysis and Development (in progress)'],
  ['Feb 2020 – Nov 2022', 'ETEC Parque Belém', 'Technical diploma in Systems Development'],
];

const esEducation: EducationItem[] = [
  ['may. 2025 – dic. 2027', 'Brigham Young University\u2011Idaho', 'Bachelor of Science en Software Development (en curso)'],
  ['oct. 2025 – jul. 2027', 'UFBRA', 'Tecnología en Análisis y Desarrollo de Sistemas (en curso)'],
  ['feb. 2020 – nov. 2022', 'ETEC Parque Belém', 'Técnico en Desarrollo de Sistemas'],
];

const enLanguages: LanguageItem[] = [
  ['Português', 'pt', 'native'],
  ['Español', 'es', 'fluent, from two years in Argentina'],
  ['English', 'en', 'B2, certified by LingoPass'],
];

const esLanguages: LanguageItem[] = [
  ['Português', 'pt', 'nativo'],
  ['Español', 'es', 'fluido, de dos años en Argentina'],
  ['English', 'en', 'B2, certificado por LingoPass'],
];

const localizeCredentials = (names: Record<string, string>): Credential[] =>
  ptCredentials.map((item) => ({ ...item, name: names[item.issuer] ?? item.name }));

const enCredentials = localizeCredentials({
  LingoPass: 'English B2 Advanced',
  DIO: 'Code versioning with Git and GitHub',
});

const esCredentials = localizeCredentials({
  LingoPass: 'Inglés B2 Advanced',
  DIO: 'Control de versiones con Git y GitHub',
});

export const portfolioLocales: Record<PortfolioLocale, PortfolioContent> = {
  pt: {
    profile: ptProfile,
    navItems: ptNavItems,
    cases: ptCases,
    capabilities: ptCapabilities,
    experiences: ptExperiences,
    education: ptEducation,
    languages: ptLanguages,
    credentials: ptCredentials,
    ui: ptUi,
  },
  en: {
    profile: { ...sharedProfile, officialTitle: 'Mid-level Software Developer', location: 'São Paulo, Brazil' },
    navItems: [
      { label: 'About', href: '#sobre' },
      { label: 'Projects', href: '#projetos' },
      { label: 'Journey', href: '#trajetoria' },
      { label: 'Contact', href: '#contato' },
    ],
    cases: enCases,
    capabilities: enCapabilities,
    experiences: enExperiences,
    education: enEducation,
    languages: enLanguages,
    credentials: enCredentials,
    ui: enUi,
  },
  es: {
    profile: { ...sharedProfile, officialTitle: 'Desarrollador Semi Senior', location: 'São Paulo, Brasil' },
    navItems: [
      { label: 'Sobre mí', href: '#sobre' },
      { label: 'Proyectos', href: '#projetos' },
      { label: 'Trayectoria', href: '#trajetoria' },
      { label: 'Contacto', href: '#contato' },
    ],
    cases: esCases,
    capabilities: esCapabilities,
    experiences: esExperiences,
    education: esEducation,
    languages: esLanguages,
    credentials: esCredentials,
    ui: esUi,
  },
};

export function isPortfolioLocale(value: string | null): value is PortfolioLocale {
  return supportedLocales.some((locale) => locale === value);
}
