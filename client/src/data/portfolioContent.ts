export const profile = {
  name: 'Gustavo Fragas Cunha',
  firstName: 'Gustavo',
  lastName: 'Fragas',
  officialTitle: 'Desenvolvedor Pleno',
  image: '/images/profile.jpg',
  email: 'gustavofragascunha@gmail.com',
  phoneDisplay: '+55 11 98019-2710',
  phoneLink: 'https://wa.me/5511980192710',
  linkedIn: 'https://linkedin.com/in/gustavofragascunha',
  linkedInDisplay: 'in/gustavofragascunha',
  gitHub: 'https://github.com/GustavoFragas',
  gitHubDisplay: 'GustavoFragas',
  location: 'São Paulo, Brasil',
};

export const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Contato', href: '#contato' },
];

export const cases = [
  {
    title: 'Plataforma interna de telemetria e qualidade de dados',
    label: 'Case do trabalho, anonimizado',
    summary:
      'Ajudei a tirar o cache de uma plataforma interna de telemetria do Redis e levar para snapshots no S3, com fallback e credencial separada por coletor.',
    problem:
      'Os fluxos internos precisavam manter telemetria e qualidade de dados de pé apesar de limites de API, armazenamento, cardinalidade, ruído na origem e freshness.',
    did:
      'Trabalhei na evolução da coleta, integração, qualidade de dados e validação, publiquei o frontend no AWS Amplify e fiz a parte de backend com orientação da liderança técnica.',
    decisions: [
      'Migração controlada de ElastiCache/Redis para snapshots no Amazon S3 com expiração de 90 dias.',
      'Fallback para o último snapshot válido e uma visão interna de sincronização durante a transição.',
      'Credenciais separadas por coletor/função: menor privilégio, diagnóstico por fonte e falhas isoladas.',
      'Integração Datadog → Notion com processamento agendado pelo Amazon EventBridge.',
    ],
    validation: [
      'Validação em paralelo antes de desligar o cache anterior.',
      'Testes locais com SQS/DLQ cobrindo consumo, visibility timeout, retries e redrive.',
      'Registrei os testes e passei para homologação quando o escopo pedia.',
    ],
    tools: ['C#/.NET', 'TypeScript/Node.js', 'Lambda', 'S3', 'SQS/DLQ', 'EventBridge', 'Datadog', 'Notion API'],
    caveat: 'Anonimizado por confidencialidade: sem cliente, métricas ou detalhes internos.',
    link: '',
  },
  {
    title: 'Serviço de notificações assíncronas',
    label: 'Case do trabalho, anonimizado',
    summary:
      'Documentei e evoluí, junto com a liderança técnica, um serviço que valida requisições, enfileira callbacks em SQS FIFO e trata falha sem travar a API.',
    problem:
      'O serviço precisava validar requisições, enfileirar callbacks e lidar com falhas sem bloquear a API e sem vazar dado sensível nos logs.',
    did:
      'Atuei na documentação e evolução do fluxo backend, na configuração de ambiente e na validação local: controller/use case, fila SQS FIFO, mascaramento de logs e tratamento global de exceções.',
    decisions: [
      'Resposta síncrona da API separada do processamento assíncrono do callback.',
      'Fila FIFO para manter ordem e deduplicação compatíveis com o contrato.',
      'Campos sensíveis mascarados e exceções tratadas do mesmo jeito em todos os logs.',
    ],
    validation: [
      'Specs para controller, caso de uso, fila, logger, mascaramento e filtro global de exceções.',
      'Testes locais de consumo, retry e envio para a DLQ.',
      'Tudo documentado antes de subir de ambiente.',
    ],
    tools: ['TypeScript', 'API REST', 'SQS FIFO', 'DLQ', 'Jest', 'logs estruturados'],
    caveat: 'Bem anonimizado: sem cliente, domínio de negócio ou arquitetura interna.',
    link: '',
  },
  {
    title: 'Sincronização entre duas plataformas SaaS',
    label: 'Integração',
    summary:
      'Escrevi os webhooks que mantêm propriedades iguais nas duas plataformas, nos dois sentidos, sem cair no ping-pong de um webhook disparando o outro.',
    problem:
      'Manter propriedades equivalentes sincronizadas entre duas plataformas SaaS sem criar loop, duplicidade ou divergência silenciosa.',
    did:
      'Implementei os handlers de webhook e o fluxo de leitura, normalização, comparação e escrita nos dois sentidos, com apoio de IA e revisão humana.',
    decisions: [
      'Identificadores normalizados antes de comparar.',
      'Registro das sincronizações recentes para impedir o ping-pong entre webhooks.',
      'Transformação de dados separada da escrita em cada API.',
    ],
    validation: [
      'Validação local dos dois sentidos da sincronização.',
      'Em teste local controlado, o retorno caiu de até 60 segundos para menos de 2 segundos.',
    ],
    tools: ['TypeScript', 'Node.js', 'webhooks', 'Notion API', 'Monday API'],
    caveat: 'Número de teste local controlado; não é garantia de latência em produção.',
    link: '',
  },
  {
    title: 'ATS Optimizer',
    label: 'Projeto pessoal',
    summary:
      'Uma ferramenta que compara currículo e vaga sem inventar experiência: a IA sugere, eu reviso antes de aceitar qualquer coisa.',
    problem: 'Avaliar o alinhamento entre currículo e vaga sem fabricar experiência nem inflar responsabilidade.',
    did:
      'Defini o problema, a UX, os critérios de aceite e os testes com dados reais, e fiz a revisão e o refinamento. Parte do código em React, TypeScript e .NET teve apoio de IA.',
    decisions: ['Critérios anti-alucinação.', 'Fluxo centrado em alinhamento factual.', 'Revisão humana antes de aceitar recomendação.'],
    validation: ['Testes com dados reais.', 'Revisão manual das sugestões.', 'Critério de aceite para não inventar experiência.'],
    tools: ['React', 'TypeScript', '.NET', 'leitura de PDF', 'LLM assistido'],
    caveat: '',
    link: 'https://github.com/GustavoFragas/ats-optimizer',
  },
];

export const capabilities = [
  ['Backend e APIs', 'Serviços, endpoints e integrações pensando no contrato, na validação e em quem vai manter depois.', 'C#, .NET, ASP.NET Core, REST, TypeScript e Node.js'],
  ['Integrações SaaS', 'Rotinas que conectam Notion, Datadog, DocuSign CLM e outras APIs, com tratamento de erro e rastreio por fonte.', 'Notion API, Datadog, DocuSign CLM, webhooks e EventBridge'],
  ['Dados', 'Deduplicação, freshness, backfill e reconciliação: o dado chegando certo antes de virar painel.', 'SQL, Athena, S3 e QuickSight'],
  ['AWS e entrega', 'Publiquei frontend no Amplify e uso ou revisei workloads em App Runner, Lambda, S3 e SQS.', 'Amplify, Lambda, S3, SQS/DLQ, App Runner, GitHub Actions e Docker'],
  ['Testes e observabilidade', 'Testo localmente os cenários que importam antes de mandar para homologação.', 'Datadog, Sonar, Gitleaks e testes de integração'],
  ['Engenharia com agentes', 'Cadeias de agentes, MCPs e Learning Loop para dividir contexto e revisar entregas. Escopo, código, teste e decisão final continuam comigo.', 'Codex, Kiro, MCP e Learning Loop'],
] as const;

export const experiences = [
  ['jun/2026 – hoje', 'Alest', 'Desenvolvedor Pleno', ['Evolução de plataformas de dados e telemetria, integrações SaaS e serviços backend.', 'Documentação, configuração, mensageria, testes e validação junto com a liderança técnica.'], 'https://alest.com.br/'],
  ['mar/2026 – mai/2026', 'Alest', 'Desenvolvedor Júnior', ['Efetivado em 30/03/2026, depois do estágio.', 'Integrações, automações e rotinas de qualidade de dados.'], 'https://alest.com.br/'],
  ['out/2025 – mar/2026', 'Alest', 'Estagiário de Desenvolvimento de Software', ['Apoio em integrações e automações internas com C#/.NET, TypeScript/Node.js e APIs SaaS.', 'Primeiras etapas de uma plataforma interna de telemetria e dados.', 'Flows no DocuSign CLM com foco em validação, rastreabilidade e tratamento de erro.'], 'https://alest.com.br/'],
  ['ago/2025 – out/2025', 'Atento', 'Suporte bilíngue em espanhol', ['Atendimento e suporte a clientes em espanhol: comunicação, triagem e acompanhamento de solicitações.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['mar/2023 – abr/2025', 'Argentina', 'Serviço voluntário em tempo integral', ['Trabalho comunitário em contexto multicultural, falando espanhol todos os dias.', 'Visitas, agenda, acompanhamento de pessoas e colaboração com equipes locais.'], ''],
  ['mar/2021 – nov/2022', 'Beneficência Portuguesa de São Paulo', 'Jovem Aprendiz', ['Primeira experiência em ambiente corporativo, rotina operacional e comunicação com áreas internas.'], 'https://www.bp.org.br/'],
] as const;

export const education = [
  ['mai/2025 – dez/2027', 'Brigham Young University\u2011Idaho', 'Bachelor of Science em Software Development (em andamento)'],
  ['out/2025 – jul/2027', 'UFBRA', 'Tecnologia em Análise e Desenvolvimento de Sistemas (em andamento)'],
  ['fev/2020 – nov/2022', 'ETEC Parque Belém', 'Técnico em Desenvolvimento de Sistemas'],
] as const;

export const languages = [
  ['Português', 'pt', 'nativo'],
  ['Español', 'es', 'fluente, de dois anos na Argentina'],
  ['English', 'en', 'B2, certificado pela LingoPass'],
] as const;

export const credentials = [
  {
    issuer: 'AWS',
    name: 'AWS Certified DevOps Engineer – Professional',
    url: '',
    art: '/certificates/aws-devops-professional.png',
  },
  {
    issuer: 'Google Cloud',
    name: 'Generative AI Leader',
    url: '',
    art: '/certificates/google-generative-ai-leader.png',
  },
  {
    issuer: 'Notion',
    name: 'Notion Certified Admin',
    url: 'https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946',
    art: '/certificates/notion-certified-admin.png',
  },
  {
    issuer: 'LingoPass',
    name: 'Inglês B2 Advanced',
    url: '/certificates/Lingopass certificate B2 Advanced.pdf',
    art: '',
  },
  {
    issuer: 'DIO',
    name: 'Versionamento de Código com Git e GitHub',
    url: '/certificates/Versionamento de Código com Git e GitHub.pdf',
    art: '',
  },
];
