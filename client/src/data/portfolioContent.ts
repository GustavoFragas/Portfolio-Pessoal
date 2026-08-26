export const profile = {
  name: 'Gustavo Fragas Cunha',
  officialTitle: 'Desenvolvedor III',
  displayTitle: 'Desenvolvedor III',
  headline: 'Backend, APIs e integrações com evidência.',
  summary:
    'Trabalho com C#/.NET, TypeScript/Node.js e AWS para tornar integrações rastreáveis, testáveis e seguras — do contrato da API à evidência de release.',
  image: '/images/profile.jpg',
  email: 'gustavofragascunha@gmail.com',
  phoneLink: 'https://wa.me/5511980192710',
  linkedIn: 'https://linkedin.com/in/gustavofragascunha',
  gitHub: 'https://github.com/GustavoFragas',
  location: 'São Paulo, Brasil',
};

export const navItems = [
  { label: 'Início', href: '#home' },
  { label: 'Evidências', href: '#evidencias' },
  { label: 'Cases', href: '#cases' },
  { label: 'Capacidades', href: '#capacidades' },
  { label: 'Trajetória', href: '#trajetoria' },
];

export const evidenceRows = [
  ['Backend/API', 'Serviços e integrações com C#/.NET, TypeScript/Node.js e APIs SaaS.', 'Escopo revisado, documentação técnica e validação antes de release.'],
  ['Dados', 'Deduplicação, freshness, backfill, limites de API e rastreabilidade de coleta.', 'Comparação paralela e acompanhamento de sincronização quando aplicável.'],
  ['AWS/Delivery', 'Amplify, Lambda, S3, SQS, EventBridge, Athena, QuickSight e App Runner.', 'Testes locais, revisão de configuração e evidência RTM sob liderança técnica.'],
  ['Validação', 'SQS/DLQ com consumo, visibility timeout, retries e redrive em ambiente local.', 'Cenários decisivos executados antes de encaminhamento para homologação.'],
  ['Engenharia com IA', 'Cadeias de agentes e subagentes, MCPs e Learning Loop aplicados à implementação, análise e revisão.', 'Responsabilidade humana por escopo, código, testes, documentação, evidências e gates.'],
] as const;

export const cases = [
  {
    title: 'Plataforma interna de telemetria e qualidade de dados',
    label: 'Case profissional anonimizado',
    problem:
      'Fluxos internos precisavam preservar telemetria e qualidade de dados em meio a limites de API, armazenamento, cardinalidade, ruído de origem e freshness.',
    constraints: [
      'Sem exposição de cliente, URL interna, payload, IDs, métricas confidenciais ou PII.',
      'Operação sujeita a limites de APIs SaaS e janelas de retenção configuradas no ambiente.',
      'Necessidade de rastreabilidade e isolamento de falhas por fonte/coletor.',
    ],
    responsibility:
      'Evolução de fluxos de coleta, integração, qualidade de dados e validação; publicação de frontend no AWS Amplify; trabalho backend sob orientação de liderança técnica.',
    decisions: [
      'Migração controlada de ElastiCache/Redis para snapshots no Amazon S3 com expiração de 90 dias.',
      'Fallback para último snapshot válido e visão interna de sincronização durante a transição.',
      'Credenciais separadas por coletor/função para menor privilégio, diagnóstico por fonte e isolamento de falhas.',
      'Integração Datadog -> Notion com processamento agendado via Amazon EventBridge.',
    ],
    validation: [
      'Validação paralela antes da retirada do cache anterior.',
      'Testes locais com SQS/DLQ cobrindo consumo, visibility timeout, retries e redrive.',
      'Evidências RTM e encaminhamento para homologação quando o escopo exigiu.',
    ],
    tools: ['C#/.NET', 'TypeScript/Node.js', 'Lambda', 'S3', 'SQS/DLQ', 'EventBridge', 'Datadog', 'Notion API'],
    caveat: 'Anonimizado por confidencialidade; sem métricas ou detalhes internos.',
  },
  {
    title: 'Serviço enterprise de notificações assíncronas',
    label: 'Case profissional anonimizado',
    problem:
      'Um serviço precisava validar requisições, enfileirar callbacks e tratar falhas sem bloquear a API nem expor dados sensíveis nos logs.',
    constraints: [
      'Domínio, cliente, endpoints, payloads e topologia interna mantidos anônimos.',
      'Configuração dependente de variáveis de ambiente e filas provisionadas por outras equipes.',
      'Atuação sob orientação da liderança técnica e dentro do fluxo de homologação.',
    ],
    responsibility:
      'Atuei na documentação e evolução do fluxo backend, na configuração de ambiente e na validação local, incluindo controller/use case, enfileiramento SQS FIFO, mascaramento de logs e tratamento global de exceções.',
    decisions: [
      'Separação entre a resposta síncrona da API e o processamento assíncrono do callback.',
      'Fila FIFO para preservar ordenação e deduplicação compatível com o contrato do serviço.',
      'Mascaramento de campos sensíveis e tratamento consistente de exceções nos logs.',
    ],
    validation: [
      'Specs para controller, caso de uso, fila, logger, mascaramento e filtro global de exceções.',
      'Testes locais do fluxo de consumo, retry e encaminhamento para DLQ.',
      'Evidências técnicas antes da promoção entre ambientes.',
    ],
    tools: ['TypeScript', 'API REST', 'SQS FIFO', 'DLQ', 'Jest', 'Logs estruturados'],
    caveat: 'Case severamente anonimizado por confidencialidade; sem cliente, domínio funcional ou arquitetura interna.',
  },
  {
    title: 'Sincronização bidirecional entre plataformas SaaS',
    label: 'Integração técnica',
    problem:
      'Manter propriedades equivalentes sincronizadas entre duas plataformas SaaS sem criar loops, duplicidades ou divergências silenciosas.',
    constraints: [
      'APIs externas com limites de requisição e formatos diferentes.',
      'Eventos originados nos dois lados do fluxo.',
      'Resultado de latência medido apenas em ambiente local controlado.',
    ],
    responsibility:
      'Implementei handlers de webhook e o fluxo de leitura, normalização, comparação e escrita nos dois sentidos, com apoio de IA e revisão humana.',
    decisions: [
      'Normalização de identificadores antes da comparação.',
      'Registro de sincronizações recentes para impedir o efeito ping-pong entre webhooks.',
      'Separação explícita entre transformação de dados e escrita em cada API.',
    ],
    validation: [
      'Validação local dos dois sentidos da sincronização.',
      'Em teste local controlado, o feedback observado caiu de até 60 segundos para menos de 2 segundos.',
      'Caveat público preservado para não transformar laboratório em promessa de produção.',
    ],
    tools: ['TypeScript', 'Node.js', 'Webhooks', 'Notion API', 'Monday API'],
    caveat: 'Teste controlado local; não representa garantia de latência ou confiabilidade em produção.',
  },
  {
    title: 'ATS Optimizer',
    label: 'Projeto pessoal com IA assistida',
    problem: 'Avaliar alinhamento entre currículo e vaga sem fabricar experiências ou inflar responsabilidades.',
    constraints: ['Preservar verdade factual do candidato.', 'Sugestões de IA exigem revisão humana.', 'Testes com dados reais antes de confiar no fluxo.'],
    responsibility:
      'Defini problema, UX, critérios de aceitação, testes com dados reais, revisão e refinamento; parte da implementação em React, TypeScript e .NET teve apoio de IA.',
    decisions: ['Critérios anti-alucinação.', 'Fluxo centrado em alinhamento factual.', 'Revisão humana antes de aceitar recomendações.'],
    validation: ['Testes com dados reais.', 'Revisão manual das sugestões.', 'Critérios de aceite para não inventar experiência.'],
    tools: ['React', 'TypeScript', '.NET', 'PDF Parsing', 'LLM assistido'],
    link: 'https://github.com/GustavoFragas/ats-optimizer',
  },
];

export const capabilities = [
  ['Backend e APIs', 'Construção de serviços, endpoints e integrações com preocupação de contrato, validação e manutenção.', 'C#, .NET, ASP.NET Core, API REST, TypeScript, Node.js', 'Documentação técnica, revisão e testes proporcionais ao risco.'],
  ['Integrações SaaS', 'Fluxos com Notion, Datadog, DocuSign CLM e APIs SaaS em rotinas internas.', 'Notion API, Datadog, DocuSign CLM, Webhooks, EventBridge', 'Tratamento de erro, rastreabilidade e isolamento por fonte.'],
  ['Qualidade de dados', 'Deduplicação, freshness, backfill, limites de armazenamento e ruído de telemetria.', 'SQL, Athena, S3, QuickSight, Data Quality', 'Comparação, reconciliação e acompanhamento de sincronização.'],
  ['AWS e entrega', 'Publicação de frontend no Amplify e uso/revisão de workloads em App Runner, Lambda, S3 e SQS.', 'AWS Amplify, Lambda, S3, SQS/DLQ, App Runner, GitHub Actions, Docker', 'Builds, testes locais, revisão de configuração e evidência de release.'],
  ['Observabilidade e validação', 'Rotinas para preservar telemetria, reduzir ruído e tornar execuções rastreáveis.', 'Datadog, Sonar, Gitleaks, RTM, testes de integração', 'Cenários decisivos, logs/evidências e encaminhamento para homologação.'],
  ['Engenharia com agentes', 'Cadeias de agentes e subagentes, MCPs e Learning Loop para dividir contexto, revisar entregas e transformar falhas reais em prevenção reutilizável.', 'Codex, Kiro, MCP, agentes especializados, Learning Loop', 'Escopo, revisão técnica, testes, evidências e decisão final continuam sob responsabilidade humana.'],
] as const;

export const experiences = [
  ['mar/2026 - atual', 'Alest', 'Desenvolvedor III', ['Efetivado em 30/03/2026; Dev II em 14/05/2026; Dev III em 01/06/2026.', 'Plataformas internas de dados e telemetria, integrações SaaS e serviços backend enterprise.', 'Documentação, configuração, mensageria, testes locais, validação em dev e evidências RTM sob liderança técnica.'], 'https://alest.com.br/'],
  ['out/2025 - mar/2026', 'Alest', 'Estagiário de Desenvolvimento de Software', ['Apoio em integrações e automações internas com C#/.NET, TypeScript/Node.js e APIs SaaS.', 'Participação nas etapas iniciais de plataforma interna de telemetria/dados.', 'Flows no DocuSign CLM com foco em validação, rastreabilidade e tratamento de erros.'], 'https://alest.com.br/'],
  ['ago/2025 - out/2025', 'Atento', 'Suporte bilíngue em espanhol', ['Atendimento e suporte a clientes em espanhol, com comunicação, triagem e acompanhamento de solicitações.'], 'https://atento.com/pb/atentonomundo/brasil'],
  ['mar/2023 - abr/2025', 'Argentina', 'Serviço voluntário de tempo integral', ['Atuação comunitária em contexto multicultural, com rotina diária de comunicação em espanhol.', 'Visitas, organização de agenda, acompanhamento de pessoas e colaboração com equipes locais.', 'Experiência internacional que consolidou fluência em espanhol, adaptação cultural e comunicação clara.'], null],
  ['mar/2021 - nov/2022', 'Beneficência Portuguesa de São Paulo', 'Jovem Aprendiz', ['Experiência inicial de ambiente corporativo, rotina operacional e comunicação com áreas internas.'], 'https://www.bp.org.br/'],
] as const;

export const education = [
  ['mai/2025 - dez/2027', 'Brigham Young University-Idaho', 'Bachelor of Science, Software Development'],
  ['out/2025 - jul/2027', 'UFBRA', 'Tecnologia em Análise e Desenvolvimento de Sistemas'],
  ['fev/2020 - nov/2022', 'ETEC Parque Belém', 'Técnico em Desenvolvimento de Sistemas'],
] as const;

export const languages = [
  ['Português', 'Nativo'],
  ['Espanhol', 'Fluente'],
  ['Inglês', 'B2'],
] as const;

export const credentials = [
  ['LingoPass', 'Inglês B2 Advanced', '/certificates/Lingopass certificate B2 Advanced.pdf'],
  ['Notion', 'Notion Certified Admin', 'https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946'],
  ['DIO', 'Versionamento de Código com Git e GitHub', '/certificates/Versionamento de Código com Git e GitHub.pdf'],
] as const;
