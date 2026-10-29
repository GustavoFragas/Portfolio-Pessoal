import type { CaseItem, PortfolioLocale } from './portfolioLocales';

// Visual data of the project cards, by case `key` and locale: the pixel architecture diagrams (geometry
// + labels). What only the technical-details drawer uses (the steps it lights one by one, 01's technical
// drawing, the short "before → after" lines, verified numbers and the real-screen crop) is in
// projectDetails.ts, which loads with the drawer and stays out of the initial bundle.
// Rule: every visible string restates a sentence of the Rodada 6B source (outputs/.../research/
// claims-6b.md; for FragasTokenPulse also confirmed in the app's README) or, for the cases the source
// keeps as they were (ATS, notices, integration), of the case text; no client, internal system,
// service, number or fact outside it. The source is noted next to each entry (claims line = `c<n>`).
// Diagram labels: one string per line; the diagram draws the lines as given, it never wraps them.

export type CaseKey = CaseItem['key'];
type Lines = readonly string[];
export type ByLocale<T> = Record<PortfolioLocale, T>;

/** A point on the tile grid (in tiles, not pixels). */
export type Pt = readonly [number, number];
export type DiagramBlock = { id: string; at: readonly [x: number, y: number, w: number, h: number]; key?: boolean };
export type DiagramLink = { id: string; path: readonly Pt[]; heads: 'end' | 'both'; tone?: 'retry' };
export type DiagramNote = { id: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end' };
/** An arrow that never arrives: a run of tiles that stops before a pixel ✕ centred at `cross`. */
export type DiagramCut = { id: string; path: readonly Pt[]; cross: Pt };

export type DiagramCopy = {
  /** Short text alternative read instead of the drawing (card). */
  alt: string;
  /** The small caption over the drawing on the card, when not the default "How it works". */
  label?: string;
  /** Block labels, by block id. */
  nodes: Record<string, Lines>;
  /** Loose notes next to a block or an arrow, by note id. */
  notes: Record<string, Lines>;
  /** One line per step (same order as `steps` in the geometry): the drawer's ordered list. Only the
      drawer's drawings have them (projectDetails.ts). */
  steps?: readonly string[];
};

export type Diagram = {
  /** Height in tiles; the width is the same for every diagram (ProjectDiagram.tsx), so text keeps one size. */
  rows: number;
  blocks: readonly DiagramBlock[];
  links: readonly DiagramLink[];
  notes: readonly DiagramNote[];
  cut?: DiagramCut;
  /** The order the drawer lights the drawing in: ids of blocks, links, notes or the cut, per step
      (the drawer's drawings only, projectDetails.ts). */
  steps?: readonly (readonly string[])[];
  /** Where a step's number goes (centre, in tiles), by step index, when not on the top-left corner of
      the step's first block: steps without a block, or a corner an arrow already uses. */
  badges?: Readonly<Record<number, Pt>>;
  copy: ByLocale<DiagramCopy>;
};

export const diagramUi: ByLocale<{ label: string; counts: string }> = {
  pt: { label: 'Como funciona', counts: 'Em números' },
  en: { label: 'How it works', counts: 'By the numbers' },
  es: { label: 'Cómo funciona', counts: 'En números' },
};

const diagramTable = {
  // 01, on the card: how the team's work reached main (c34, "Diagrama do card (liderança)"): card + DoR
  // → the dev's PR → CI → review in rounds → single merge (the key block: c12 "fui o único responsável
  // pelo merge na main") → post-merge certification. A snake: right, down, left, down, right.
  modernizationTeam: {
    rows: 21,
    blocks: [
      { id: 'card', at: [0, 0, 13, 4] },
      { id: 'pr', at: [16, 0, 11, 4] },
      { id: 'ci', at: [22, 7, 22, 6] },
      { id: 'review', at: [0, 8, 19, 4] },
      { id: 'merge', at: [3, 16, 14, 4], key: true },
      { id: 'cert', at: [21, 15, 17, 6] },
    ],
    links: [
      { id: 'l-pr', path: [[13, 2], [15, 2]], heads: 'end' },
      { id: 'l-ci', path: [[24, 4], [24, 6]], heads: 'end' },
      { id: 'l-review', path: [[21, 10], [19, 10]], heads: 'end' },
      { id: 'l-merge', path: [[9, 12], [9, 15]], heads: 'end' },
      { id: 'l-cert', path: [[17, 17], [20, 17]], heads: 'end' },
    ],
    notes: [],
    copy: {
      pt: {
        alt: 'Diagrama do fluxo do time: card + DoR, PR do dev, CI (build, ArchUnit e varredura de segredos), revisão em rodadas, merge único e certificação pós-merge.',
        label: 'Como coordenei o time',
        nodes: { card: ['Card + DoR'], pr: ['PR do dev'], ci: ['CI: build, ArchUnit', 'varredura de segredos'], review: ['Revisão em rodadas'], merge: ['Merge único'], cert: ['Certificação', 'pós-merge'] },
        notes: {},
      },
      en: {
        alt: 'Diagram of the team’s flow: card + DoR, the dev’s PR, CI (build, ArchUnit and secret scanning), review in rounds, a single merge and post-merge certification.',
        label: 'How I coordinated the team',
        nodes: { card: ['Card + DoR'], pr: ['Dev’s PR'], ci: ['CI: build, ArchUnit', 'secret scanning'], review: ['Review in rounds'], merge: ['Single merge'], cert: ['Post-merge', 'certification'] },
        notes: {},
      },
      es: {
        alt: 'Diagrama del flujo del equipo: tarjeta + DoR, PR del dev, CI (build, ArchUnit y escaneo de secretos), revisión por rondas, merge único y certificación post-merge.',
        label: 'Cómo coordiné al equipo',
        nodes: { card: ['Tarjeta + DoR'], pr: ['PR del dev'], ci: ['CI: build, ArchUnit', 'escaneo de secretos'], review: ['Revisión por rondas'], merge: ['Merge único'], cert: ['Certificación', 'post-merge'] },
        notes: {},
      },
    },
  },
  // Platform A ⇄ integration (with the guard) ⇄ platform B.
  // what: "mantém os mesmos dados em duas plataformas que a equipe usa no dia a dia"; did: "Escrevi a
  // integração nos dois sentidos, com uma trava que impede que uma atualização dispare a outra sem parar";
  // problem: "vaivém sem fim"; result: "As duas plataformas ficam alinhadas".
  integration: {
    rows: 21,
    blocks: [
      { id: 'a', at: [0, 0, 14, 4] },
      { id: 'b', at: [30, 0, 14, 4] },
      { id: 'sync', at: [12, 15, 20, 6], key: true },
    ],
    links: [
      { id: 'l-a', path: [[7, 4], [7, 6], [15, 14]], heads: 'both' },
      { id: 'l-b', path: [[36, 4], [36, 6], [28, 14]], heads: 'both' },
    ],
    notes: [{ id: 'both', x: 22, y: 1.2, anchor: 'middle' }],
    copy: {
      pt: {
        alt: 'Diagrama: a plataforma A e a plataforma B ficam alinhadas nos dois sentidos pela integração, que tem uma trava contra o vaivém.',
        nodes: { a: ['Plataforma A'], b: ['Plataforma B'], sync: ['Integração', 'trava contra o vaivém'] },
        notes: { both: ['nos dois', 'sentidos'] },
      },
      en: {
        alt: 'Diagram: platform A and platform B stay aligned both ways through the integration, which has a guard against ping-pong.',
        nodes: { a: ['Platform A'], b: ['Platform B'], sync: ['Integration', 'ping-pong guard'] },
        notes: { both: ['both', 'ways'] },
      },
      es: {
        alt: 'Diagrama: la plataforma A y la plataforma B quedan alineadas en ambos sentidos a través de la integración, que tiene un freno al ida y vuelta.',
        nodes: { a: ['Plataforma A'], b: ['Plataforma B'], sync: ['Integración', 'freno al ida y vuelta'] },
        notes: { both: ['en ambos', 'sentidos'] },
      },
    },
  },
  // Résumé + job post → rules + AI → suggestions → human review.
  // shot alt: "áreas para enviar o currículo e o perfil do LinkedIn em PDF, campo para colar a descrição
  // da vaga"; did: "as regras para a IA só sugerir o que é verdade"; what: "mostra o quanto um currículo
  // combina com uma vaga"; result: "sempre revisadas por uma pessoa antes de aceitar".
  ats: {
    rows: 23,
    blocks: [
      { id: 'cv', at: [0, 0, 12, 4] },
      { id: 'job', at: [14, 0, 9, 4] },
      { id: 'rules', at: [7, 7, 12, 4], key: true },
      { id: 'suggestions', at: [16, 13, 13, 4] },
      { id: 'review', at: [27, 19, 17, 4] },
    ],
    links: [
      { id: 'l-cv', path: [[2, 4], [2, 6], [4, 8], [6, 8]], heads: 'end' },
      { id: 'l-job', path: [[16, 4], [16, 6]], heads: 'end' },
      { id: 'l-sug', path: [[12, 11], [12, 12], [14, 14], [15, 14]], heads: 'end' },
      { id: 'l-rev', path: [[22, 17], [22, 18], [24, 20], [26, 20]], heads: 'end' },
    ],
    notes: [{ id: 'accept', x: 21, y: 19.5, anchor: 'end' }],
    copy: {
      pt: {
        alt: 'Diagrama: o currículo e a vaga passam pelas regras + IA, que geram sugestões; cada sugestão passa por revisão humana antes de ser aceita.',
        nodes: { cv: ['Currículo'], job: ['Vaga'], rules: ['Regras + IA'], suggestions: ['Sugestões'], review: ['Revisão humana'] },
        notes: { accept: ['antes de aceitar'] },
      },
      en: {
        alt: 'Diagram: the résumé and the job post go through rules + AI, which produce suggestions; each suggestion goes through human review before it is accepted.',
        nodes: { cv: ['Résumé'], job: ['Job post'], rules: ['Rules + AI'], suggestions: ['Suggestions'], review: ['Human review'] },
        notes: { accept: ['before accepting'] },
      },
      es: {
        alt: 'Diagrama: el currículum y la vacante pasan por reglas + IA, que generan sugerencias; cada sugerencia pasa por revisión humana antes de aceptarse.',
        nodes: { cv: ['Currículum'], job: ['Vacante'], rules: ['Reglas + IA'], suggestions: ['Sugerencias'], review: ['Revisión humana'] },
        notes: { accept: ['antes de aceptar'] },
      },
    },
  },
  // 02 (c45, "Diagrama"): sources → collectors → Notion databases → worker (score by department) →
  // S3 snapshot (the key block: c40, ADR-0008 "Redis estourou, o snapshot no S3 manteve o último
  // conjunto íntegro") → API → dashboard. Legends: c41 (what), c43 (collector), c44 (stack), c40.
  monitoring: {
    rows: 22,
    blocks: [
      { id: 'sources', at: [0, 0, 10, 6] },
      { id: 'collectors', at: [13, 0, 13, 6] },
      { id: 'notion', at: [29, 0, 15, 6] },
      { id: 'worker', at: [25, 9, 19, 6] },
      { id: 'snapshot', at: [0, 9, 22, 6], key: true },
      { id: 'api', at: [1, 18, 9, 4] },
      { id: 'panel', at: [13, 18, 13, 4] },
    ],
    links: [
      { id: 'l-collectors', path: [[10, 2], [12, 2]], heads: 'end' },
      { id: 'l-notion', path: [[26, 2], [28, 2]], heads: 'end' },
      { id: 'l-worker', path: [[36, 6], [36, 8]], heads: 'end' },
      { id: 'l-snapshot', path: [[24, 11], [22, 11]], heads: 'end' },
      { id: 'l-api', path: [[6, 15], [6, 17]], heads: 'end' },
      { id: 'l-panel', path: [[10, 19], [12, 19]], heads: 'end' },
    ],
    notes: [],
    copy: {
      pt: {
        alt: 'Diagrama: fontes, coletores, bases no Notion, worker que calcula o score por setor, snapshot no S3 com o último conjunto íntegro, API e painel, nessa ordem.',
        nodes: { sources: ['Fontes', '8 a 10'], collectors: ['Coletores'], notion: ['Bases', 'no Notion'], worker: ['Worker', 'score por setor'], snapshot: ['Snapshot no S3', 'último conjunto íntegro'], api: ['API'], panel: ['Painel'] },
        notes: {},
      },
      en: {
        alt: 'Diagram: sources, collectors, Notion databases, a worker that computes the score by department, an S3 snapshot with the last intact set, API and dashboard, in that order.',
        nodes: { sources: ['Sources', '8 to 10'], collectors: ['Collectors'], notion: ['Databases', 'in Notion'], worker: ['Worker', 'score by department'], snapshot: ['Snapshot in S3', 'last intact set'], api: ['API'], panel: ['Dashboard'] },
        notes: {},
      },
      es: {
        alt: 'Diagrama: fuentes, recolectores, bases en Notion, un worker que calcula el score por sector, snapshot en S3 con el último conjunto íntegro, API y panel, en ese orden.',
        nodes: { sources: ['Fuentes', '8 a 10'], collectors: ['Recolectores'], notion: ['Bases', 'en Notion'], worker: ['Worker', 'score por sector'], snapshot: ['Snapshot en S3', 'último conjunto íntegro'], api: ['API'], panel: ['Panel'] },
        notes: {},
      },
    },
  },
  // Main system → queue → notices → other systems; a failed notice is set aside for a new try,
  // and the logs keep sensitive data masked.
  // what: "avisa outros sistemas quando algo acontece, sem deixar o sistema principal esperando"; did:
  // "os avisos passaram por uma fila, os dados sensíveis ficaram mascarados nos registros"; result:
  // "responde na hora; ... se falharem, ficam separados para uma nova tentativa".
  alerts: {
    rows: 21,
    blocks: [
      { id: 'main', at: [0, 0, 17, 4] },
      { id: 'queue', at: [4, 7, 8, 4], key: true },
      { id: 'notices', at: [15, 7, 9, 4] },
      { id: 'others', at: [29, 6, 15, 6] },
      { id: 'logs', at: [0, 15, 14, 6] },
      { id: 'retry', at: [25, 15, 15, 6] },
    ],
    links: [
      { id: 'l-queue', path: [[8, 4], [8, 6]], heads: 'end' },
      { id: 'l-notices', path: [[12, 8], [14, 8]], heads: 'end' },
      { id: 'l-others', path: [[24, 8], [28, 8]], heads: 'end' },
      { id: 'l-logs', path: [[18, 11], [18, 12], [16, 14], [16, 17], [14, 17]], heads: 'end' },
      { id: 'l-retry', path: [[21, 11], [21, 12], [23, 14], [23, 17], [24, 17]], heads: 'end', tone: 'retry' },
    ],
    notes: [
      { id: 'now', x: 18, y: 1.4 },
      { id: 'failed', x: 25.4, y: 12.75 },
    ],
    copy: {
      pt: {
        alt: 'Diagrama: o sistema principal responde na hora e os avisos seguem por uma fila até os outros sistemas; se um aviso falha, fica separado para uma nova tentativa. Os registros guardam os dados sensíveis mascarados.',
        nodes: { main: ['Sistema principal'], queue: ['Fila'], notices: ['Avisos'], others: ['Outros', 'sistemas'], retry: ['Separado para', 'nova tentativa'], logs: ['Registros', 'mascarados'] },
        notes: { now: ['responde na hora'], failed: ['falhou?'] },
      },
      en: {
        alt: 'Diagram: the main system answers right away and the notices move through a queue to the other systems; if a notice fails, it is set aside to be retried. The logs keep sensitive data masked.',
        nodes: { main: ['Main system'], queue: ['Queue'], notices: ['Notices'], others: ['Other', 'systems'], retry: ['Set aside', 'to retry'], logs: ['Logs with', 'masked data'] },
        notes: { now: ['answers right away'], failed: ['failed?'] },
      },
      es: {
        alt: 'Diagrama: el sistema principal responde al instante y los avisos siguen por una cola hasta los otros sistemas; si un aviso falla, queda aparte para reintentarlo. Los registros guardan los datos sensibles enmascarados.',
        nodes: { main: ['Sistema principal'], queue: ['Cola'], notices: ['Avisos'], others: ['Otros', 'sistemas'], retry: ['Aparte para', 'reintentar'], logs: ['Registros', 'enmascarados'] },
        notes: { now: ['responde al instante'], failed: ['¿falló?'] },
      },
    },
  },
  // 06 (c54, "Diagrama"), every node confirmed in FragasTokenPulse/README.md (r<n> = README line): local
  // files, JSONL + usage cache (r34-38) → local readers, no network (r32, r35-37) → Swift core (the key
  // block; r76, r109) → notch and cards (r3-10). The source's last node, "Escritório 3D dos agentes",
  // is not in the README (r75: the agents' window was removed), so it is left out.
  tokenpulse: {
    rows: 13,
    blocks: [
      { id: 'files', at: [0, 0, 20, 6] },
      { id: 'readers', at: [24, 0, 20, 6] },
      { id: 'core', at: [24, 9, 20, 4], key: true },
      { id: 'notch', at: [0, 9, 20, 4] },
    ],
    links: [
      { id: 'l-readers', path: [[20, 2], [23, 2]], heads: 'end' },
      { id: 'l-core', path: [[34, 6], [34, 8]], heads: 'end' },
      { id: 'l-notch', path: [[23, 10], [20, 10]], heads: 'end' },
    ],
    notes: [],
    copy: {
      pt: {
        alt: 'Diagrama: arquivos locais (JSONL e cache de uso) passam por leitores locais, sem rede, até o núcleo em Swift, que mostra o consumo no notch e nos cartões.',
        nodes: { files: ['Arquivos locais', 'JSONL + cache de uso'], readers: ['Leitores locais', 'sem rede'], core: ['Núcleo Swift'], notch: ['Notch e cartões'] },
        notes: {},
      },
      en: {
        alt: 'Diagram: local files (JSONL and usage cache) go through local readers, with no network, to the Swift core, which shows usage in the notch and its cards.',
        nodes: { files: ['Local files', 'JSONL + usage cache'], readers: ['Local readers', 'no network'], core: ['Swift core'], notch: ['Notch and cards'] },
        notes: {},
      },
      es: {
        alt: 'Diagrama: los archivos locales (JSONL y caché de uso) pasan por lectores locales, sin red, hasta el núcleo en Swift, que muestra el consumo en el notch y en las tarjetas.',
        nodes: { files: ['Archivos locales', 'JSONL + caché de uso'], readers: ['Lectores locales', 'sin red'], core: ['Núcleo Swift'], notch: ['Notch y tarjetas'] },
        notes: {},
      },
    },
  },
} satisfies Record<string, Diagram>;

export type DiagramId = keyof typeof diagramTable;
export const diagrams: Record<DiagramId, Diagram> = diagramTable;

/** The drawing on each case's card (01 shows how the team worked; the drawer keeps the technical one).
    A case without an entry has no drawing on its card. */
export const cardDiagrams: Partial<Record<CaseKey, DiagramId>> = {
  modernization: 'modernizationTeam',
  monitoring: 'monitoring',
  ats: 'ats',
  alerts: 'alerts',
  integration: 'integration',
  tokenpulse: 'tokenpulse',
};

