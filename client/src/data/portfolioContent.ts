import type { CaseItem } from './portfolioLocales';

export const profile = {
  name: 'Gustavo Fragas Cunha',
  firstName: 'Gustavo',
  lastName: 'Fragas',
  officialTitle: 'Desenvolvedor Pleno',
  image: '/images/profile-portrait-700.webp',
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
  { label: 'Certificações', href: '#credenciais' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Contato', href: '#contato' },
];

// Real capture of the ATS Optimizer upload screen, run from the public repository
// (provenance in docs/pixel-wall/asset-sources.md). The alt text is per locale.
export const atsShot = { src: '/projects/ats-optimizer-upload.webp', width: 1200, height: 720 };

// Each case reads in ten seconds without a technical background: what it is,
// the problem, what I did and the result. Jargon only lives in the technical details.
// Order 01–06 (Rodada 6B, from claims-6b.md): modernization with a team, internal AI adoption
// platform, résumé matcher (the only public repo), notices, integration, FragasTokenPulse.
// `headline` only restates the case's own `result`/`did`/`problem`, with no new fact or number.
// `decisions` keeps only what the drawer's diagram steps (projectDetails.ts), the chips (`tools`) and
// `did` do not already say; empty when nothing is left (the drawer then hides the column).
// Clients appear only by sector; nothing here says a system is live.
export const cases: CaseItem[] = [
  {
    key: 'modernization',
    headline: 'Plano aprovado pelo cliente sem ressalvas',
    title: 'Modernização com um time',
    label: 'Case do trabalho, anonimizado',
    what: 'A modernização de um sistema que define quem aprova pagamentos e até que valor, numa construtora.',
    problem: 'A stack estava fora de suporte (Java EE 5, AngularJS 1.6, WebLogic 11g, sem chaves estrangeiras), e trocar a alçada por pessoa pela alçada por cargo mexe em cerca de 80% do modelo.',
    did: 'Contei o escopo real (156 endpoints, 47 entidades, 111 tabelas e 99 objetos PL/SQL), desenhei um monólito modular em Java 21 + Jakarta EE com Strangler Fig e camada anticorrupção para os ERPs e coordenei 4 devs com template de PR, revisão em rodadas e merge único.',
    result: 'Plano validado pelo cliente sem ressalvas (jul/2026) e fundação técnica iniciada.',
    tags: ['Liderança técnica', 'Java', 'Arquitetura'],
    decisions: [],
    validation: [
      'Plano validado pelo cliente sem ressalvas (jul/2026).',
      'CI no PR: build, ArchUnit e varredura de segredos.',
      'Revisão de todos os 67 cards e certificação pós-merge.',
    ],
    tools: ['Java 21', 'Jakarta EE', 'Strangler Fig', 'ArchUnit', 'PL/SQL'],
    caveat: 'Anonimizado por confidencialidade: o cliente aparece só pelo setor.',
    link: '',
  },
  {
    key: 'monitoring',
    headline: 'Uma fonte cai, o painel segue de pé',
    title: 'Plataforma interna de adoção de IA',
    label: 'Case do trabalho, anonimizado',
    what: 'Um painel interno que junta de 8 a 10 fontes de atividade (agendas, Notion, monday, Gmail, Drive, Claude/Codex) para a liderança enxergar a adoção de ferramentas e IA por setor.',
    problem: 'Quando o Redis estourou, o painel não podia perder o último conjunto de dados íntegro.',
    did: 'Fui o principal autor: 399 de 483 commits, os releases, os ADRs, os runbooks e o livro de engenharia do time. A plataforma inclui o coletor de uso de IA que roda nos Macs do time, com outbox durável, idempotência e rollout canário com rollback.',
    result: 'O snapshot no S3 manteve o último conjunto íntegro, e o painel seguiu de pé.',
    tags: ['AWS', 'Dados', 'Backend'],
    decisions: [],
    validation: [
      'Testes com Vitest e Playwright.',
      'Rollout canário do coletor, com rollback.',
      'Decisões registradas em ADRs e operação descrita em runbooks.',
    ],
    tools: ['React 19', 'TypeScript', 'Node/Express', 'Notion API', 'Redis (Upstash)', 'S3', 'Google OAuth', 'AWS App Runner', 'Amplify', 'Vitest', 'Playwright'],
    caveat: 'Anonimizado por confidencialidade: sem dados de pessoas nem detalhes internos.',
    link: '',
  },
  {
    key: 'ats',
    headline: 'Só sugere o que é verdade',
    title: 'Comparador de currículo e vaga',
    label: 'Projeto pessoal',
    what: 'Uma ferramenta que mostra o quanto um currículo combina com uma vaga, sem inventar experiência.',
    problem: 'Ferramentas de IA costumam “enfeitar” o currículo com coisas que a pessoa não fez.',
    did: 'Defini o problema, a experiência de uso e as regras para a IA só sugerir o que é verdade, e testei com dados reais. Parte do código teve apoio de IA.',
    result: 'Sugestões que respeitam o histórico real, sempre revisadas por uma pessoa antes de aceitar.',
    tags: ['IA', 'React'],
    decisions: [],
    validation: ['Testes com dados reais.', 'Revisão manual das sugestões.', 'Critério de aceite para não inventar experiência.'],
    tools: ['React', 'TypeScript', '.NET', 'leitura de PDF', 'LLM assistido'],
    caveat: '',
    link: 'https://github.com/GustavoFragas/ats-optimizer',
    shot: {
      ...atsShot,
      alt: 'Tela de upload do ATS Optimizer, em tema escuro: áreas para enviar o currículo e o perfil do LinkedIn em PDF, campo para colar a descrição da vaga, opção de anexar uma foto da vaga e campo opcional com a URL da empresa.',
    },
  },
  {
    key: 'alerts',
    headline: 'Falhou? Nova tentativa, sem travar o sistema',
    title: 'Avisos automáticos entre sistemas',
    label: 'Case do trabalho, anonimizado',
    what: 'Um serviço que avisa outros sistemas quando algo acontece, sem deixar o sistema principal esperando.',
    problem: 'Um aviso que falhasse não podia travar o sistema principal nem expor dados sensíveis nos registros.',
    did: 'Junto com o líder técnico, documentei e evoluí o serviço: os avisos passaram por uma fila, os dados sensíveis ficaram mascarados nos registros e os erros ganharam um tratamento único.',
    result: 'O sistema principal responde na hora; os avisos seguem pela fila e, se falharem, ficam separados para uma nova tentativa.',
    tags: ['Backend', 'APIs', 'Filas'],
    decisions: ['Fila FIFO para manter ordem e deduplicação compatíveis com o contrato.'],
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
    key: 'integration',
    headline: 'até\u00a060\u00a0s → <\u00a02\u00a0s',
    headlineNote: 'em teste local controlado',
    title: 'Duas ferramentas com a mesma informação',
    label: 'Case do trabalho, anonimizado',
    what: 'Uma integração que mantém os mesmos dados em duas plataformas que a equipe usa no dia a dia.',
    problem: 'Atualizar uma e esquecer a outra deixava a informação desencontrada, e sincronizar sem cuidado cria um vaivém sem fim.',
    did: 'Escrevi a integração nos dois sentidos, com uma trava que impede que uma atualização dispare a outra sem parar. Usei IA com revisão humana.',
    result: 'As duas plataformas ficam alinhadas. Em teste local controlado, a atualização caiu de até 60 s para menos de 2 s.',
    tags: ['Integração', 'Automação', 'TypeScript'],
    decisions: [
      'Identificadores normalizados antes de comparar.',
      'Registro das sincronizações recentes para impedir o ping-pong entre webhooks.',
      'Transformação de dados separada da escrita em cada API.',
    ],
    validation: ['Validação local dos dois sentidos da sincronização.', 'Medição em teste local controlado (até 60 s → menos de 2 s).'],
    tools: ['TypeScript', 'Node.js', 'webhooks', 'Notion API', 'Monday API'],
    caveat: 'Número de teste local controlado; não é garantia de latência fora do teste.',
    link: '',
  },
  {
    // Every sentence checked against the app's README (FragasTokenPulse/README.md): native macOS app,
    // Codex and Claude Code usage and running chats, local JSONL + usage cache, no network requests,
    // message content not retained. Private repository: no link and no screenshot.
    key: 'tokenpulse',
    headline: 'Só arquivos locais, sem rede',
    title: 'Codex e Claude Code no notch',
    label: 'Projeto pessoal',
    what: 'Um app nativo de macOS que mostra no notch o consumo de Codex e Claude Code e quais chats estão ativos.',
    problem: 'Mostrar esse consumo sem acessar a rede e sem guardar o conteúdo das mensagens.',
    did: 'Fiz o app em Swift lendo só arquivos locais: os JSONL e o cache de uso.',
    result: 'O consumo e os chats ativos ficam à vista no notch, sem nenhuma chamada de rede.',
    tags: ['macOS', 'Swift'],
    decisions: [],
    validation: [],
    tools: ['Swift', 'macOS', 'JSONL'],
    caveat: 'Repositório privado, por isso sem link.',
    link: '',
  },
];

// [area, sentence, chips] (Rodada 6C). Chips are the items of the old stack line, one each, named like the
// cases' `tools` when it is the same tool ("API REST", "AWS App Runner", "DLQ"), so Skills.tsx can link a
// group to the cases that list it. New chips come only from the cases (claims-6b.md, Rodada 6C): Java 21 +
// Jakarta EE (01), React (02, 03), Swift (06), Oracle / PL/SQL (01 and leadership line A).
export const capabilities = [
  ['Backend, APIs e apps', 'Serviços, endpoints e integrações pensando no contrato, na validação e em quem vai manter depois.', ['C#', '.NET', 'ASP.NET Core', 'API REST', 'TypeScript', 'Node.js', 'Java 21', 'Jakarta EE', 'React', 'Swift']],
  ['Integrações SaaS', 'Rotinas que conectam Notion, Datadog, DocuSign CLM e outras APIs, com tratamento de erro e rastreio por fonte.', ['Notion API', 'Datadog', 'DocuSign CLM', 'webhooks', 'EventBridge']],
  ['Dados', 'Deduplicação, freshness, backfill e reconciliação: o dado chegando certo antes de virar painel.', ['SQL', 'Athena', 'S3', 'QuickSight', 'Oracle', 'PL/SQL']],
  ['AWS e entrega', 'Publiquei frontend no Amplify e uso ou revisei workloads em App Runner, Lambda, S3 e SQS.', ['Amplify', 'Lambda', 'S3', 'SQS', 'DLQ', 'AWS App Runner', 'GitHub Actions', 'Docker']],
  ['Testes e observabilidade', 'Testo localmente os cenários que importam antes de mandar para homologação.', ['Datadog', 'Sonar', 'Gitleaks', 'testes de integração']],
  ['Engenharia com agentes', 'Cadeias de agentes, MCPs e Learning Loop para dividir contexto e revisar entregas. Escopo, código, teste e decisão final continuam comigo.', ['Claude Code', 'Codex', 'Kiro', 'MCP', 'Learning Loop']],
] as const;

export const experiences = [
  ['out/2026 – hoje', 'Alest', 'Desenvolvedor Pleno', ['Evolução de plataformas de dados e telemetria, integrações SaaS e serviços backend.', 'Documentação, configuração, mensageria, testes e validação junto com a liderança técnica.'], 'https://alest.com.br/'],
  ['mar/2026 – out/2026', 'Alest', 'Desenvolvedor Júnior', ['Efetivado em 30/03/2026, depois do estágio.', 'Integrações, automações e rotinas de qualidade de dados.'], 'https://alest.com.br/'],
  ['out/2025 – mar/2026', 'Alest', 'Estagiário de Desenvolvimento de Software', ['Apoio em integrações e automações internas com C#/.NET, TypeScript/Node.js e APIs SaaS.', 'Primeiras etapas de uma plataforma interna de telemetria e dados.', 'Flows no DocuSign CLM com foco em validação, rastreabilidade e tratamento de erro.'], 'https://alest.com.br/'],
  ['ago/2025 – out/2025', 'Atento', 'Suporte bilíngue em espanhol', ['Atendimento e suporte a clientes em espanhol: comunicação, triagem e acompanhamento de solicitações.'], 'https://atento.com/pb/atentonomundo/brasil'],
  // The link goes to the official site; its accessible name says where it leads (and contains the visible text).
  ['mar/2023 – abr/2025', 'Argentina', 'Serviço voluntário em tempo integral', ['Trabalho comunitário em contexto multicultural, falando espanhol todos os dias.', 'Visitas, agenda, acompanhamento de pessoas e colaboração com equipes locais.'], 'https://www.churchofjesuschrist.org/?lang=por', 'Argentina — site da Igreja de Jesus Cristo dos Santos dos Últimos Dias (abre em nova guia)'],
  ['mar/2021 – nov/2022', 'Beneficência Portuguesa de São Paulo', 'Jovem Aprendiz', ['Primeira experiência em ambiente corporativo, rotina operacional e comunicação com áreas internas.'], 'https://www.bp.org.br/'],
] as const;

// The two degrees in progress come first, then DIO, then what is already done.
// [period, institution, program, detail?]. DIO: what portfolioData.ts and the certificates in
// public/certificates show, without dates or counts.
export const education = [
  ['mai/2025 – dez/2027', 'Brigham Young University\u2011Idaho', 'Bacharelado em Desenvolvimento de Software (em andamento)', 'Online, pela BYU\u2011Pathway Worldwide.'],
  ['out/2025 – jul/2027', 'UFBRA', 'Tecnologia em Análise e Desenvolvimento de Sistemas (em andamento)'],
  ['em paralelo', 'DIO', 'Bootcamp de .NET e banco de dados MySQL, mais cursos de C# e de Git e GitHub', 'Trilhas práticas na dio.me.'],
  ['concluído em 15/08/2026', 'Brigham Young University\u2011Idaho', 'Certificate in Web & Computer Programming'],
  ['fev/2020 – nov/2022', 'ETEC Parque Belém', 'Técnico em Desenvolvimento de Sistemas'],
] as const;

// Official sites of the institutions above, the same in every locale (checked by the coordinator
// on 28/10/2026). Both BYU–Idaho entries go to BYU–Pathway, the online route of the degree.
export const institutionUrls: Readonly<Record<string, string>> = {
  'Brigham Young University\u2011Idaho': 'https://www.byupathway.edu/',
  UFBRA: 'https://ufbra.edu.br/',
  DIO: 'https://www.dio.me/',
  'ETEC Parque Belém': 'https://etecparquebelem.cps.sp.gov.br/',
};

// [name, code, level, proof?]. The proof under Español is claims-6b.md, Rodada 6C "Idiomas" (from the old L6).
export const languages = [
  ['Português', 'pt', 'nativo'],
  ['Español', 'es', 'fluente, de dois anos na Argentina', 'Treinei uma equipe na Argentina e fui tradutor em reuniões com clientes do México e da Colômbia.'],
  ['English', 'en', 'B2, certificado pela LingoPass'],
] as const;

// Dates only when a primary source shows them; links only where they exist. The four Credly
// badges were checked on their public pages (issued to "Gustavo Fragas" / "Gustavo Fragas Cunha").
export const credentials = [
  {
    id: 'aws-devops-pro',
    issuer: 'AWS',
    caption: 'AWS',
    name: 'AWS Certified DevOps Engineer – Professional',
    url: '',
    verifyUrl: 'https://www.credly.com/badges/6d2f8519-af06-4f89-a323-9d25c597f094',
    issued: 'out/2026',
    expires: 'out/2029',
    art: '/certificates/aws-devops-professional-460.webp',
    logo: false,
    date: '',
    proof: 'Automação de entrega e operação de sistemas na AWS, em nível profissional.',
  },
  {
    id: 'google-genai-leader',
    issuer: 'Google Cloud',
    caption: 'Google Cloud',
    name: 'Generative AI Leader',
    url: '',
    verifyUrl: 'https://www.credly.com/badges/b5e05fe8-aee5-4e49-9cb1-5b494e74cde9',
    issued: 'out/2026',
    expires: 'out/2029',
    art: '/certificates/google-generative-ai-leader-460.webp',
    logo: false,
    date: '',
    proof: 'Como a IA generativa gera valor para negócios usando o Google Cloud.',
  },
  {
    id: 'byu-idaho-web',
    issuer: 'BYU\u2011Idaho',
    caption: 'BYU\u2011Idaho',
    name: 'Certificate in Web & Computer Programming',
    url: '/certificates/byu-idaho-web-computer-programming.pdf',
    verifyUrl: '',
    issued: '',
    expires: '',
    // Official marks extracted from the certificates themselves (docs/pixel-wall/asset-sources.md).
    art: '/certificates/logos/byu-idaho-340.webp',
    logo: true,
    date: 'Concluído em 15/08/2026',
    proof: 'Programar para tarefas reais e criar sites e páginas dinâmicas com boas práticas.',
  },
  {
    id: 'notion-service-specialist',
    issuer: 'Notion',
    caption: 'Notion Specialist',
    name: 'Notion Service Specialist',
    url: '',
    verifyUrl: 'https://www.credly.com/badges/bdb75f61-1764-4ad0-8b8b-13778192f8fc',
    issued: 'abr/2026',
    expires: 'abr/2028',
    art: '/certificates/notion-service-specialist-460.webp',
    logo: false,
    date: '',
    // Paraphrased from the badge's official description on Credly.
    proof: 'Planejar, desenhar e entregar soluções no Notion que geram resultado para o negócio, da descoberta à adoção pelo time.',
  },
  {
    id: 'notion-admin',
    issuer: 'Notion',
    caption: 'Notion Admin',
    name: 'Notion Certified Admin',
    url: '',
    verifyUrl: 'https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946',
    issued: 'nov/2025',
    expires: 'nov/2027',
    art: '/certificates/notion-certified-admin-460.webp',
    logo: false,
    date: '',
    proof: 'Administração de workspaces Notion: acesso, segurança e organização.',
  },
  {
    id: 'lingopass-b2',
    issuer: 'LingoPass',
    caption: 'LingoPass',
    name: 'Inglês B2 Advanced',
    url: '/certificates/Lingopass certificate B2 Advanced.pdf',
    verifyUrl: '',
    issued: '',
    expires: '',
    art: '/certificates/logos/lingopass-440.webp',
    logo: true,
    date: '',
    proof: 'Inglês nível B2, intermediário avançado.',
  },
  {
    id: 'dio-git',
    issuer: 'DIO',
    caption: 'DIO',
    name: 'Versionamento de Código com Git e GitHub',
    url: '/certificates/Versionamento de Código com Git e GitHub.pdf',
    verifyUrl: '',
    issued: '',
    expires: '',
    art: '/certificates/logos/dio-440.webp',
    logo: true,
    date: '',
    proof: 'Curso de versionamento de código com Git e GitHub.',
  },
];
