import {
  capabilities as ptCapabilities,
  cases as ptCases,
  credentials as ptCredentials,
  education as ptEducation,
  evidenceRows as ptEvidenceRows,
  experiences as ptExperiences,
  languages as ptLanguages,
  navItems as ptNavItems,
  profile as ptProfile,
} from './portfolioContent';

const sharedProfile = {
  name: ptProfile.name,
  officialTitle: ptProfile.officialTitle,
  displayTitle: ptProfile.displayTitle,
  image: ptProfile.image,
  email: ptProfile.email,
  phoneLink: ptProfile.phoneLink,
  linkedIn: ptProfile.linkedIn,
  gitHub: ptProfile.gitHub,
};

const ptUi = {
  meta: {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    siteName: 'Portfólio de Gustavo Fragas Cunha',
    title: 'Gustavo Fragas Cunha | Desenvolvedor III',
    description: 'Portfólio técnico de Gustavo Fragas Cunha: backend, APIs, integrações, AWS, dados e validação com evidência operacional.',
    socialDescription: 'Backend, APIs e integrações com C#/.NET, TypeScript e AWS. Cases anonimizados por problema, decisão e validação.',
    socialImageAlt: 'Gustavo Fragas Cunha ao lado de um fluxo visual de backend, APIs, filas, workers, snapshots e validação.',
  },
  skipLink: 'Ir para o conteúdo',
  fatal: {
    kicker: 'PORTFÓLIO DISPONÍVEL',
    title: 'A interface visual não carregou por completo.',
    description: 'O conteúdo continua disponível. Recarregue a página para tentar novamente.',
    action: 'Recarregar portfólio',
  },
  navigation: {
    mainLabel: 'Navegação principal',
    mobileLabel: 'Navegação mobile',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    contact: 'Contato',
    directContact: 'Contato direto',
    languageLabel: 'Selecionar idioma',
  },
  hero: {
    greeting: 'Oi, eu sou o Gustavo.',
    proofLabel: 'Provas técnicas resumidas',
    proofTags: ['C#/.NET', 'TypeScript/Node.js', 'AWS', 'Agentes + Learning Loop'],
    primaryCta: 'Inspecionar cases',
    emailCta: 'Falar por email',
    externalLinksLabel: 'Links externos',
    portraitAlt: 'Gustavo Fragas Cunha sorrindo em uma arquibancada.',
    portraitMeta: 'backend · integrações · dados',
    systemKicker: 'SISTEMA VIVO / 01',
    systemTitle: 'Da API à evidência',
    systemLegend: 'Do contrato da API à evidência de release.',
    systemHint: 'Passe o cursor ou use Tab para inspecionar cada etapa.',
    stageLabel: 'Etapa ativa',
    flowLabel: 'Fluxo de integração entre API, mensageria, worker, snapshot e validação',
    liveLabel: 'telemetria em execução',
    flowStages: [
      ['API', 'Contrato recebido', 'Entrada validada antes de seguir pelo fluxo.'],
      ['Event bus', 'Evento roteado', 'O evento segue para o destino certo com rastreabilidade.'],
      ['SQS / DLQ', 'Fila protegida', 'Retries e redrive tornam a falha visível e recuperável.'],
      ['Worker', 'Processamento isolado', 'O trabalho assíncrono não bloqueia a resposta da API.'],
      ['Snapshot S3', 'Estado preservado', 'O último snapshot válido mantém o painel disponível.'],
      ['Validação', 'Evidência de release', 'O fluxo termina com teste, registro e decisão humana.'],
    ],
  },
  about: {
    kicker: 'Evidências verificadas',
    title: 'Prova por domínio, não por adjetivo.',
    description: 'Cada linha amarra área, evidência e validação. Cases profissionais permanecem anonimizados por confidencialidade.',
  },
  projects: {
    kicker: 'Cases anonimizados',
    title: 'Dossiês de decisão, restrição e validação.',
    description: 'O valor está na estrutura da entrega. Cases profissionais não expõem cliente, URL interna, payload, identificadores, dados privados ou métricas confidenciais.',
    repository: 'Repositório',
    problem: 'Problema',
    constraints: 'Restrições',
    responsibility: 'Responsabilidade',
    decisions: 'Decisões',
    validation: 'Validação',
    tools: 'Ferramentas',
  },
  skills: {
    kicker: 'Matriz de capacidades',
    title: 'Capacidade aparece junto da evidência.',
    description: 'Sem barras, percentuais ou níveis inventados. Cada grupo mostra contexto prático, ferramentas e forma de validação.',
    tableLabel: 'Matriz de capacidades baseada em evidência',
    area: 'Área',
    evidence: 'Evidência',
    tools: 'Ferramentas',
    validation: 'Validação',
  },
  experience: {
    kicker: 'Experiência exata',
    title: 'Progressão acelerada. Responsabilidade crescente.',
    openOfficialSite: 'abrir site oficial em nova guia',
  },
  education: {
    educationKicker: 'Formação',
    educationTitle: 'Base acadêmica em andamento.',
    languagesKicker: 'Idiomas',
    languagesTitle: 'Comunicação em três frentes.',
  },
  certificates: {
    kicker: 'Credenciais selecionadas',
    title: 'Credenciais que sustentam a base.',
    description: 'Uma seleção curta de idioma, administração de conhecimento e fundamentos de engenharia.',
  },
  contact: {
    kicker: 'Contato',
    title: 'Próximo passo: revisar cases, código público ou chamar direto.',
    description: 'Para conversar sobre engenharia de software, integrações ou qualidade operacional, escolha o canal mais direto.',
  },
  footer: {
    disclaimer: 'Portfólio público com cases anonimizados.',
    builtWith: 'Desenvolvido com React, TypeScript, Motion e Three.js.',
  },
};

const enProfile = {
  ...sharedProfile,
  displayTitle: 'Desenvolvedor III · Backend & APIs',
  headline: 'Backend, APIs, and integrations with evidence.',
  summary: 'I work with C#/.NET, TypeScript/Node.js, and AWS to make integrations traceable, testable, and secure — from the API contract to release evidence.',
  location: 'São Paulo, Brazil',
};

const enNavItems = [
  { label: 'Home', href: '#home' },
  { label: 'Evidence', href: '#evidencias' },
  { label: 'Cases', href: '#cases' },
  { label: 'Capabilities', href: '#capacidades' },
  { label: 'Journey', href: '#trajetoria' },
] as const;

const enEvidenceRows = [
  ['Backend/API', 'Services and integrations with C#/.NET, TypeScript/Node.js, and SaaS APIs.', 'Reviewed scope, technical documentation, and validation before release.'],
  ['Data', 'Deduplication, freshness, backfill, API limits, and collection traceability.', 'Parallel comparison and synchronization monitoring when applicable.'],
  ['AWS/Delivery', 'Amplify, Lambda, S3, SQS, EventBridge, Athena, QuickSight, and App Runner.', 'Local tests, configuration review, and RTM evidence under technical leadership guidance.'],
  ['Validation', 'SQS/DLQ consumption, visibility timeout, retries, and redrive in a local environment.', 'Decisive scenarios executed before forwarding to acceptance validation.'],
  ['AI-assisted engineering', 'Agent and subagent chains, MCPs, and Learning Loop applied to implementation, analysis, and review.', 'Human responsibility for scope, code, tests, documentation, evidence, and gates.'],
] as const;

const enCases = [
  {
    title: 'Internal telemetry and data quality platform',
    label: 'Anonymized professional case',
    problem: 'Internal flows needed to preserve telemetry and data quality while handling API limits, storage, cardinality, source noise, and freshness.',
    constraints: [
      'No customer identity, internal URL, payload, IDs, confidential metrics, or PII may be exposed.',
      'Operation is subject to SaaS API limits and retention windows configured in the environment.',
      'Traceability and failure isolation are required for each source and collector.',
    ],
    responsibility: 'Evolution of collection, integration, data quality, and validation flows; frontend publishing on AWS Amplify; backend work under technical leadership guidance.',
    decisions: [
      'Controlled migration from ElastiCache/Redis to Amazon S3 snapshots with 90-day expiration.',
      'Fallback to the last valid snapshot and an internal synchronization view during the transition.',
      'Credentials separated by collector/function for least privilege, source-level diagnosis, and failure isolation.',
      'Datadog to Notion integration with processing scheduled through Amazon EventBridge.',
    ],
    validation: [
      'Parallel validation before removing the previous cache.',
      'Local SQS/DLQ tests covering consumption, visibility timeout, retries, and redrive.',
      'RTM evidence and forwarding to acceptance validation when required by scope.',
    ],
    tools: ['C#/.NET', 'TypeScript/Node.js', 'Lambda', 'S3', 'SQS/DLQ', 'EventBridge', 'Datadog', 'Notion API'],
    caveat: 'Anonymized for confidentiality; no internal metrics or details are disclosed.',
  },
  {
    title: 'Enterprise asynchronous notification service',
    label: 'Anonymized professional case',
    problem: 'A service needed to validate requests, enqueue callbacks, and handle failures without blocking the API or exposing sensitive data in logs.',
    constraints: [
      'Domain, customer, endpoints, payloads, and internal topology remain anonymous.',
      'Configuration depends on environment variables and queues provisioned by other teams.',
      'Work performed under technical leadership guidance and within the acceptance flow.',
    ],
    responsibility: 'I contributed to backend flow documentation and evolution, environment configuration, and local validation, including controller/use case, SQS FIFO enqueueing, log masking, and global exception handling.',
    decisions: [
      'Separation between the synchronous API response and asynchronous callback processing.',
      'FIFO queue to preserve ordering and contract-compatible deduplication.',
      'Sensitive-field masking and consistent exception handling in logs.',
    ],
    validation: [
      'Specs for controller, use case, queue, logger, masking, and global exception filter.',
      'Local tests of consumption, retry, and DLQ forwarding.',
      'Technical evidence before promotion between environments.',
    ],
    tools: ['TypeScript', 'REST API', 'SQS FIFO', 'DLQ', 'Jest', 'Structured logs'],
    caveat: 'Heavily anonymized for confidentiality; no customer, business domain, or internal architecture is disclosed.',
  },
  {
    title: 'Bidirectional synchronization between SaaS platforms',
    label: 'Technical integration',
    problem: 'Keep equivalent properties synchronized across two SaaS platforms without loops, duplicates, or silent divergence.',
    constraints: [
      'External APIs with request limits and different formats.',
      'Events originating on both sides of the flow.',
      'Latency result measured only in a controlled local environment.',
    ],
    responsibility: 'I implemented webhook handlers and the read, normalization, comparison, and write flow in both directions, with AI assistance and human review.',
    decisions: [
      'Identifier normalization before comparison.',
      'Recent synchronization records to prevent webhook ping-pong.',
      'Explicit separation between data transformation and writes to each API.',
    ],
    validation: [
      'Local validation of both synchronization directions.',
      'In a controlled local test, observed feedback dropped from up to 60 seconds to under 2 seconds.',
      'The public caveat prevents a lab result from becoming a production promise.',
    ],
    tools: ['TypeScript', 'Node.js', 'Webhooks', 'Notion API', 'Monday API'],
    caveat: 'Controlled local test; it is not a production latency or reliability guarantee.',
  },
  {
    title: 'ATS Optimizer',
    label: 'AI-assisted personal project',
    problem: 'Evaluate alignment between a résumé and a role without fabricating experience or inflating responsibilities.',
    constraints: ['Preserve the candidate’s factual truth.', 'AI suggestions require human review.', 'Test with real data before trusting the flow.'],
    responsibility: 'I defined the problem, UX, acceptance criteria, real-data tests, review, and refinement; part of the React, TypeScript, and .NET implementation was AI-assisted.',
    decisions: ['Anti-hallucination criteria.', 'Flow centered on factual alignment.', 'Human review before accepting recommendations.'],
    validation: ['Tests with real data.', 'Manual review of suggestions.', 'Acceptance criteria that prevent invented experience.'],
    tools: ['React', 'TypeScript', '.NET', 'PDF Parsing', 'LLM-assisted'],
    link: 'https://github.com/GustavoFragas/ats-optimizer',
  },
] as const;

const enCapabilities = [
  ['Backend and APIs', 'Building services, endpoints, and integrations with attention to contracts, validation, and maintainability.', 'C#, .NET, ASP.NET Core, REST API, TypeScript, Node.js', 'Technical documentation, review, and risk-proportionate tests.'],
  ['SaaS integrations', 'Flows with Notion, Datadog, DocuSign CLM, and SaaS APIs in internal routines.', 'Notion API, Datadog, DocuSign CLM, Webhooks, EventBridge', 'Error handling, traceability, and source isolation.'],
  ['Data quality', 'Deduplication, freshness, backfill, storage limits, and telemetry noise.', 'SQL, Athena, S3, QuickSight, Data Quality', 'Comparison, reconciliation, and synchronization monitoring.'],
  ['AWS and delivery', 'Frontend publishing on Amplify and use/review of workloads on App Runner, Lambda, S3, and SQS.', 'AWS Amplify, Lambda, S3, SQS/DLQ, App Runner, GitHub Actions, Docker', 'Builds, local tests, configuration review, and release evidence.'],
  ['Observability and validation', 'Routines that preserve telemetry, reduce noise, and make executions traceable.', 'Datadog, Sonar, Gitleaks, RTM, integration tests', 'Decisive scenarios, logs/evidence, and forwarding to acceptance validation.'],
  ['Engineering with agents', 'Agent and subagent chains, MCPs, and Learning Loop to divide context, review delivery, and turn real failures into reusable prevention.', 'Codex, Kiro, MCP, specialized agents, Learning Loop', 'Scope, technical review, tests, evidence, and the final decision remain under human responsibility.'],
] as const;

const enExperiences = [
  ['Mar 2026 - Present', 'Alest', 'Desenvolvedor III', ['Official Brazilian contract title: Desenvolvedor III. Hired full-time on Mar 30, 2026; Dev II on May 14, 2026; Dev III on Jun 1, 2026.', 'Internal data and telemetry platforms, SaaS integrations, and enterprise backend services.', 'Documentation, configuration, messaging, local tests, development-environment validation, and RTM evidence under technical leadership guidance.'], 'https://alest.com.br/'],
  ['Oct 2025 - Mar 2026', 'Alest', 'Software Development Intern', ['Support for internal integrations and automation with C#/.NET, TypeScript/Node.js, and SaaS APIs.', 'Participation in the early stages of an internal telemetry/data platform.', 'DocuSign CLM flows focused on validation, traceability, and error handling.'], 'https://alest.com.br/'],
  ['Aug 2025 - Oct 2025', 'Atento', 'Bilingual support in Spanish', ['Customer service and support in Spanish, including communication, triage, and request follow-up.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['Mar 2023 - Apr 2025', 'Argentina', 'Full-time volunteer service', ['Community work in a multicultural setting with daily communication in Spanish.', 'Visits, schedule organization, individual follow-up, and collaboration with local teams.', 'International experience that consolidated Spanish fluency, cultural adaptability, and clear communication.'], null],
  ['Mar 2021 - Nov 2022', 'Beneficência Portuguesa de São Paulo', 'Apprentice', ['First corporate-environment experience, operational routines, and communication with internal teams.'], 'https://www.bp.org.br/'],
] as const;

const enEducation = [
  ['May 2025 - Dec 2027', 'Brigham Young University-Idaho', 'Bachelor of Science, Software Development'],
  ['Oct 2025 - Jul 2027', 'UFBRA', 'Technology Degree in Systems Analysis and Development'],
  ['Feb 2020 - Nov 2022', 'ETEC Parque Belém', 'Technical Diploma in Systems Development'],
] as const;

const enLanguages = [['Portuguese', 'Native'], ['Spanish', 'Fluent'], ['English', 'B2']] as const;
const enCredentials = [
  ['LingoPass', 'English B2 Advanced', '/certificates/Lingopass certificate B2 Advanced.pdf'],
  ['Notion', 'Notion Certified Admin', 'https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946'],
  ['DIO', 'Code Versioning with Git and GitHub', '/certificates/Versionamento de Código com Git e GitHub.pdf'],
] as const;

const enUi = {
  meta: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    siteName: 'Gustavo Fragas Cunha’s portfolio',
    title: 'Gustavo Fragas Cunha | Desenvolvedor III | Backend, APIs & integrations',
    description: 'Gustavo Fragas Cunha’s technical portfolio: backend, APIs, integrations, AWS, data, and validation backed by operational evidence.',
    socialDescription: 'Backend, APIs, and integrations with C#/.NET, TypeScript, and AWS. Anonymized cases organized by problem, decision, and validation.',
    socialImageAlt: 'Gustavo Fragas Cunha beside a visual backend flow covering APIs, queues, workers, snapshots, and validation.',
  },
  skipLink: 'Skip to content',
  fatal: {
    kicker: 'PORTFOLIO AVAILABLE',
    title: 'The visual interface did not load completely.',
    description: 'The content remains available. Reload the page to try again.',
    action: 'Reload portfolio',
  },
  navigation: { mainLabel: 'Main navigation', mobileLabel: 'Mobile navigation', openMenu: 'Open menu', closeMenu: 'Close menu', contact: 'Contact', directContact: 'Direct contact', languageLabel: 'Select language' },
  hero: {
    greeting: 'Hi, I’m Gustavo.',
    proofLabel: 'Technical evidence at a glance',
    proofTags: ['C#/.NET', 'TypeScript/Node.js', 'AWS', 'Agents + Learning Loop'],
    primaryCta: 'Inspect cases',
    emailCta: 'Email me',
    externalLinksLabel: 'External links',
    portraitAlt: 'Gustavo Fragas Cunha smiling in stadium seating.',
    portraitMeta: 'backend · integrations · data',
    systemKicker: 'LIVING SYSTEM / 01',
    systemTitle: 'From API to evidence',
    systemLegend: 'From API contract to release evidence.',
    systemHint: 'Hover or use Tab to inspect each stage.',
    stageLabel: 'Active stage',
    flowLabel: 'Integration flow across API, messaging, worker, snapshot, and validation',
    liveLabel: 'telemetry running',
    flowStages: [
      ['API', 'Contract received', 'Input is validated before moving through the flow.'],
      ['Event bus', 'Event routed', 'The event reaches the right destination with traceability.'],
      ['SQS / DLQ', 'Queue protected', 'Retries and redrive make failure visible and recoverable.'],
      ['Worker', 'Processing isolated', 'Asynchronous work does not block the API response.'],
      ['S3 snapshot', 'State preserved', 'The last valid snapshot keeps the dashboard available.'],
      ['Validation', 'Release evidence', 'The flow ends with testing, a record, and a human decision.'],
    ],
  },
  about: { kicker: 'Verified evidence', title: 'Proof by domain, not by adjective.', description: 'Each row connects domain, evidence, and validation. Professional cases remain anonymized for confidentiality.' },
  projects: { kicker: 'Anonymized cases', title: 'Decision, constraint, and validation dossiers.', description: 'The value is in the delivery structure. Professional cases do not expose customers, internal URLs, payloads, identifiers, private data, or confidential metrics.', repository: 'Repository', problem: 'Problem', constraints: 'Constraints', responsibility: 'Responsibility', decisions: 'Decisions', validation: 'Validation', tools: 'Tools' },
  skills: { kicker: 'Capability matrix', title: 'Capability appears beside the evidence.', description: 'No invented bars, percentages, or levels. Each group shows practical context, tools, and validation method.', tableLabel: 'Evidence-based capability matrix', area: 'Area', evidence: 'Evidence', tools: 'Tools', validation: 'Validation' },
  experience: { kicker: 'Exact experience', title: 'Accelerated progression. Growing responsibility.', openOfficialSite: 'open official website in a new tab' },
  education: { educationKicker: 'Education', educationTitle: 'Academic foundation in progress.', languagesKicker: 'Languages', languagesTitle: 'Communication across three languages.' },
  certificates: { kicker: 'Selected credentials', title: 'Credentials that support the foundation.', description: 'A concise selection covering language, knowledge administration, and engineering fundamentals.' },
  contact: { kicker: 'Contact', title: 'Next step: review cases, public code, or reach out directly.', description: 'To discuss software engineering, integrations, or operational quality, choose the most direct channel.' },
  footer: { disclaimer: 'Public portfolio with anonymized cases.', builtWith: 'Built with React, TypeScript, Motion, and Three.js.' },
};

const esProfile = {
  ...sharedProfile,
  displayTitle: 'Desenvolvedor III · Backend y APIs',
  headline: 'Backend, APIs e integraciones con evidencia.',
  summary: 'Trabajo con C#/.NET, TypeScript/Node.js y AWS para hacer que las integraciones sean trazables, comprobables y seguras — desde el contrato de la API hasta la evidencia de release.',
  location: 'São Paulo, Brasil',
};

const esNavItems = [
  { label: 'Inicio', href: '#home' },
  { label: 'Evidencias', href: '#evidencias' },
  { label: 'Casos', href: '#cases' },
  { label: 'Capacidades', href: '#capacidades' },
  { label: 'Trayectoria', href: '#trajetoria' },
] as const;

const esEvidenceRows = [
  ['Backend/API', 'Servicios e integraciones con C#/.NET, TypeScript/Node.js y APIs SaaS.', 'Alcance revisado, documentación técnica y validación antes del release.'],
  ['Datos', 'Deduplicación, freshness, backfill, límites de API y trazabilidad de la recolección.', 'Comparación paralela y seguimiento de sincronización cuando corresponde.'],
  ['AWS/Delivery', 'Amplify, Lambda, S3, SQS, EventBridge, Athena, QuickSight y App Runner.', 'Pruebas locales, revisión de configuración y evidencia RTM bajo orientación de liderazgo técnico.'],
  ['Validación', 'Consumo SQS/DLQ, visibility timeout, retries y redrive en entorno local.', 'Escenarios decisivos ejecutados antes de pasar a homologación.'],
  ['Ingeniería asistida por IA', 'Cadenas de agentes y subagentes, MCPs y Learning Loop aplicados a implementación, análisis y revisión.', 'Responsabilidad humana por alcance, código, pruebas, documentación, evidencias y gates.'],
] as const;

const esCases = [
  {
    title: 'Plataforma interna de telemetría y calidad de datos',
    label: 'Caso profesional anonimizado',
    problem: 'Los flujos internos necesitaban preservar la telemetría y la calidad de datos frente a límites de API, almacenamiento, cardinalidad, ruido de origen y freshness.',
    constraints: ['Sin exponer cliente, URL interna, payload, IDs, métricas confidenciales ni PII.', 'Operación sujeta a límites de APIs SaaS y ventanas de retención configuradas en el entorno.', 'Necesidad de trazabilidad y aislamiento de fallas por fuente y recolector.'],
    responsibility: 'Evolución de flujos de recolección, integración, calidad de datos y validación; publicación del frontend en AWS Amplify; trabajo backend bajo orientación de liderazgo técnico.',
    decisions: ['Migración controlada de ElastiCache/Redis a snapshots en Amazon S3 con expiración de 90 días.', 'Fallback al último snapshot válido y vista interna de sincronización durante la transición.', 'Credenciales separadas por recolector/función para menor privilegio, diagnóstico por fuente y aislamiento de fallas.', 'Integración Datadog → Notion con procesamiento programado mediante Amazon EventBridge.'],
    validation: ['Validación paralela antes de retirar el caché anterior.', 'Pruebas locales con SQS/DLQ que cubren consumo, visibility timeout, retries y redrive.', 'Evidencias RTM y envío a homologación cuando el alcance lo requirió.'],
    tools: ['C#/.NET', 'TypeScript/Node.js', 'Lambda', 'S3', 'SQS/DLQ', 'EventBridge', 'Datadog', 'Notion API'],
    caveat: 'Anonimizado por confidencialidad; sin métricas ni detalles internos.',
  },
  {
    title: 'Servicio enterprise de notificaciones asíncronas',
    label: 'Caso profesional anonimizado',
    problem: 'Un servicio necesitaba validar solicitudes, encolar callbacks y tratar fallas sin bloquear la API ni exponer datos sensibles en los logs.',
    constraints: ['Dominio, cliente, endpoints, payloads y topología interna se mantienen anónimos.', 'La configuración depende de variables de entorno y colas aprovisionadas por otros equipos.', 'Trabajo bajo orientación de liderazgo técnico y dentro del flujo de homologación.'],
    responsibility: 'Participé en la documentación y evolución del flujo backend, la configuración del entorno y la validación local, incluyendo controller/use case, encolado SQS FIFO, enmascaramiento de logs y tratamiento global de excepciones.',
    decisions: ['Separación entre la respuesta síncrona de la API y el procesamiento asíncrono del callback.', 'Cola FIFO para preservar orden y deduplicación compatible con el contrato.', 'Enmascaramiento de campos sensibles y tratamiento consistente de excepciones en logs.'],
    validation: ['Specs para controller, caso de uso, cola, logger, enmascaramiento y filtro global de excepciones.', 'Pruebas locales del flujo de consumo, retry y envío a DLQ.', 'Evidencias técnicas antes de la promoción entre entornos.'],
    tools: ['TypeScript', 'API REST', 'SQS FIFO', 'DLQ', 'Jest', 'Logs estructurados'],
    caveat: 'Caso fuertemente anonimizado por confidencialidad; sin cliente, dominio funcional ni arquitectura interna.',
  },
  {
    title: 'Sincronización bidireccional entre plataformas SaaS',
    label: 'Integración técnica',
    problem: 'Mantener propiedades equivalentes sincronizadas entre dos plataformas SaaS sin crear loops, duplicados o divergencias silenciosas.',
    constraints: ['APIs externas con límites de solicitudes y formatos diferentes.', 'Eventos originados en ambos lados del flujo.', 'Resultado de latencia medido únicamente en un entorno local controlado.'],
    responsibility: 'Implementé handlers de webhook y el flujo de lectura, normalización, comparación y escritura en ambos sentidos, con asistencia de IA y revisión humana.',
    decisions: ['Normalización de identificadores antes de la comparación.', 'Registro de sincronizaciones recientes para impedir el ping-pong entre webhooks.', 'Separación explícita entre transformación de datos y escritura en cada API.'],
    validation: ['Validación local de ambos sentidos de sincronización.', 'En una prueba local controlada, el feedback observado bajó de hasta 60 segundos a menos de 2 segundos.', 'El caveat público evita convertir un resultado de laboratorio en promesa de producción.'],
    tools: ['TypeScript', 'Node.js', 'Webhooks', 'Notion API', 'Monday API'],
    caveat: 'Prueba local controlada; no es una garantía de latencia ni confiabilidad en producción.',
  },
  {
    title: 'ATS Optimizer',
    label: 'Proyecto personal asistido por IA',
    problem: 'Evaluar el alineamiento entre currículum y vacante sin fabricar experiencias ni inflar responsabilidades.',
    constraints: ['Preservar la verdad factual del candidato.', 'Las sugerencias de IA exigen revisión humana.', 'Probar con datos reales antes de confiar en el flujo.'],
    responsibility: 'Definí el problema, UX, criterios de aceptación, pruebas con datos reales, revisión y refinamiento; parte de la implementación en React, TypeScript y .NET contó con asistencia de IA.',
    decisions: ['Criterios antialucinación.', 'Flujo centrado en alineamiento factual.', 'Revisión humana antes de aceptar recomendaciones.'],
    validation: ['Pruebas con datos reales.', 'Revisión manual de las sugerencias.', 'Criterios de aceptación para no inventar experiencia.'],
    tools: ['React', 'TypeScript', '.NET', 'PDF Parsing', 'LLM asistido'],
    link: 'https://github.com/GustavoFragas/ats-optimizer',
  },
] as const;

const esCapabilities = [
  ['Backend y APIs', 'Construcción de servicios, endpoints e integraciones con atención al contrato, validación y mantenimiento.', 'C#, .NET, ASP.NET Core, API REST, TypeScript, Node.js', 'Documentación técnica, revisión y pruebas proporcionales al riesgo.'],
  ['Integraciones SaaS', 'Flujos con Notion, Datadog, DocuSign CLM y APIs SaaS en rutinas internas.', 'Notion API, Datadog, DocuSign CLM, Webhooks, EventBridge', 'Tratamiento de errores, trazabilidad y aislamiento por fuente.'],
  ['Calidad de datos', 'Deduplicación, freshness, backfill, límites de almacenamiento y ruido de telemetría.', 'SQL, Athena, S3, QuickSight, Data Quality', 'Comparación, reconciliación y seguimiento de sincronización.'],
  ['AWS y entrega', 'Publicación de frontend en Amplify y uso/revisión de workloads en App Runner, Lambda, S3 y SQS.', 'AWS Amplify, Lambda, S3, SQS/DLQ, App Runner, GitHub Actions, Docker', 'Builds, pruebas locales, revisión de configuración y evidencia de release.'],
  ['Observabilidad y validación', 'Rutinas para preservar telemetría, reducir ruido y volver trazables las ejecuciones.', 'Datadog, Sonar, Gitleaks, RTM, pruebas de integración', 'Escenarios decisivos, logs/evidencias y envío a homologación.'],
  ['Ingeniería con agentes', 'Cadenas de agentes y subagentes, MCPs y Learning Loop para dividir contexto, revisar entregas y transformar fallas reales en prevención reutilizable.', 'Codex, Kiro, MCP, agentes especializados, Learning Loop', 'El alcance, la revisión técnica, las pruebas, las evidencias y la decisión final siguen bajo responsabilidad humana.'],
] as const;

const esExperiences = [
  ['mar. 2026 - actualidad', 'Alest', 'Desenvolvedor III', ['Cargo contractual oficial en Brasil: Desenvolvedor III. Contratado de forma efectiva el 30/03/2026; Dev II el 14/05/2026; Dev III el 01/06/2026.', 'Plataformas internas de datos y telemetría, integraciones SaaS y servicios backend enterprise.', 'Documentación, configuración, mensajería, pruebas locales, validación en desarrollo y evidencias RTM bajo orientación de liderazgo técnico.'], 'https://alest.com.br/'],
  ['oct. 2025 - mar. 2026', 'Alest', 'Pasante de Desarrollo de Software', ['Apoyo en integraciones y automatizaciones internas con C#/.NET, TypeScript/Node.js y APIs SaaS.', 'Participación en las etapas iniciales de una plataforma interna de telemetría/datos.', 'Flows en DocuSign CLM enfocados en validación, trazabilidad y tratamiento de errores.'], 'https://alest.com.br/'],
  ['ago. 2025 - oct. 2025', 'Atento', 'Soporte bilingüe en español', ['Atención y soporte a clientes en español, con comunicación, triaje y seguimiento de solicitudes.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['mar. 2023 - abr. 2025', 'Argentina', 'Servicio voluntario de tiempo completo', ['Trabajo comunitario en un contexto multicultural, con comunicación diaria en español.', 'Visitas, organización de agenda, acompañamiento de personas y colaboración con equipos locales.', 'Experiencia internacional que consolidó la fluidez en español, la adaptación cultural y la comunicación clara.'], null],
  ['mar. 2021 - nov. 2022', 'Beneficência Portuguesa de São Paulo', 'Joven aprendiz', ['Primera experiencia en un entorno corporativo, rutina operativa y comunicación con áreas internas.'], 'https://www.bp.org.br/'],
] as const;

const esEducation = [
  ['may. 2025 - dic. 2027', 'Brigham Young University-Idaho', 'Bachelor of Science, Software Development'],
  ['oct. 2025 - jul. 2027', 'UFBRA', 'Tecnología en Análisis y Desarrollo de Sistemas'],
  ['feb. 2020 - nov. 2022', 'ETEC Parque Belém', 'Técnico en Desarrollo de Sistemas'],
] as const;

const esLanguages = [['Portugués', 'Nativo'], ['Español', 'Fluido'], ['Inglés', 'B2']] as const;
const esCredentials = [
  ['LingoPass', 'Inglés B2 Advanced', '/certificates/Lingopass certificate B2 Advanced.pdf'],
  ['Notion', 'Notion Certified Admin', 'https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946'],
  ['DIO', 'Control de versiones con Git y GitHub', '/certificates/Versionamento de Código com Git e GitHub.pdf'],
] as const;

const esUi = {
  meta: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    siteName: 'Portafolio de Gustavo Fragas Cunha',
    title: 'Gustavo Fragas Cunha | Desenvolvedor III | Backend, APIs e integraciones',
    description: 'Portafolio técnico de Gustavo Fragas Cunha: backend, APIs, integraciones, AWS, datos y validación respaldados por evidencia operativa.',
    socialDescription: 'Backend, APIs e integraciones con C#/.NET, TypeScript y AWS. Casos anonimizados por problema, decisión y validación.',
    socialImageAlt: 'Gustavo Fragas Cunha junto a un flujo visual de backend, APIs, colas, workers, snapshots y validación.',
  },
  skipLink: 'Ir al contenido',
  fatal: {
    kicker: 'PORTAFOLIO DISPONIBLE',
    title: 'La interfaz visual no se cargó por completo.',
    description: 'El contenido sigue disponible. Recarga la página para intentarlo de nuevo.',
    action: 'Recargar portafolio',
  },
  navigation: { mainLabel: 'Navegación principal', mobileLabel: 'Navegación móvil', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', contact: 'Contacto', directContact: 'Contacto directo', languageLabel: 'Seleccionar idioma' },
  hero: {
    greeting: 'Hola, soy Gustavo.',
    proofLabel: 'Evidencias técnicas resumidas',
    proofTags: ['C#/.NET', 'TypeScript/Node.js', 'AWS', 'Agentes + Learning Loop'],
    primaryCta: 'Inspeccionar casos',
    emailCta: 'Contactar por email',
    externalLinksLabel: 'Enlaces externos',
    portraitAlt: 'Gustavo Fragas Cunha sonriendo en las gradas de un estadio.',
    portraitMeta: 'backend · integraciones · datos',
    systemKicker: 'SISTEMA VIVO / 01',
    systemTitle: 'De la API a la evidencia',
    systemLegend: 'Del contrato de API a la evidencia de release.',
    systemHint: 'Pasa el cursor o usa Tab para inspeccionar cada etapa.',
    stageLabel: 'Etapa activa',
    flowLabel: 'Flujo de integración entre API, mensajería, worker, snapshot y validación',
    liveLabel: 'telemetría en ejecución',
    flowStages: [
      ['API', 'Contrato recibido', 'La entrada se valida antes de avanzar por el flujo.'],
      ['Event bus', 'Evento enrutado', 'El evento llega al destino correcto con trazabilidad.'],
      ['SQS / DLQ', 'Cola protegida', 'Retries y redrive vuelven la falla visible y recuperable.'],
      ['Worker', 'Procesamiento aislado', 'El trabajo asíncrono no bloquea la respuesta de la API.'],
      ['Snapshot S3', 'Estado preservado', 'El último snapshot válido mantiene disponible el panel.'],
      ['Validación', 'Evidencia de release', 'El flujo termina con prueba, registro y decisión humana.'],
    ],
  },
  about: { kicker: 'Evidencias verificadas', title: 'Prueba por dominio, no por adjetivo.', description: 'Cada fila conecta área, evidencia y validación. Los casos profesionales permanecen anonimizados por confidencialidad.' },
  projects: { kicker: 'Casos anonimizados', title: 'Dosieres de decisión, restricciones y validación.', description: 'El valor está en la estructura de la entrega. Los casos profesionales no exponen clientes, URLs internas, payloads, identificadores, datos privados ni métricas confidenciales.', repository: 'Repositorio', problem: 'Problema', constraints: 'Restricciones', responsibility: 'Responsabilidad', decisions: 'Decisiones', validation: 'Validación', tools: 'Herramientas' },
  skills: { kicker: 'Matriz de capacidades', title: 'La capacidad aparece junto a la evidencia.', description: 'Sin barras, porcentajes ni niveles inventados. Cada grupo muestra contexto práctico, herramientas y forma de validación.', tableLabel: 'Matriz de capacidades basada en evidencia', area: 'Área', evidence: 'Evidencia', tools: 'Herramientas', validation: 'Validación' },
  experience: { kicker: 'Experiencia exacta', title: 'Progresión acelerada. Responsabilidad creciente.', openOfficialSite: 'abrir sitio oficial en una nueva pestaña' },
  education: { educationKicker: 'Formación', educationTitle: 'Base académica en curso.', languagesKicker: 'Idiomas', languagesTitle: 'Comunicación en tres frentes.' },
  certificates: { kicker: 'Credenciales seleccionadas', title: 'Credenciales que sostienen la base.', description: 'Una selección breve de idioma, administración del conocimiento y fundamentos de ingeniería.' },
  contact: { kicker: 'Contacto', title: 'Próximo paso: revisar casos, código público o hablar directamente.', description: 'Para conversar sobre ingeniería de software, integraciones o calidad operativa, elige el canal más directo.' },
  footer: { disclaimer: 'Portafolio público con casos anonimizados.', builtWith: 'Desarrollado con React, TypeScript, Motion y Three.js.' },
};

export const portfolioLocales = {
  pt: {
    profile: ptProfile,
    navItems: ptNavItems,
    evidenceRows: ptEvidenceRows,
    cases: ptCases,
    capabilities: ptCapabilities,
    experiences: ptExperiences,
    education: ptEducation,
    languages: ptLanguages,
    credentials: ptCredentials,
    ui: ptUi,
  },
  en: {
    profile: enProfile,
    navItems: enNavItems,
    evidenceRows: enEvidenceRows,
    cases: enCases,
    capabilities: enCapabilities,
    experiences: enExperiences,
    education: enEducation,
    languages: enLanguages,
    credentials: enCredentials,
    ui: enUi,
  },
  es: {
    profile: esProfile,
    navItems: esNavItems,
    evidenceRows: esEvidenceRows,
    cases: esCases,
    capabilities: esCapabilities,
    experiences: esExperiences,
    education: esEducation,
    languages: esLanguages,
    credentials: esCredentials,
    ui: esUi,
  },
} as const;

export const supportedLocales = ['pt', 'en', 'es'] as const;
export type PortfolioLocale = (typeof supportedLocales)[number];
export type PortfolioContent = (typeof portfolioLocales)[PortfolioLocale];

export function isPortfolioLocale(value: string | null): value is PortfolioLocale {
  return supportedLocales.some((locale) => locale === value);
}
