import { diagrams, type ByLocale, type CaseKey, type Diagram, type DiagramId } from './projectDiagrams';

// Data only the technical-details drawer uses. It loads with the drawer (TechDrawer.tsx), never in the
// initial bundle: the drawer's drawing of each case (the card's own drawing, or 01's technical one, lit
// step by step with one line per step), the short "before → after" lines, verified numbers and the
// real-screen crop. Same rule as projectDiagrams.ts: every visible string restates a sentence of the
// Rodada 6B source (outputs/.../research/claims-6b.md, line = `c<n>`; for FragasTokenPulse also its
// README) or, for ATS, notices and integration, of the case text. The source is noted next to each entry.

/** A verified number, shown big in the drawer. Only numbers the case already states. */
export type Figure = {
  label: string;
  from: string;
  to: string;
  /** The qualifier that always travels with the number. */
  note: string;
  /** The source sentence, read by screen readers instead of the drawn figure. */
  spoken: string;
};

/** A verified count, shown as a tile in the drawer: the number big, its unit right under it. */
export type Count = { value: string; unit: string };

export type ProjectVisualCopy = {
  /** Short "before" (from `problem`) and "after" (from `result`): one sentence each. */
  before: string;
  after: string;
  figures?: readonly Figure[];
  /** Verified counts, read as a list ("156 endpoints"). Only numbers the source states. */
  counts?: readonly Count[];
  /** Short caption of the real screen (from the screenshot's alt). */
  shotCaption?: string;
};

export type ProjectDetail = {
  /** The drawing the drawer enlarges, step by step. */
  tech?: TechId;
  /** Crop of the case's real screenshot (same capture as `shot`, cut to the useful area). */
  shot?: { src: string; width: number; height: number };
  copy: ByLocale<ProjectVisualCopy>;
};

type Lit = { steps: NonNullable<Diagram['steps']>; badges?: Diagram['badges']; lines: ByLocale<readonly string[]> };

/** A card's drawing as the drawer shows it: the same geometry and labels, plus the order it is lit in
    and one line per step. */
function lit(id: DiagramId, { steps, badges, lines }: Lit): Diagram {
  const card = diagrams[id];
  const copy = card.copy;
  return {
    ...card,
    steps,
    ...(badges && { badges }),
    copy: { pt: { ...copy.pt, steps: lines.pt }, en: { ...copy.en, steps: lines.en }, es: { ...copy.es, steps: lines.es } },
  };
}

const techTable = {
  // 01, in the drawer (c35, "Diagrama técnico"): integrated systems → anti-corruption layer → modular
  // monolith (the key block) → per-role approval matrix → ERP. Legends: c32 (did), c31 (problem), c30.
  modernization: {
    rows: 20,
    blocks: [
      { id: 'systems', at: [0, 0, 20, 4] },
      { id: 'acl', at: [23, 0, 21, 4] },
      { id: 'monolith', at: [23, 7, 21, 6], key: true },
      { id: 'matrix', at: [0, 7, 20, 6] },
      { id: 'erp', at: [3, 16, 13, 4] },
    ],
    links: [
      { id: 'l-acl', path: [[20, 2], [22, 2]], heads: 'end' },
      { id: 'l-monolith', path: [[33, 4], [33, 6]], heads: 'end' },
      { id: 'l-matrix', path: [[22, 10], [20, 10]], heads: 'end' },
      { id: 'l-erp', path: [[9, 13], [9, 15]], heads: 'end' },
    ],
    notes: [],
    steps: [['systems'], ['l-acl', 'acl'], ['l-monolith', 'monolith'], ['l-matrix', 'matrix'], ['l-erp', 'erp']],
    badges: { 2: [44, 7] },
    copy: {
      pt: {
        alt: 'Diagrama técnico: sistemas integrados, camada anticorrupção, monólito modular (Java 21, Jakarta EE), matriz de alçada por cargo e ERP, nessa ordem.',
        nodes: { systems: ['Sistemas integrados'], acl: ['Camada anticorrupção'], monolith: ['Monólito modular', 'Java 21, Jakarta EE'], matrix: ['Matriz de alçada', 'por cargo'], erp: ['ERP'] },
        notes: {},
        steps: [
          'Sistemas que se integram às aprovações de pagamento.',
          'Camada anticorrupção para os ERPs.',
          'Monólito modular em Java 21 + Jakarta EE, com Strangler Fig.',
          'Alçada por cargo no lugar da alçada por pessoa: cerca de 80% do modelo.',
          'Até o ERP.',
        ],
      },
      en: {
        alt: 'Technical diagram: integrated systems, anti-corruption layer, modular monolith (Java 21, Jakarta EE), per-role approval matrix and ERP, in that order.',
        nodes: { systems: ['Integrated systems'], acl: ['Anti-corruption layer'], monolith: ['Modular monolith', 'Java 21, Jakarta EE'], matrix: ['Approval matrix', 'by role'], erp: ['ERP'] },
        notes: {},
        steps: [
          'Systems that integrate with the payment approvals.',
          'An anti-corruption layer for the ERPs.',
          'A modular monolith in Java 21 + Jakarta EE, with Strangler Fig.',
          'Per-role approval limits instead of per-person: about 80% of the model.',
          'On to the ERP.',
        ],
      },
      es: {
        alt: 'Diagrama técnico: sistemas integrados, capa anticorrupción, monolito modular (Java 21, Jakarta EE), matriz de aprobación por cargo y ERP, en ese orden.',
        nodes: { systems: ['Sistemas integrados'], acl: ['Capa anticorrupción'], monolith: ['Monolito modular', 'Java 21, Jakarta EE'], matrix: ['Matriz de aprobación', 'por cargo'], erp: ['ERP'] },
        notes: {},
        steps: [
          'Sistemas que se integran con las aprobaciones de pago.',
          'Una capa anticorrupción para los ERP.',
          'Monolito modular en Java 21 + Jakarta EE, con Strangler Fig.',
          'Aprobación por cargo en lugar de por persona: cerca del 80% del modelo.',
          'Hasta el ERP.',
        ],
      },
    },
  },
  // Steps: what ("duas plataformas que a equipe usa no dia a dia"), did ("nos dois sentidos, com uma
  // trava que impede que uma atualização dispare a outra sem parar").
  integration: lit('integration', {
    steps: [['a', 'b'], ['l-a', 'l-b', 'both'], ['sync']],
    badges: { 1: [22, 7] },
    lines: {
      pt: [
        'Duas plataformas que a equipe usa no dia a dia.',
        'Integração nos dois sentidos.',
        'Uma trava impede que uma atualização dispare a outra sem parar.',
      ],
      en: ['Two platforms the team uses every day.', 'Integration in both directions.', 'A guard stops one update from triggering the other forever.'],
      es: ['Dos plataformas que el equipo usa a diario.', 'Integración en ambos sentidos.', 'Un freno impide que una actualización dispare la otra sin parar.'],
    },
  }),
  // Steps: shot alt, did, what, result (see the drawing's notes in projectDiagrams.ts).
  ats: lit('ats', {
    steps: [['cv', 'job'], ['l-cv', 'l-job', 'rules'], ['l-sug', 'suggestions'], ['l-rev', 'review', 'accept']],
    badges: { 1: [19, 7], 2: [29, 13], 3: [44, 19] },
    lines: {
      pt: [
        'Currículo em PDF e a descrição da vaga.',
        'Regras para a IA só sugerir o que é verdade.',
        'Mostra o quanto o currículo combina com a vaga.',
        'Sempre revisadas por uma pessoa antes de aceitar.',
      ],
      en: [
        'The résumé as a PDF and the job description.',
        'Rules so the AI only suggests what is true.',
        'Shows how well the résumé fits the job post.',
        'Always reviewed by a person before being accepted.',
      ],
      es: [
        'El currículum en PDF y la descripción de la vacante.',
        'Reglas para que la IA solo sugiera lo que es verdad.',
        'Muestra qué tan bien encaja el currículum con la vacante.',
        'Siempre revisadas por una persona antes de aceptarlas.',
      ],
    },
  }),
  // Steps: c41 (sources), c43 (collector), c45 + c44, c45 + c41, c40, c45 + c44, c45 + c44 + c41.
  monitoring: lit('monitoring', {
    steps: [['sources'], ['l-collectors', 'collectors'], ['l-notion', 'notion'], ['l-worker', 'worker'], ['l-snapshot', 'snapshot'], ['l-api', 'api'], ['l-panel', 'panel']],
    badges: { 3: [44, 9], 6: [26, 18] },
    lines: {
      pt: [
        'De 8 a 10 fontes de atividade: agendas, Notion, monday, Gmail, Drive, Claude/Codex.',
        'Inclui o coletor de uso de IA dos Macs do time: outbox durável, idempotência e rollout canário com rollback.',
        'Bases no Notion, pela Notion API.',
        'Um worker calcula o score de adoção de ferramentas e IA por setor.',
        'Quando o Redis estourou, o snapshot no S3 manteve o último conjunto íntegro.',
        'API em Node/Express.',
        'Painel em React 19 para a liderança enxergar a adoção por setor.',
      ],
      en: [
        '8 to 10 activity sources: calendars, Notion, monday, Gmail, Drive, Claude/Codex.',
        'Includes the AI usage collector on the team’s Macs: durable outbox, idempotency and a canary rollout with rollback.',
        'Notion databases, through the Notion API.',
        'A worker computes the adoption score of tools and AI by department.',
        'When Redis maxed out, the S3 snapshot kept the last intact set.',
        'An API in Node/Express.',
        'A React 19 dashboard so leadership can see adoption by department.',
      ],
      es: [
        'De 8 a 10 fuentes de actividad: agendas, Notion, monday, Gmail, Drive, Claude/Codex.',
        'Incluye el recolector de uso de IA en las Mac del equipo: outbox durable, idempotencia y rollout canario con rollback.',
        'Bases en Notion, a través de la Notion API.',
        'Un worker calcula el score de adopción de herramientas e IA por sector.',
        'Cuando Redis se saturó, el snapshot en S3 mantuvo el último conjunto íntegro.',
        'API en Node/Express.',
        'Panel en React 19 para que el liderazgo vea la adopción por sector.',
      ],
    },
  }),
  // Steps: what, did, what, result, did (see the drawing's notes in projectDiagrams.ts). Step 3's number
  // sits on the top-right corner of "other systems", clear of the arrow that leaves "notices".
  alerts: lit('alerts', {
    steps: [['main', 'now'], ['l-queue', 'queue'], ['l-notices', 'notices', 'l-others', 'others'], ['l-retry', 'failed', 'retry'], ['l-logs', 'logs']],
    badges: { 2: [44, 6], 3: [40, 15] },
    lines: {
      pt: [
        'Sem deixar o sistema principal esperando.',
        'Os avisos passam por uma fila.',
        'Avisa outros sistemas quando algo acontece.',
        'Se falharem, ficam separados para uma nova tentativa.',
        'Dados sensíveis mascarados nos registros.',
      ],
      en: [
        'Without keeping the main system waiting.',
        'Notices go through a queue.',
        'Tells other systems when something happens.',
        'If they fail, they are set aside to be retried.',
        'Sensitive data masked in the logs.',
      ],
      es: [
        'Sin dejar esperando al sistema principal.',
        'Los avisos pasan por una cola.',
        'Avisa a otros sistemas cuando algo pasa.',
        'Si fallan, quedan aparte para reintentarlos.',
        'Datos sensibles enmascarados en los registros.',
      ],
    },
  }),
  // Steps: c54 + c52 + README r35/r38, c53 + r36, c52 + c54 + r3/r76/r109, c52 + r4/r5/r8/r30.
  tokenpulse: lit('tokenpulse', {
    steps: [['files'], ['l-readers', 'readers'], ['l-core', 'core'], ['l-notch', 'notch']],
    badges: { 2: [44, 9] },
    lines: {
      pt: [
        'Arquivos locais: os JSONL do Codex e do Claude Code e o cache de uso.',
        'Lê só arquivos locais, sem rede e sem guardar o conteúdo das mensagens.',
        'Núcleo em Swift, num app nativo de macOS.',
        'Mostra no notch o consumo de Codex e Claude Code e quais chats estão ativos.',
      ],
      en: [
        'Local files: the Codex and Claude Code JSONL files and the usage cache.',
        'Reads local files only, with no network and without keeping message content.',
        'A Swift core, in a native macOS app.',
        'Shows Codex and Claude Code usage in the notch, and which chats are active.',
      ],
      es: [
        'Archivos locales: los JSONL de Codex y Claude Code y la caché de uso.',
        'Lee solo archivos locales, sin red y sin guardar el contenido de los mensajes.',
        'Núcleo en Swift, en una app nativa de macOS.',
        'Muestra en el notch el consumo de Codex y Claude Code y qué chats están activos.',
      ],
    },
  }),
} satisfies Record<string, Diagram>;

export type TechId = keyof typeof techTable;
export const techDiagrams: Record<TechId, Diagram> = techTable;

/** Per case: the drawing the drawer enlarges and its short lines. A case without an entry still works
    (no drawing; the drawer falls back to its full problem and result). */
export const projectDetails: Partial<Record<CaseKey, ProjectDetail>> = {
  modernization: {
    tech: 'modernization',
    copy: {
      // before: c31 (problem); after: c33 (result, no production claim); counts: c32 (did).
      pt: {
        before: 'Stack fora de suporte e uma troca de alçada que mexe em cerca de 80% do modelo.',
        after: 'Plano validado pelo cliente sem ressalvas e fundação técnica iniciada.',
        counts: [
          { value: '156', unit: 'endpoints' },
          { value: '47', unit: 'entidades' },
          { value: '111', unit: 'tabelas' },
          { value: '99', unit: 'objetos PL/SQL' },
          { value: '4', unit: 'devs coordenados' },
        ],
      },
      en: {
        before: 'An out-of-support stack and an approval-limit switch that touches about 80% of the model.',
        after: 'Plan validated by the client with no reservations and work on the technical foundation started.',
        counts: [
          { value: '156', unit: 'endpoints' },
          { value: '47', unit: 'entities' },
          { value: '111', unit: 'tables' },
          { value: '99', unit: 'PL/SQL objects' },
          { value: '4', unit: 'devs coordinated' },
        ],
      },
      es: {
        before: 'Una stack fuera de soporte y un cambio de niveles de aprobación que toca cerca del 80% del modelo.',
        after: 'Plan validado por el cliente sin reservas y base técnica iniciada.',
        counts: [
          { value: '156', unit: 'endpoints' },
          { value: '47', unit: 'entidades' },
          { value: '111', unit: 'tablas' },
          { value: '99', unit: 'objetos PL/SQL' },
          { value: '4', unit: 'devs coordinados' },
        ],
      },
    },
  },
  integration: {
    tech: 'integration',
    copy: {
      // problem: "Atualizar uma e esquecer a outra deixava a informação desencontrada, e ..."; result:
      // "As duas plataformas ficam alinhadas. Em teste local controlado, a atualização caiu de até 60 s
      // para menos de 2 s." (same number as headline + headlineNote).
      pt: {
        before: 'Atualizar uma e esquecer a outra deixava a informação desencontrada.',
        after: 'As duas plataformas ficam alinhadas.',
        figures: [
          {
            label: 'Atualização',
            from: 'até 60 s',
            to: '< 2 s',
            note: 'em teste local controlado',
            spoken: 'Em teste local controlado, a atualização caiu de até 60 s para menos de 2 s.',
          },
        ],
      },
      en: {
        before: 'Updating one and forgetting the other left information out of sync.',
        after: 'Both platforms stay aligned.',
        figures: [
          {
            label: 'Updates',
            from: 'up to 60 s',
            to: '< 2 s',
            note: 'in a controlled local test',
            spoken: 'In a controlled local test, updates went from up to 60 s to under 2 s.',
          },
        ],
      },
      es: {
        before: 'Actualizar una y olvidar la otra dejaba la información desfasada.',
        after: 'Las dos plataformas quedan alineadas.',
        figures: [
          {
            label: 'Actualización',
            from: 'hasta 60 s',
            to: '< 2 s',
            note: 'en una prueba local controlada',
            spoken: 'En una prueba local controlada, la actualización bajó de hasta 60 s a menos de 2 s.',
          },
        ],
      },
    },
  },
  ats: {
    tech: 'ats',
    // Same capture as `atsShot` (1200 × 720), cut to the app's column at its own pixels (no resize):
    // `cwebp -q 92 -m 6 -crop 232 0 736 712` (provenance in docs/pixel-wall/asset-sources.md).
    shot: { src: '/projects/ats-optimizer-upload-crop.webp', width: 736, height: 712 },
    copy: {
      // problem (whole sentence); result: "Sugestões que respeitam o histórico real, ..."; caption: the
      // start of the screenshot alt.
      pt: {
        before: 'Ferramentas de IA costumam “enfeitar” o currículo com coisas que a pessoa não fez.',
        after: 'Sugestões que respeitam o histórico real.',
        shotCaption: 'Tela de upload do ATS Optimizer.',
      },
      en: {
        before: 'AI tools tend to “pad” résumés with things the person never did.',
        after: 'Suggestions that respect the real background.',
        shotCaption: 'ATS Optimizer upload screen (interface in Portuguese).',
      },
      es: {
        before: 'Las herramientas de IA suelen “adornar” el currículum con cosas que la persona no hizo.',
        after: 'Sugerencias que respetan la trayectoria real.',
        shotCaption: 'Pantalla de carga del ATS Optimizer (interfaz en portugués).',
      },
    },
  },
  monitoring: {
    tech: 'monitoring',
    copy: {
      // before / after: c40 (ADR-0008); counts: c42 (role) and c41 (sources).
      pt: {
        before: 'O Redis estourou.',
        after: 'O snapshot no S3 manteve o último conjunto íntegro.',
        counts: [
          { value: '399', unit: 'de 483 commits, como principal autor' },
          { value: '8\u00a0a\u00a010', unit: 'fontes de atividade' },
        ],
      },
      en: {
        before: 'Redis maxed out.',
        after: 'The S3 snapshot kept the last intact set.',
        counts: [
          { value: '399', unit: 'of 483 commits, as the main author' },
          { value: '8\u00a0to\u00a010', unit: 'activity sources' },
        ],
      },
      es: {
        before: 'Redis se saturó.',
        after: 'El snapshot en S3 mantuvo el último conjunto íntegro.',
        counts: [
          { value: '399', unit: 'de 483 commits, como autor principal' },
          { value: '8\u00a0a\u00a010', unit: 'fuentes de actividad' },
        ],
      },
    },
  },
  alerts: {
    tech: 'alerts',
    copy: {
      // problem: "Um aviso que falhasse não podia travar o sistema principal nem ..."; result: "O sistema
      // principal responde na hora; ...".
      pt: { before: 'Um aviso que falhasse não podia travar o sistema principal.', after: 'O sistema principal responde na hora.' },
      en: { before: 'A failed notice could not freeze the main system.', after: 'The main system answers right away.' },
      es: { before: 'Un aviso que fallara no podía trabar el sistema principal.', after: 'El sistema principal responde al instante.' },
    },
  },
  tokenpulse: {
    tech: 'tokenpulse',
    copy: {
      // before: c53 tightened by README r35-37 ("without ... retaining message content or sending network
      // requests"); after: c52 (what) + c53 (no network).
      pt: {
        before: 'Mostrar o consumo sem acessar a rede e sem guardar o conteúdo das mensagens.',
        after: 'Consumo e chats ativos à vista no notch, sem rede.',
      },
      en: {
        before: 'Showing usage without going to the network or keeping message content.',
        after: 'Usage and active chats in view in the notch, with no network.',
      },
      es: {
        before: 'Mostrar el consumo sin acceder a la red ni guardar el contenido de los mensajes.',
        after: 'El consumo y los chats activos a la vista en el notch, sin red.',
      },
    },
  },
};
