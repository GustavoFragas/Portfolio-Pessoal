import {
  atsShot,
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
  /** Stable id per case, shared by the three locales (project diagrams are keyed by it). */
  key: 'modernization' | 'monitoring' | 'ats' | 'alerts' | 'integration' | 'tokenpulse';
  /** Short result line on top of the card (about six words), traceable to `result`/details. */
  headline: string;
  /** Visible qualifier shown next to the headline, when the claim needs one. */
  headlineNote?: string;
  title: string;
  label: string;
  what: string;
  problem: string;
  did: string;
  result: string;
  tags: readonly string[];
  decisions: readonly string[];
  validation: readonly string[];
  tools: readonly string[];
  caveat: string;
  link: string;
  /** Real screenshot of the project, shown in the details drawer when present. */
  shot?: { src: string; width: number; height: number; alt: string };
};

export type Credential = {
  id: string;
  issuer: string;
  caption: string;
  name: string;
  url: string;
  /** Public verification page (Credly), when there is one. */
  verifyUrl: string;
  /** Month the credential was issued and expires, already in the locale's format. */
  issued: string;
  expires: string;
  art: string;
  logo: boolean;
  date: string;
  proof: string;
};
type NavItem = { label: string; href: string };
/** [area, sentence, chips]: one chip per tool, named like the cases' `tools` when it is the same tool. */
export type Capability = readonly [string, string, readonly string[]];
/** [period, organization, role, notes, url, linkLabel?]: linkLabel overrides the generic accessible name. */
type ExperienceItem = readonly [string, string, string, readonly string[], string, string?];
/** [period, institution, program, detail?] */
type EducationItem = readonly [string, string, string, string?];
/** Something the Alest team did while I am part of it. `url`/`source` only when a public source exists. */
type TeamHighlight = { title: string; date: string; source?: string; url?: string };
/** One "Liderança na prática" line (Rodada 6C): the label is the role and what it was about (it says the
    role and the impact, never what was missing), then the context by sector (never a client), the period
    and one sentence. Text only from claims-6b.md, "Rodada 6C". */
type LeadershipLine = { role: string; scope: string; context: string; period: string; text: string };
/** A verified figure of the featured role, read as "4 devs": the number, then what it counts. */
type LeadershipFigure = { value: string; unit: string };
/** The featured role (claims-6b.md, "Destaque (F)"): label (role + scope), context, period, the figures
    strip ending in the approval seal, the three points F1–F3 and the link to its case on the projects
    rail (`key` goes to `data-project-key`, which Projects.tsx resolves to the card). */
type LeadershipFeature = {
  role: string;
  scope: string;
  context: string;
  period: string;
  figures: readonly LeadershipFigure[];
  seal: string;
  points: readonly string[];
  project: { key: CaseItem['key']; label: string };
};
/** The single approved testimonial, without a name. `translated` marks a translation of the Portuguese. */
type Testimonial = { quote: string; attribution: string; translated?: string };
type Leadership = { title: string; feature: LeadershipFeature; lines: readonly LeadershipLine[]; testimonial: Testimonial };
/** [name, code, level, proof?]: the proof is one line of evidence under the level (Español only). */
type LanguageItem = readonly [string, string, string, string?];

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

const ptLeadership: Leadership = {
  title: 'Liderança na prática',
  // Rodada 6C of claims-6b.md, literal: the featured role F (F1–F3) and the lines A–E, clients only by
  // sector. Line A is pre-sales: never said as an executed migration, no team size or hours. Line D is a
  // proposal, not a contract. Line E names no institution or religion.
  feature: {
    role: 'Líder técnico',
    scope: 'Modernização de um sistema financeiro',
    context: 'Construtora',
    period: 'jun–set/2026',
    figures: [
      { value: '4', unit: 'devs' },
      { value: '67', unit: 'cards revisados' },
    ],
    seal: 'plano aprovado sem ressalvas',
    points: [
      'Escrevi o plano de modernização que o cliente aprovou sem ressalvas e apresentei a metodologia e o board ao vivo para o cliente.',
      'Estruturei o time: onboarding técnico, regras do time, ordem das entregas e um check-in em que perguntei o que eu podia melhorar como líder.',
      'Como code owner, revisei os 67 cards do time e integrei as entregas na main.',
    ],
    project: { key: 'modernization', label: 'ver o projeto 01' },
  },
  lines: [
    { role: 'Líder técnico', scope: 'Migração Oracle → SQL Server', context: 'Construtora', period: 'out/2026–hoje', text: 'Conduzo a revisão técnica de escopo e prazo e o alinhamento direto com o cliente.' },
    { role: 'Padrões de engenharia', scope: 'Plataforma interna de IA', context: 'Produto interno', period: 'abr/2026–hoje', text: 'Escrevi o livro de engenharia, os ADRs e os runbooks do time e conduzo os releases.' },
    { role: 'Iniciativa própria', scope: 'Migração de integrações', context: 'Companhia aérea', period: '2026', text: 'Criei o padrão de documentação e o publicador de entregas, que viraram o modelo de trabalho do time.' },
    { role: 'Arquitetura da proposta', scope: 'Portal + app', context: 'Companhia aérea', period: 'out/2026', text: 'Desenhei a arquitetura e escrevi a proposta técnica de um portal web + app em React Native, com uma versão executiva para quem decide.' },
    { role: 'Liderança de pessoas', scope: 'Programa voluntário internacional', context: 'Argentina', period: '2023–2025', text: 'Liderei mais de 70 voluntários numa equipe multicultural.' },
  ],
  // Approved literally (Rodada 6B): no name, email, project or client.
  testimonial: {
    quote: 'É o padrão que eu espero de quem lidera execução técnica — e você entrega isso com consistência.',
    attribution: 'gestor na Alest · jul/2026',
  },
};

const ptUi = {
  meta: {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    siteName: 'Portfólio de Gustavo Fragas Cunha',
    title: 'Gustavo Fragas Cunha | Desenvolvedor Pleno',
    description: 'Oi, eu sou o Gustavo: desenvolvedor pleno em São Paulo. Backend, APIs, integrações e AWS, com DevOps como próximo passo.',
    socialDescription: 'Backend, APIs e integrações com C#/.NET, TypeScript e AWS. Cases anonimizados, contados do jeito que aconteceram.',
    socialImageAlt: 'Gustavo Fragas Cunha em mosaico de azulejos rosa e azul-escuro, com o nome em destaque e as credenciais AWS, Google Cloud e BYU–Idaho.',
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
    menu: 'Menu',
    close: 'Fechar',
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
    credsLabel: 'Certificações',
    credsMore: 'Ver todas as credenciais',
    creds: [
      { art: '/certificates/aws-devops-professional-460.webp', logo: false, title: 'AWS Certified DevOps Engineer', sub: 'Professional', short: 'AWS DevOps Pro' },
      { art: '/certificates/google-generative-ai-leader-460.webp', logo: false, title: 'Google Cloud', sub: 'Generative AI Leader', short: 'GenAI Leader' },
      { art: '/certificates/logos/byu-idaho-340.webp', logo: true, title: 'BYU\u2011Idaho', sub: 'Certificado em Web & Computer Programming', short: 'BYU\u2011Idaho' },
    ],
  },
  about: {
    title: 'Curioso por natureza. Dev por escolha.',
    paragraphs: [
      'Entrei na Alest como estagiário em outubro de 2025 e virei pleno em 2026. Antes disso, passei dois anos na Argentina em serviço voluntário — daí o espanhol fluente.',
      'Gosto de entender como as peças se conectam. No dia a dia trabalho com backend, integrações e automação, e uso agentes de IA, sempre com revisão humana, para aprender mais rápido com o que construo.',
    ],
    // These words of the first paragraph become a discreet link (same site as the Argentina entry).
    volunteer: {
      text: 'serviço voluntário',
      href: 'https://www.churchofjesuschrist.org/?lang=por',
      label: 'serviço voluntário — site da Igreja de Jesus Cristo dos Santos dos Últimos Dias (abre em nova guia)',
    },
    facts: [
      ['Base', 'São Paulo'],
      ['Idiomas', 'português, espanhol e inglês'],
      ['Estudando', 'duas graduações (BYU\u2011Idaho e UFBRA) + DIO'],
    ],
  },
  projects: {
    kicker: 'Projetos',
    title: 'Coisas que eu construí',
    intro: 'Quatro cases do trabalho, anonimizados, e dois projetos pessoais.',
    problem: 'Problema',
    did: 'O que eu fiz',
    result: 'Resultado',
    details: 'Detalhes técnicos',
    decisions: 'Decisões',
    validated: 'Como validei',
    tools: 'Ferramentas',
    tags: 'Temas',
    repository: 'Ver repositório',
    newTab: 'abre em nova guia',
    progress: 'Progresso pelos projetos',
    railHint: 'Continue rolando para ver os próximos.',
    swipeHint: 'Deslize para o lado para ver os próximos.',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    close: 'Fechar',
  },
  experience: {
    // The section's H2 (no kicker: it already says what the section is). out/2025 (intern) → out/2026
    // (mid-level), the same dates as the climb. No-break space/hyphen keep "12 meses" (and
    // "mid-level", "semi senior") on one line.
    title: 'De estagiário a pleno em 12\u00a0meses',
    openOfficialSite: 'abrir site oficial em nova guia',
    current: 'cargo atual',
    climbLabel: 'Na Alest',
    climb: [['Estagiário', 'out/2025'], ['Júnior', 'mar/2026'], ['Pleno', 'out/2026']],
    beforeLabel: 'Antes da Alest',
    teamLead: 'Com o time da Alest:',
    sourceLabel: 'fonte',
    // What the Alest team did while I am part of it. `url`/`source` only with a public source.
    teamHighlights: [
      // 6th monday.com Partner Summit. Also reported by ChannelLife:
      // https://channellife.news/story/monday-com-boosts-ai-first-partner-drive-with-new-perks
      { title: 'monday.com Partner of the Year — LATAM', date: 'fev/2026', source: 'Business Wire', url: 'https://www.businesswire.com/news/home/20260217722947/en/monday.com-Reinforces-AI-First-Work-Platform-With-Expanded-Partner-Program' },
      // Sources: public LinkedIn post by Zoom's Head of Brazil and South America, and Alest's internal
      // news of 01/10/2026. No stable public article, so no link. Not an award: never call it one.
      { title: 'case GOL + Zoom Contact Center apresentado no CONAREC 2026', date: 'set/2026' },
    ] satisfies TeamHighlight[],
    leadership: ptLeadership,
    newTab: 'abre em nova guia',
  },
  skills: {
    title: 'Com o que eu trabalho',
    intro: 'O que eu uso no trabalho e nos meus projetos.',
  },
  education: {
    title: 'Ainda estudando',
    lead: 'Faço duas graduações ao mesmo tempo — uma na BYU\u2011Idaho (online) e outra na UFBRA — e complemento com as trilhas da DIO.',
    languagesKicker: 'Idiomas',
    languagesTitle: 'Falo três línguas',
  },
  certificates: {
    kicker: 'Credenciais',
    title: 'Aprender também faz parte do trabalho',
    hintPointer: 'Passe o mouse para inclinar, arraste para girar e clique para virar e verificar.',
    hintTouch: 'Arraste para girar, toque para virar e verificar.',
    hintReduced: 'Clique ou use Tab para virar e verificar.',
    hintReducedTouch: 'Toque para virar e verificar.',
    flip: 'Virar credencial',
    open: 'Ver credencial',
    openPdf: 'Ver certificado (PDF)',
    issuedBy: 'Emitida por',
    badge: 'Selo',
    issuedOn: 'Emitida em',
    validUntil: 'válida até',
    verify: 'Verificar no Credly',
    newTab: 'abre em nova guia',
    proves: 'O que comprova',
  },
  contact: {
    title: 'Bora conversar?',
    description: 'Tem um projeto, uma vaga ou uma ideia? Me chama por onde for mais fácil.',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    // Accessible name of "▲ START": starts with the visible word (WCAG 2.5.3) and says what it does.
    startLabel: 'Start — voltar ao topo',
    place: 'Player 1 · São Paulo',
    navLabel: 'Rodapé',
    navigate: 'Navegar',
    contact: 'Contato',
    start: 'Start',
    newTab: 'abre em nova guia',
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
    socialImageAlt: 'Gustavo Fragas Cunha as a mosaic of pink and dark blue tiles, with his name up front and his AWS, Google Cloud and BYU–Idaho credentials.',
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
    menu: 'Menu',
    close: 'Close',
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
    credsLabel: 'Certifications',
    credsMore: 'See all credentials',
    creds: [
      { art: '/certificates/aws-devops-professional-460.webp', logo: false, title: 'AWS Certified DevOps Engineer', sub: 'Professional', short: 'AWS DevOps Pro' },
      { art: '/certificates/google-generative-ai-leader-460.webp', logo: false, title: 'Google Cloud', sub: 'Generative AI Leader', short: 'GenAI Leader' },
      { art: '/certificates/logos/byu-idaho-340.webp', logo: true, title: 'BYU\u2011Idaho', sub: 'Certificate in Web & Computer Programming', short: 'BYU\u2011Idaho' },
    ],
  },
  about: {
    title: 'Curious by nature. Developer by choice.',
    paragraphs: [
      'I joined Alest as an intern in October 2025 and became a mid-level developer in 2026. Before that, I spent two years in Argentina doing volunteer service — that’s where my fluent Spanish comes from.',
      'I like understanding how the pieces connect. Day to day I work on backend, integrations and automation, and I use AI agents, always with human review, to learn faster from what I build.',
    ],
    volunteer: {
      text: 'volunteer service',
      href: 'https://www.churchofjesuschrist.org/?lang=eng',
      label: 'volunteer service — website of The Church of Jesus Christ of Latter-day Saints (opens in a new tab)',
    },
    facts: [
      ['Based in', 'São Paulo'],
      ['Languages', 'Portuguese, Spanish and English'],
      ['Studying', 'two degrees (BYU\u2011Idaho and UFBRA) + DIO'],
    ],
  },
  projects: {
    kicker: 'Projects',
    title: 'Things I’ve built',
    intro: 'Four work cases, anonymized, and two personal projects.',
    problem: 'Problem',
    did: 'What I did',
    result: 'Result',
    details: 'Technical details',
    decisions: 'Decisions',
    validated: 'How I validated it',
    tools: 'Tools',
    tags: 'Topics',
    repository: 'View repository',
    newTab: 'opens in a new tab',
    progress: 'Progress through the projects',
    railHint: 'Keep scrolling to see the next ones.',
    swipeHint: 'Swipe sideways to see the next ones.',
    previous: 'Previous project',
    next: 'Next project',
    close: 'Close',
  },
  experience: {
    title: 'From intern to mid\u2011level in 12\u00a0months',
    openOfficialSite: 'open official website in a new tab',
    current: 'current role',
    climbLabel: 'At Alest',
    climb: [['Intern', 'Oct 2025'], ['Junior', 'Mar 2026'], ['Mid-level', 'Oct 2026']],
    beforeLabel: 'Before Alest',
    teamLead: 'With the Alest team:',
    sourceLabel: 'source',
    teamHighlights: [
      { title: 'monday.com Partner of the Year — LATAM', date: 'Feb 2026', source: 'Business Wire', url: 'https://www.businesswire.com/news/home/20260217722947/en/monday.com-Reinforces-AI-First-Work-Platform-With-Expanded-Partner-Program' },
      { title: 'GOL + Zoom Contact Center case presented at CONAREC 2026', date: 'Sep 2026' },
    ],
    leadership: {
      title: 'Leadership in practice',
      feature: {
        role: 'Tech lead',
        scope: 'Modernization of a financial system',
        context: 'Construction company',
        period: 'Jun–Sep\u00a02026',
        figures: [
          { value: '4', unit: 'devs' },
          { value: '67', unit: 'cards reviewed' },
        ],
        seal: 'plan approved with no reservations',
        points: [
          'I wrote the modernization plan the client approved with no reservations, and presented the methodology and the board live to the client.',
          'I structured the team: technical onboarding, team rules, the order of deliveries and a check-in where I asked what I could improve as a leader.',
          'As code owner, I reviewed the team’s 67 cards and merged the deliveries into main.',
        ],
        project: { key: 'modernization', label: 'see project 01' },
      },
      lines: [
        { role: 'Tech lead', scope: 'Oracle → SQL Server migration', context: 'Construction company', period: 'Oct\u00a02026–now', text: 'I lead the technical review of scope and timeline and the direct alignment with the client.' },
        { role: 'Engineering standards', scope: 'Internal AI platform', context: 'Internal product', period: 'Apr\u00a02026–now', text: 'I wrote the team’s engineering book, ADRs and runbooks, and I run the releases.' },
        { role: 'Own initiative', scope: 'Integration migration', context: 'Airline', period: '2026', text: 'I created the documentation standard and the delivery publisher, which became the team’s way of working.' },
        { role: 'Proposal architecture', scope: 'Portal + app', context: 'Airline', period: 'Oct\u00a02026', text: 'I designed the architecture and wrote the technical proposal for a web portal + React Native app, with an executive version for decision-makers.' },
        { role: 'People leadership', scope: 'International volunteer program', context: 'Argentina', period: '2023–2025', text: 'I led more than 70 volunteers in a multicultural team.' },
      ],
      testimonial: {
        quote: 'It’s the standard I expect from whoever leads technical execution — and you deliver it consistently.',
        attribution: 'manager at Alest · Jul 2026',
        translated: 'translated from Portuguese',
      },
    },
    newTab: 'opens in a new tab',
  },
  skills: {
    title: 'What I work with',
    intro: 'What I use at work and in my own projects.',
  },
  education: {
    title: 'Still studying',
    lead: 'I’m doing two degrees at the same time — one at BYU\u2011Idaho (online) and one at UFBRA — and I add DIO tracks on top.',
    languagesKicker: 'Languages',
    languagesTitle: 'I speak three languages',
  },
  certificates: {
    kicker: 'Credentials',
    title: 'Learning is part of the job',
    hintPointer: 'Hover to tilt, drag to spin, click to flip and verify.',
    hintTouch: 'Drag to spin, tap to flip and verify.',
    hintReduced: 'Click or press Tab to flip and verify.',
    hintReducedTouch: 'Tap to flip and verify.',
    flip: 'Flip credential',
    open: 'View credential',
    openPdf: 'View certificate (PDF)',
    issuedBy: 'Issued by',
    badge: 'Badge',
    issuedOn: 'Issued',
    validUntil: 'valid until',
    verify: 'Verify on Credly',
    newTab: 'opens in a new tab',
    proves: 'What it proves',
  },
  contact: {
    title: 'Let’s talk.',
    description: 'Got a project, a role or an idea? Reach me wherever is easiest for you.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    startLabel: 'Start — back to top',
    place: 'Player 1 · São Paulo',
    navLabel: 'Footer',
    navigate: 'Navigate',
    contact: 'Contact',
    start: 'Start',
    newTab: 'opens in a new tab',
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
    socialImageAlt: 'Gustavo Fragas Cunha en un mosaico de azulejos rosa y azul oscuro, con su nombre destacado y sus credenciales de AWS, Google Cloud y BYU–Idaho.',
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
    menu: 'Menú',
    close: 'Cerrar',
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
    credsLabel: 'Certificaciones',
    credsMore: 'Ver todas las credenciales',
    creds: [
      { art: '/certificates/aws-devops-professional-460.webp', logo: false, title: 'AWS Certified DevOps Engineer', sub: 'Professional', short: 'AWS DevOps Pro' },
      { art: '/certificates/google-generative-ai-leader-460.webp', logo: false, title: 'Google Cloud', sub: 'Generative AI Leader', short: 'GenAI Leader' },
      { art: '/certificates/logos/byu-idaho-340.webp', logo: true, title: 'BYU\u2011Idaho', sub: 'Certificado en Web & Computer Programming', short: 'BYU\u2011Idaho' },
    ],
  },
  about: {
    title: 'Curioso por naturaleza. Desarrollador por elección.',
    paragraphs: [
      'Entré a Alest como pasante en octubre de 2025 y en 2026 pasé a semi senior. Antes viví dos años en Argentina haciendo servicio voluntario — de ahí mi español fluido.',
      'Me gusta entender cómo se conectan las piezas. En el día a día trabajo con backend, integraciones y automatización, y uso agentes de IA, siempre con revisión humana, para aprender más rápido de lo que construyo.',
    ],
    volunteer: {
      text: 'servicio voluntario',
      href: 'https://www.churchofjesuschrist.org/?lang=spa',
      label: 'servicio voluntario — sitio de La Iglesia de Jesucristo de los Santos de los Últimos Días (se abre en una pestaña nueva)',
    },
    facts: [
      ['Base', 'São Paulo'],
      ['Idiomas', 'portugués, español e inglés'],
      ['Estudiando', 'dos carreras (BYU\u2011Idaho y UFBRA) + DIO'],
    ],
  },
  projects: {
    kicker: 'Proyectos',
    title: 'Cosas que construí',
    intro: 'Cuatro casos del trabajo, anonimizados, y dos proyectos personales.',
    problem: 'Problema',
    did: 'Qué hice',
    result: 'Resultado',
    details: 'Detalles técnicos',
    decisions: 'Decisiones',
    validated: 'Cómo lo validé',
    tools: 'Herramientas',
    tags: 'Temas',
    repository: 'Ver repositorio',
    newTab: 'se abre en una pestaña nueva',
    progress: 'Progreso por los proyectos',
    railHint: 'Sigue bajando para ver los siguientes.',
    swipeHint: 'Desliza hacia el costado para ver los siguientes.',
    previous: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    close: 'Cerrar',
  },
  experience: {
    title: 'De pasante a semi\u00a0senior en 12\u00a0meses',
    openOfficialSite: 'abrir sitio oficial en una pestaña nueva',
    current: 'cargo actual',
    climbLabel: 'En Alest',
    climb: [['Pasante', 'oct. 2025'], ['Junior', 'mar. 2026'], ['Semi Senior', 'oct. 2026']],
    beforeLabel: 'Antes de Alest',
    teamLead: 'Con el equipo de Alest:',
    sourceLabel: 'fuente',
    teamHighlights: [
      { title: 'monday.com Partner of the Year — LATAM', date: 'feb. 2026', source: 'Business Wire', url: 'https://www.businesswire.com/news/home/20260217722947/en/monday.com-Reinforces-AI-First-Work-Platform-With-Expanded-Partner-Program' },
      { title: 'caso GOL + Zoom Contact Center presentado en CONAREC 2026', date: 'sep. 2026' },
    ],
    leadership: {
      title: 'Liderazgo en la práctica',
      feature: {
        role: 'Líder técnico',
        scope: 'Modernización de un sistema financiero',
        context: 'Constructora',
        period: 'jun.–sep.\u00a02026',
        figures: [
          { value: '4', unit: 'devs' },
          { value: '67', unit: 'tarjetas revisadas' },
        ],
        seal: 'plan aprobado sin reservas',
        points: [
          'Escribí el plan de modernización que el cliente aprobó sin reservas y presenté la metodología y el board en vivo al cliente.',
          'Estructuré el equipo: onboarding técnico, reglas del equipo, orden de las entregas y un check-in en el que pregunté qué podía mejorar como líder.',
          'Como code owner, revisé las 67 tarjetas del equipo e integré las entregas en main.',
        ],
        project: { key: 'modernization', label: 'ver el proyecto 01' },
      },
      lines: [
        { role: 'Líder técnico', scope: 'Migración Oracle → SQL Server', context: 'Constructora', period: 'oct.\u00a02026–hoy', text: 'Conduzco la revisión técnica de alcance y plazo y la alineación directa con el cliente.' },
        { role: 'Estándares de ingeniería', scope: 'Plataforma interna de IA', context: 'Producto interno', period: 'abr.\u00a02026–hoy', text: 'Escribí el libro de ingeniería, los ADR y los runbooks del equipo y conduzco los releases.' },
        { role: 'Iniciativa propia', scope: 'Migración de integraciones', context: 'Aerolínea', period: '2026', text: 'Creé el estándar de documentación y el publicador de entregas, que se convirtieron en el modelo de trabajo del equipo.' },
        { role: 'Arquitectura de la propuesta', scope: 'Portal + app', context: 'Aerolínea', period: 'oct.\u00a02026', text: 'Diseñé la arquitectura y escribí la propuesta técnica de un portal web + app en React Native, con una versión ejecutiva para quienes deciden.' },
        { role: 'Liderazgo de personas', scope: 'Programa de voluntariado internacional', context: 'Argentina', period: '2023–2025', text: 'Lideré a más de 70 voluntarios en un equipo multicultural.' },
      ],
      testimonial: {
        quote: 'Es el estándar que espero de quien lidera la ejecución técnica — y tú lo entregas con consistencia.',
        attribution: 'gerente en Alest · jul. 2026',
        translated: 'traducido del portugués',
      },
    },
    newTab: 'se abre en una pestaña nueva',
  },
  skills: {
    title: 'Con qué trabajo',
    intro: 'Lo que uso en el trabajo y en mis proyectos.',
  },
  education: {
    title: 'Sigo estudiando',
    lead: 'Curso dos carreras al mismo tiempo — una en BYU\u2011Idaho (en línea) y otra en UFBRA — y las complemento con las rutas de DIO.',
    languagesKicker: 'Idiomas',
    languagesTitle: 'Hablo tres idiomas',
  },
  certificates: {
    kicker: 'Credenciales',
    title: 'Aprender también es parte del trabajo',
    hintPointer: 'Pasa el mouse para inclinar, arrastra para girar y haz clic para voltear y verificar.',
    hintTouch: 'Arrastra para girar, toca para voltear y verificar.',
    hintReduced: 'Haz clic o usa Tab para voltear y verificar.',
    hintReducedTouch: 'Toca para voltear y verificar.',
    flip: 'Girar credencial',
    open: 'Ver credencial',
    openPdf: 'Ver certificado (PDF)',
    issuedBy: 'Emitida por',
    badge: 'Insignia',
    issuedOn: 'Emitida en',
    validUntil: 'válida hasta',
    verify: 'Verificar en Credly',
    newTab: 'se abre en una pestaña nueva',
    proves: 'Qué acredita',
  },
  contact: {
    title: '¿Hablamos?',
    description: '¿Tienes un proyecto, una vacante o una idea? Escríbeme por donde te quede más cómodo.',
    email: 'Correo',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    startLabel: 'Start — volver arriba',
    place: 'Player 1 · São Paulo',
    navLabel: 'Pie de página',
    navigate: 'Navegar',
    contact: 'Contacto',
    start: 'Start',
    newTab: 'se abre en una pestaña nueva',
  },
};

const enCases: CaseItem[] = [
  {
    key: 'modernization',
    headline: 'Plan approved by the client with no reservations',
    title: 'Modernization with a team',
    label: 'Work case, anonymized',
    what: 'Modernizing a system that defines who approves payments and up to what amount, at a construction company.',
    problem: 'The stack was out of support (Java EE 5, AngularJS 1.6, WebLogic 11g, no foreign keys), and switching from per-person to per-role approval limits touches about 80% of the model.',
    did: 'I counted the real scope (156 endpoints, 47 entities, 111 tables and 99 PL/SQL objects), designed a modular monolith in Java 21 + Jakarta EE with Strangler Fig and an anti-corruption layer for the ERPs, and coordinated 4 devs with a PR template, review in rounds and a single merge gate.',
    result: 'Plan validated by the client with no reservations (Jul 2026) and work on the technical foundation started.',
    tags: ['Technical leadership', 'Java', 'Architecture'],
    decisions: [],
    validation: [
      'Plan validated by the client with no reservations (Jul 2026).',
      'CI on the PR: build, ArchUnit and secret scanning.',
      'Review of all 67 cards and post-merge certification.',
    ],
    tools: ['Java 21', 'Jakarta EE', 'Strangler Fig', 'ArchUnit', 'PL/SQL'],
    caveat: 'Anonymized for confidentiality: the client appears only by sector.',
    link: '',
  },
  {
    key: 'monitoring',
    headline: 'One source fails, the dashboard stays up',
    title: 'Internal AI adoption platform',
    label: 'Work case, anonymized',
    what: 'An internal dashboard that brings together 8 to 10 activity sources (calendars, Notion, monday, Gmail, Drive, Claude/Codex) so leadership can see the adoption of tools and AI by department.',
    problem: 'When Redis maxed out, the dashboard could not lose the last intact data set.',
    did: 'I was the main author: 399 of 483 commits, the releases, the ADRs, the runbooks and the team’s engineering book. The platform includes the AI usage collector that runs on the team’s Macs, with a durable outbox, idempotency and a canary rollout with rollback.',
    result: 'The S3 snapshot kept the last intact set, and the dashboard stayed up.',
    tags: ['AWS', 'Data', 'Backend'],
    decisions: [],
    validation: [
      'Tests with Vitest and Playwright.',
      'Canary rollout of the collector, with rollback.',
      'Decisions recorded in ADRs and operations described in runbooks.',
    ],
    tools: ['React 19', 'TypeScript', 'Node/Express', 'Notion API', 'Redis (Upstash)', 'S3', 'Google OAuth', 'AWS App Runner', 'Amplify', 'Vitest', 'Playwright'],
    caveat: 'Anonymized for confidentiality: no personal data or internal details.',
    link: '',
  },
  {
    key: 'ats',
    headline: 'Only suggests what is true',
    title: 'Résumé and job post matcher',
    label: 'Personal project',
    what: 'A tool that shows how well a résumé fits a job post, without inventing experience.',
    problem: 'AI tools tend to “pad” résumés with things the person never did.',
    did: 'I defined the problem, the user experience and the rules so the AI only suggests what is true, and tested it with real data. Part of the code was AI-assisted.',
    result: 'Suggestions that respect the real background, always reviewed by a person before being accepted.',
    tags: ['AI', 'React'],
    decisions: [],
    validation: ['Tests with real data.', 'Manual review of the suggestions.', 'Acceptance criteria that block invented experience.'],
    tools: ['React', 'TypeScript', '.NET', 'PDF parsing', 'AI-assisted LLM'],
    caveat: '',
    link: 'https://github.com/GustavoFragas/ats-optimizer',
    shot: {
      ...atsShot,
      alt: 'ATS Optimizer upload screen (interface in Portuguese), in dark mode: drop zones for the résumé and the LinkedIn profile as PDFs, a field to paste the job description, an option to attach a photo of the job post and an optional company URL field.',
    },
  },
  {
    key: 'alerts',
    headline: 'Failed? Retried later, without freezing the system',
    title: 'Automatic notices between systems',
    label: 'Work case, anonymized',
    what: 'A service that tells other systems when something happens, without keeping the main system waiting.',
    problem: 'A failed notice could not freeze the main system or leak sensitive data into the logs.',
    did: 'Together with the tech lead, I documented and evolved the service: notices go through a queue, sensitive data is masked in the logs and errors are handled one consistent way.',
    result: 'The main system answers right away; notices move through the queue and, if they fail, are set aside to be retried.',
    tags: ['Backend', 'APIs', 'Queues'],
    decisions: ['FIFO queue to keep ordering and deduplication compatible with the contract.'],
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
    key: 'integration',
    headline: 'up\u00a0to\u00a060\u00a0s → <\u00a02\u00a0s',
    headlineNote: 'in a controlled local test',
    title: 'Two tools, same information',
    label: 'Work case, anonymized',
    what: 'An integration that keeps the same data in two platforms the team uses every day.',
    problem: 'Updating one and forgetting the other left information out of sync, and careless syncing creates an endless back-and-forth.',
    did: 'I wrote the integration in both directions, with a guard that stops one update from triggering the other forever. I used AI with human review.',
    result: 'Both platforms stay aligned. In a controlled local test, updates went from up to 60 s to under 2 s.',
    tags: ['Integration', 'Automation', 'TypeScript'],
    decisions: [
      'Identifiers normalized before comparing.',
      'A record of recent syncs to stop webhook ping-pong.',
      'Data transformation kept separate from writes to each API.',
    ],
    validation: ['Local validation of both sync directions.', 'Measured in a controlled local test (up to 60 s → under 2 s).'],
    tools: ['TypeScript', 'Node.js', 'webhooks', 'Notion API', 'Monday API'],
    caveat: 'Controlled local test number; not a latency guarantee outside the test.',
    link: '',
  },
  {
    key: 'tokenpulse',
    headline: 'Local files only, no network',
    title: 'Codex and Claude Code in the notch',
    label: 'Personal project',
    what: 'A native macOS app that shows Codex and Claude Code usage in the notch, and which chats are active.',
    problem: 'Showing that usage without going to the network and without keeping message content.',
    did: 'I built the app in Swift, reading local files only: the JSONL files and the usage cache.',
    result: 'Usage and active chats stay in view in the notch, with no network calls at all.',
    tags: ['macOS', 'Swift'],
    decisions: [],
    validation: [],
    tools: ['Swift', 'macOS', 'JSONL'],
    caveat: 'Private repository, so no link.',
    link: '',
  },
];

const esCases: CaseItem[] = [
  {
    key: 'modernization',
    headline: 'Plan aprobado por el cliente sin reservas',
    title: 'Modernización con un equipo',
    label: 'Caso del trabajo, anonimizado',
    what: 'La modernización de un sistema que define quién aprueba pagos y hasta qué monto, en una constructora.',
    problem: 'La stack estaba fuera de soporte (Java EE 5, AngularJS 1.6, WebLogic 11g, sin claves foráneas), y pasar de niveles de aprobación por persona a niveles por cargo toca cerca del 80% del modelo.',
    did: 'Conté el alcance real (156 endpoints, 47 entidades, 111 tablas y 99 objetos PL/SQL), diseñé un monolito modular en Java 21 + Jakarta EE con Strangler Fig y una capa anticorrupción para los ERP, y coordiné a 4 devs con plantilla de PR, revisión por rondas y merge único.',
    result: 'Plan validado por el cliente sin reservas (jul. 2026) y base técnica iniciada.',
    tags: ['Liderazgo técnico', 'Java', 'Arquitectura'],
    decisions: [],
    validation: [
      'Plan validado por el cliente sin reservas (jul. 2026).',
      'CI en el PR: build, ArchUnit y escaneo de secretos.',
      'Revisión de las 67 tarjetas y certificación posterior al merge.',
    ],
    tools: ['Java 21', 'Jakarta EE', 'Strangler Fig', 'ArchUnit', 'PL/SQL'],
    caveat: 'Anonimizado por confidencialidad: el cliente aparece solo por el sector.',
    link: '',
  },
  {
    key: 'monitoring',
    headline: 'Cae una fuente, el panel sigue en pie',
    title: 'Plataforma interna de adopción de IA',
    label: 'Caso del trabajo, anonimizado',
    what: 'Un panel interno que reúne de 8 a 10 fuentes de actividad (agendas, Notion, monday, Gmail, Drive, Claude/Codex) para que el liderazgo vea la adopción de herramientas e IA por sector.',
    problem: 'Cuando Redis se saturó, el panel no podía perder el último conjunto de datos íntegro.',
    did: 'Fui el autor principal: 399 de 483 commits, los releases, los ADR, los runbooks y el libro de ingeniería del equipo. La plataforma incluye el recolector de uso de IA que corre en las Mac del equipo, con outbox durable, idempotencia y rollout canario con rollback.',
    result: 'El snapshot en S3 mantuvo el último conjunto íntegro, y el panel siguió en pie.',
    tags: ['AWS', 'Datos', 'Backend'],
    decisions: [],
    validation: [
      'Pruebas con Vitest y Playwright.',
      'Rollout canario del recolector, con rollback.',
      'Decisiones registradas en ADR y operación descrita en runbooks.',
    ],
    tools: ['React 19', 'TypeScript', 'Node/Express', 'Notion API', 'Redis (Upstash)', 'S3', 'Google OAuth', 'AWS App Runner', 'Amplify', 'Vitest', 'Playwright'],
    caveat: 'Anonimizado por confidencialidad: sin datos de personas ni detalles internos.',
    link: '',
  },
  {
    key: 'ats',
    headline: 'Solo sugiere lo que es verdad',
    title: 'Comparador de currículum y vacante',
    label: 'Proyecto personal',
    what: 'Una herramienta que muestra qué tan bien encaja un currículum con una vacante, sin inventar experiencia.',
    problem: 'Las herramientas de IA suelen “adornar” el currículum con cosas que la persona no hizo.',
    did: 'Definí el problema, la experiencia de uso y las reglas para que la IA solo sugiera lo que es verdad, y lo probé con datos reales. Parte del código tuvo asistencia de IA.',
    result: 'Sugerencias que respetan la trayectoria real, siempre revisadas por una persona antes de aceptarlas.',
    tags: ['IA', 'React'],
    decisions: [],
    validation: ['Pruebas con datos reales.', 'Revisión manual de las sugerencias.', 'Criterios de aceptación para no inventar experiencia.'],
    tools: ['React', 'TypeScript', '.NET', 'lectura de PDF', 'LLM asistido'],
    caveat: '',
    link: 'https://github.com/GustavoFragas/ats-optimizer',
    shot: {
      ...atsShot,
      alt: 'Pantalla de carga del ATS Optimizer (interfaz en portugués), en modo oscuro: áreas para subir el currículum y el perfil de LinkedIn en PDF, un campo para pegar la descripción de la vacante, la opción de adjuntar una foto de la vacante y un campo opcional con la URL de la empresa.',
    },
  },
  {
    key: 'alerts',
    headline: '¿Falló? Nuevo intento, sin trabar el sistema',
    title: 'Avisos automáticos entre sistemas',
    label: 'Caso del trabajo, anonimizado',
    what: 'Un servicio que avisa a otros sistemas cuando algo pasa, sin dejar esperando al sistema principal.',
    problem: 'Un aviso que fallara no podía trabar el sistema principal ni exponer datos sensibles en los registros.',
    did: 'Junto con el líder técnico, documenté y evolucioné el servicio: los avisos pasan por una cola, los datos sensibles quedan enmascarados en los registros y los errores tienen un manejo único.',
    result: 'El sistema principal responde al instante; los avisos siguen por la cola y, si fallan, quedan aparte para reintentarlos.',
    tags: ['Backend', 'APIs', 'Colas'],
    decisions: ['Cola FIFO para mantener orden y deduplicación compatibles con el contrato.'],
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
    key: 'integration',
    headline: 'hasta\u00a060\u00a0s → <\u00a02\u00a0s',
    headlineNote: 'en una prueba local controlada',
    title: 'Dos herramientas con la misma información',
    label: 'Caso del trabajo, anonimizado',
    what: 'Una integración que mantiene los mismos datos en dos plataformas que el equipo usa a diario.',
    problem: 'Actualizar una y olvidar la otra dejaba la información desfasada, y sincronizar sin cuidado genera un ida y vuelta sin fin.',
    did: 'Escribí la integración en ambos sentidos, con un freno que impide que una actualización dispare la otra sin parar. Usé IA con revisión humana.',
    result: 'Las dos plataformas quedan alineadas. En una prueba local controlada, la actualización bajó de hasta 60 s a menos de 2 s.',
    tags: ['Integración', 'Automatización', 'TypeScript'],
    decisions: [
      'Identificadores normalizados antes de comparar.',
      'Registro de las sincronizaciones recientes para cortar el ping-pong entre webhooks.',
      'Transformación de datos separada de la escritura en cada API.',
    ],
    validation: ['Validación local de ambos sentidos de la sincronización.', 'Medición en una prueba local controlada (hasta 60 s → menos de 2 s).'],
    tools: ['TypeScript', 'Node.js', 'webhooks', 'Notion API', 'Monday API'],
    caveat: 'Número de una prueba local controlada; no es garantía de latencia fuera de la prueba.',
    link: '',
  },
  {
    key: 'tokenpulse',
    headline: 'Solo archivos locales, sin red',
    title: 'Codex y Claude Code en el notch',
    label: 'Proyecto personal',
    what: 'Una app nativa de macOS que muestra en el notch el consumo de Codex y Claude Code y qué chats están activos.',
    problem: 'Mostrar ese consumo sin acceder a la red y sin guardar el contenido de los mensajes.',
    did: 'Hice la app en Swift leyendo solo archivos locales: los JSONL y la caché de uso.',
    result: 'El consumo y los chats activos quedan a la vista en el notch, sin ninguna llamada de red.',
    tags: ['macOS', 'Swift'],
    decisions: [],
    validation: [],
    tools: ['Swift', 'macOS', 'JSONL'],
    caveat: 'Repositorio privado, por eso sin enlace.',
    link: '',
  },
];

// Same chips as portfolioContent.ts; only the generic ones are translated, and "REST API" follows the
// English case 04 `tools`.
const enCapabilities: Capability[] = [
  ['Backend, APIs and apps', 'Services, endpoints and integrations built with the contract, the validation and the next maintainer in mind.', ['C#', '.NET', 'ASP.NET Core', 'REST API', 'TypeScript', 'Node.js', 'Java 21', 'Jakarta EE', 'React', 'Swift']],
  ['SaaS integrations', 'Routines that connect Notion, Datadog, DocuSign CLM and other APIs, with error handling and per-source tracing.', ['Notion API', 'Datadog', 'DocuSign CLM', 'webhooks', 'EventBridge']],
  ['Data', 'Deduplication, freshness, backfill and reconciliation: data arriving right before it turns into a dashboard.', ['SQL', 'Athena', 'S3', 'QuickSight', 'Oracle', 'PL/SQL']],
  ['AWS and delivery', 'I shipped a frontend on Amplify, and I use or have reviewed workloads on App Runner, Lambda, S3 and SQS.', ['Amplify', 'Lambda', 'S3', 'SQS', 'DLQ', 'AWS App Runner', 'GitHub Actions', 'Docker']],
  ['Testing and observability', 'I test the scenarios that matter locally before anything goes to acceptance testing.', ['Datadog', 'Sonar', 'Gitleaks', 'integration tests']],
  ['Engineering with agents', 'Agent chains, MCPs and Learning Loop to split context and review work. Scope, code, tests and the final call stay with me.', ['Claude Code', 'Codex', 'Kiro', 'MCP', 'Learning Loop']],
];

const esCapabilities: Capability[] = [
  ['Backend, APIs y apps', 'Servicios, endpoints e integraciones pensando en el contrato, la validación y en quien los va a mantener después.', ['C#', '.NET', 'ASP.NET Core', 'API REST', 'TypeScript', 'Node.js', 'Java 21', 'Jakarta EE', 'React', 'Swift']],
  ['Integraciones SaaS', 'Rutinas que conectan Notion, Datadog, DocuSign CLM y otras APIs, con manejo de errores y trazabilidad por fuente.', ['Notion API', 'Datadog', 'DocuSign CLM', 'webhooks', 'EventBridge']],
  ['Datos', 'Deduplicación, freshness, backfill y conciliación: que el dato llegue bien antes de convertirse en panel.', ['SQL', 'Athena', 'S3', 'QuickSight', 'Oracle', 'PL/SQL']],
  ['AWS y entrega', 'Publiqué un frontend en Amplify, y uso o revisé workloads en App Runner, Lambda, S3 y SQS.', ['Amplify', 'Lambda', 'S3', 'SQS', 'DLQ', 'AWS App Runner', 'GitHub Actions', 'Docker']],
  ['Pruebas y observabilidad', 'Pruebo localmente los escenarios que importan antes de pasar a homologación.', ['Datadog', 'Sonar', 'Gitleaks', 'pruebas de integración']],
  ['Ingeniería con agentes', 'Cadenas de agentes, MCPs y Learning Loop para dividir contexto y revisar entregas. El alcance, el código, las pruebas y la decisión final siguen siendo míos.', ['Claude Code', 'Codex', 'Kiro', 'MCP', 'Learning Loop']],
];

const enExperiences: ExperienceItem[] = [
  ['Oct 2026 – now', 'Alest', 'Mid-level Software Developer', ['Data and telemetry platforms, SaaS integrations and backend services.', 'Documentation, configuration, messaging, testing and validation alongside the tech lead.'], 'https://alest.com.br/'],
  ['Mar 2026 – Oct 2026', 'Alest', 'Junior Software Developer', ['Hired full-time on March 30, 2026, after the internship.', 'Integrations, automation and data quality routines.'], 'https://alest.com.br/'],
  ['Oct 2025 – Mar 2026', 'Alest', 'Software Development Intern', ['Support on internal integrations and automation with C#/.NET, TypeScript/Node.js and SaaS APIs.', 'Early stages of an internal telemetry and data platform.', 'DocuSign CLM flows focused on validation, traceability and error handling.'], 'https://alest.com.br/'],
  ['Aug 2025 – Oct 2025', 'Atento', 'Bilingual support in Spanish', ['Customer support in Spanish: communication, triage and request follow-up.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['Mar 2023 – Apr 2025', 'Argentina', 'Full-time volunteer service', ['Community work in a multicultural setting, speaking Spanish every day.', 'Visits, scheduling, following up with people and working with local teams.'], 'https://www.churchofjesuschrist.org/?lang=eng', 'Argentina — website of The Church of Jesus Christ of Latter-day Saints (opens in a new tab)'],
  ['Mar 2021 – Nov 2022', 'Beneficência Portuguesa de São Paulo', 'Apprentice', ['First corporate job: operational routines and communication with internal teams.'], 'https://www.bp.org.br/'],
];

const esExperiences: ExperienceItem[] = [
  ['oct. 2026 – hoy', 'Alest', 'Desarrollador Semi Senior', ['Plataformas de datos y telemetría, integraciones SaaS y servicios backend.', 'Documentación, configuración, mensajería, pruebas y validación junto al líder técnico.'], 'https://alest.com.br/'],
  ['mar. 2026 – oct. 2026', 'Alest', 'Desarrollador Junior', ['Efectivo desde el 30/03/2026, después de la pasantía.', 'Integraciones, automatizaciones y rutinas de calidad de datos.'], 'https://alest.com.br/'],
  ['oct. 2025 – mar. 2026', 'Alest', 'Pasante de Desarrollo de Software', ['Apoyo en integraciones y automatizaciones internas con C#/.NET, TypeScript/Node.js y APIs SaaS.', 'Primeras etapas de una plataforma interna de telemetría y datos.', 'Flows en DocuSign CLM con foco en validación, trazabilidad y manejo de errores.'], 'https://alest.com.br/'],
  ['ago. 2025 – oct. 2025', 'Atento', 'Soporte bilingüe en español', ['Atención y soporte a clientes en español: comunicación, triaje y seguimiento de solicitudes.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['mar. 2023 – abr. 2025', 'Argentina', 'Servicio voluntario de tiempo completo', ['Trabajo comunitario en un contexto multicultural, hablando español todos los días.', 'Visitas, agenda, acompañamiento de personas y colaboración con equipos locales.'], 'https://www.churchofjesuschrist.org/?lang=spa', 'Argentina — sitio de La Iglesia de Jesucristo de los Santos de los Últimos Días (se abre en una pestaña nueva)'],
  ['mar. 2021 – nov. 2022', 'Beneficência Portuguesa de São Paulo', 'Joven aprendiz', ['Primera experiencia en un entorno corporativo: rutina operativa y comunicación con áreas internas.'], 'https://www.bp.org.br/'],
];

const enEducation: EducationItem[] = [
  ['May 2025 – Dec 2027', 'Brigham Young University\u2011Idaho', 'Bachelor of Science in Software Development (in progress)', 'Online, through BYU\u2011Pathway Worldwide.'],
  ['Oct 2025 – Jul 2027', 'UFBRA', 'Technology degree in Systems Analysis and Development (in progress)'],
  ['alongside', 'DIO', '.NET and MySQL database bootcamp, plus C# and Git/GitHub courses', 'Hands-on tracks on dio.me.'],
  ['completed Aug 15, 2026', 'Brigham Young University\u2011Idaho', 'Certificate in Web & Computer Programming'],
  ['Feb 2020 – Nov 2022', 'ETEC Parque Belém', 'Technical diploma in Systems Development'],
];

const esEducation: EducationItem[] = [
  ['may. 2025 – dic. 2027', 'Brigham Young University\u2011Idaho', 'Licenciatura en Desarrollo de Software (en curso)', 'En línea, a través de BYU\u2011Pathway Worldwide.'],
  ['oct. 2025 – jul. 2027', 'UFBRA', 'Tecnología en Análisis y Desarrollo de Sistemas (en curso)'],
  ['en paralelo', 'DIO', 'Bootcamp de .NET y base de datos MySQL, más cursos de C# y de Git y GitHub', 'Rutas prácticas en dio.me.'],
  ['finalizado el 15/08/2026', 'Brigham Young University\u2011Idaho', 'Certificate in Web & Computer Programming'],
  ['feb. 2020 – nov. 2022', 'ETEC Parque Belém', 'Técnico en Desarrollo de Sistemas'],
];

const enLanguages: LanguageItem[] = [
  ['Português', 'pt', 'native'],
  ['Español', 'es', 'fluent, from two years in Argentina', 'I trained a team in Argentina and was a translator in meetings with clients from Mexico and Colombia.'],
  ['English', 'en', 'B2, certified by LingoPass'],
];

const esLanguages: LanguageItem[] = [
  ['Português', 'pt', 'nativo'],
  ['Español', 'es', 'fluido, de dos años en Argentina', 'Capacité a un equipo en Argentina y fui traductor en reuniones con clientes de México y Colombia.'],
  ['English', 'en', 'B2, certificado por LingoPass'],
];

type CredentialCopy = { name?: string; date?: string; issued?: string; expires?: string; proof?: string };

// Keyed by id: two credentials share the Notion issuer.
const localizeCredentials = (copy: Record<string, CredentialCopy>): Credential[] =>
  ptCredentials.map((item) => ({ ...item, ...copy[item.id] }));

const enCredentials = localizeCredentials({
  'aws-devops-pro': { issued: 'Oct 2026', expires: 'Oct 2029', proof: 'Automating delivery and running systems on AWS, at professional level.' },
  'google-genai-leader': { issued: 'Oct 2026', expires: 'Oct 2029', proof: 'How generative AI creates business value with Google Cloud.' },
  'byu-idaho-web': { date: 'Completed Aug 15, 2026', proof: 'Writing programs for real tasks and building websites and dynamic pages with good practices.' },
  'notion-service-specialist': { issued: 'Apr 2026', expires: 'Apr 2028', proof: 'Scoping, designing and delivering Notion solutions that drive business results, from discovery to team adoption.' },
  'notion-admin': { issued: 'Nov 2025', expires: 'Nov 2027', proof: 'Running Notion workspaces: access, security and organization.' },
  'lingopass-b2': { name: 'English B2 Advanced', proof: 'English at B2, upper intermediate.' },
  'dio-git': { name: 'Code versioning with Git and GitHub', proof: 'Course on code versioning with Git and GitHub.' },
});

const esCredentials = localizeCredentials({
  'aws-devops-pro': { issued: 'oct/2026', expires: 'oct/2029', proof: 'Automatización de entregas y operación de sistemas en AWS, a nivel profesional.' },
  'google-genai-leader': { issued: 'oct/2026', expires: 'oct/2029', proof: 'Cómo la IA generativa genera valor para el negocio con Google Cloud.' },
  'byu-idaho-web': { date: 'Finalizado el 15/08/2026', proof: 'Programar para tareas reales y crear sitios y páginas dinámicas con buenas prácticas.' },
  'notion-service-specialist': { issued: 'abr/2026', expires: 'abr/2028', proof: 'Planificar, diseñar y entregar soluciones en Notion que generan resultados para el negocio, desde el descubrimiento hasta la adopción del equipo.' },
  'notion-admin': { issued: 'nov/2025', expires: 'nov/2027', proof: 'Administración de workspaces de Notion: acceso, seguridad y organización.' },
  'lingopass-b2': { name: 'Inglés B2 Advanced', proof: 'Inglés nivel B2, intermedio avanzado.' },
  'dio-git': { name: 'Control de versiones con Git y GitHub', proof: 'Curso de control de versiones con Git y GitHub.' },
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
      { label: 'Certifications', href: '#credenciais' },
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
      { label: 'Certificaciones', href: '#credenciais' },
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
