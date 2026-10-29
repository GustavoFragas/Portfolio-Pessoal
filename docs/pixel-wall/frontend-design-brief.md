# Frontend design brief — "Parede de pixels"

Branch: `feat/portfolio-pixel-wall` · 26/10/2026 · frontendMode: `authorial`

## Por que esta direção

As cinco versões anteriores foram rejeitadas. As duas últimas usaram retrato gerado por IA
(ilustração "ink" e recorte reconstruído), e é exatamente isso que dá a "cara de IA". O
conteúdo também lê como relatório de auditoria ("Prova por domínio, não por adjetivo",
"SISTEMA VIVO / 01", "Dossiês de decisão").

A foto original (`client/public/images/profile.jpg`, 1200×1600) foi tirada no AWS Summit
LATAM em frente a um painel de pixels rosa e azul-escuro. Esse painel é o ativo de marca
que já existe e é só dele. A direção nasce dele: **a parede vira o Gustavo**.

## Tese visual

O hero inteiro é uma parede de azulejos quadrados (o mesmo padrão do painel). A foto real
do Gustavo está "embutida" na parede como um mosaico vivo: ao carregar, os azulejos viram
como peças físicas e montam o retrato; o cursor funciona como uma lente que aumenta a
resolução (o rosto fica nítido onde você aponta); ao rolar, a parede se desmonta azulejo
por azulejo, o fundo vira papel e o retrato termina nítido ao lado do "Sobre".

Tudo no site usa o mesmo módulo quadrado: retrato, divisórias, cards de projeto,
credenciais (azulejos que viram) e o rodapé (a parede volta como fechamento).

## Mecânicas emprestadas (sem copiar código/arte)

| Referência | Mecânica estudada (REA 24 e 26/10) | Como aparece aqui |
|---|---|---|
| Ryan | Um único progresso de scroll leva o mesmo retrato da abertura para o "Sobre"; badges com frente/verso CSS3D | Scroll story única: parede → papel, retrato vai para o lado do Sobre. Credenciais como azulejos que viram |
| Nickho | Sequência de quadros em Canvas2D, carregamento incremental, `respectReducedMotion`, fallback | Retrato em Canvas2D (sem WebGL), fallback `<img>`, movimento reduzido estático |
| Meer | Cursor como fonte de luz/fluido sobre a cena | Cursor como lente de resolução sobre o mosaico |
| Trevor | Paleta azul-marinho + rosa; objetos ligados ao trabalho | Paleta vem da própria foto; projetos como azulejos |

## Paleta (amostrada da foto)

| Token | Valor | Uso |
|---|---|---|
| `--wall-ink` | `#160F29` | azulejos escuros, fundo do hero e do rodapé |
| `--wall-navy` | `#22163A` | azulejos escuros secundários |
| `--wall-pink` | `#EC4385` | azulejos rosa, acento principal |
| `--wall-pink-soft` | `#F6A3C4` | azulejos claros, hover |
| `--sweater` | `#7A2326` | acento raro (detalhes) |
| `--paper` | `#F4EEE6` | fundo do conteúdo |
| `--ink` | `#160F29` | texto sobre papel |

Sem gradientes, glow, glassmorphism ou neon. Superfícies chapadas com rejunte (gap) entre
azulejos. Contraste: texto normal ≥ 4.5:1; display ≥ 3:1. Rosa `#EC4385` sobre papel não
passa 4.5:1 para texto pequeno — usar rosa só em display/elementos gráficos ou escurecer.

## Tipografia

Mona Sans Variable (já instalada, eixo `wdth` 75–125). Nome em display largo e pesado
(`wdth` 125, peso 800–900), caixa alta, entrelinha apertada. Texto corrido em Mona Sans
normal. JetBrains Mono no máximo em 1–2 microrrótulos; não espalhar rótulos mono.

## Elemento de assinatura: `PixelWall` (Canvas2D)

Componente único, `aria-hidden`, sobre um `<img>` de fallback (foto original, mesmo recorte,
`alt` descritivo). Se o canvas falhar ou a imagem não carregar, o `<img>` e o texto
continuam úteis. Nunca tela preta, nunca intro obrigatória, conteúdo nunca depende do canvas.

- **Grade**: azulejo `T` ≈ 12 px desktop / 9 px mobile (CSS px), rejunte 1.5 px na cor
  `--wall-ink`. Render em `devicePixelRatio` limitado a 2.
- **Parede procedural**: cor por azulejo determinística (hash col/linha + ruído em blocos
  retangulares, como o painel real): ~55 % navy/ink, ~32 % rosa, ~10 % rosa claro. Zona do
  texto (esquerda no desktop, base no mobile) com densidade de rosa bem menor para manter o
  texto legível.
- **Região da foto**: recorte do original em coordenadas da fonte `x 120–820, y 440–1340`
  (exclui o logo AWS). Desktop: região à direita do centro, ~86svh de altura. Mobile: topo
  centralizado, ~60svh. As bordas da região se misturam com a parede (azulejos da borda
  sorteiam parede ou foto) — o Gustavo sai da parede, não fica num retângulo.
- **Render barato**: amostrar parede+foto num canvas offscreen de 1 pixel por azulejo e
  desenhar com `imageSmoothingEnabled = false` escalado; rejunte via `createPattern`.
  Efeitos por azulejo (virada, lente) só onde há animação.
- **Entrada (≤ 1.2 s, não bloqueia)**: azulejos começam como parede e viram (escala Y
  1→0→1, troca de cor no meio, leve sombreamento) para a cor da foto numa onda diagonal.
- **Lente (ponteiro fino)**: raio ~150 px com posição/raio suavizados. Dentro: nível `T/2`;
  0.6R: `T/4`; 0.3R: foto em resolução cheia. Azulejos do anel externo "levantam" (escala
  1.12 + sombra deslocada). Toque: lente segue o dedo enquanto pressionado
  (`touch-action: pan-y`), some ao soltar.
- **Respiração**: 1–2 % dos azulejos da parede viram para outra cor da paleta e voltam,
  ~12 fps. Pausa fora da viewport (IntersectionObserver) e com aba oculta.
- **Scroll story**: contêiner `220svh` (mobile `170svh`) com palco `position: sticky`.
  Progresso `p` 0→1 num único rAF:
  - azulejos da parede viram para `--paper` quando `p` passa do limiar de cada um
    (0.12 + 0.5 × ruído): a parede se desmonta;
  - azulejo da foto `T → 2 px` (retrato fica nítido) enquanto a região vai para a posição
    do Sobre (esquerda, menor);
  - texto do hero sai (p < 0.3); texto do Sobre (DOM real, já presente no HTML) entra à
    direita (0.45–0.7) em `--ink` sobre papel.
- **Movimento reduzido**: sem entrada, respiração, lente animada ou morph; hero estático
  com retrato nítido e franja de azulejos; Sobre em fluxo normal.

## Layout (fingerprint)

`full-bleed tile wall hero → sticky dissolve to paper → about beside resolved portrait →
numbered project rows → flip-tile credentials → wall footer bookend`

Proibido: sidebar, faixa de KPIs, grade genérica de cards, terminal/telemetria fake,
diagrama de "sistema vivo", badges/pílulas mono espalhadas.

- **Topbar**: transparente sobre a parede; vira papel com borda depois do hero. Links:
  Sobre, Projetos, Trajetória, Contato + PT/EN/ES. Menu mobile existente preservado.
- **Hero**: "Oi, eu sou o" pequeno + `GUSTAVO` gigante (+ `FRAGAS` menor ou na linha de
  baixo) em `--paper` sobre a zona calma; uma frase; CTAs "Ver projetos" e "Falar comigo";
  dica discreta "passe o mouse no mosaico" (só ponteiro fino) / "toque no mosaico".
- **Projetos**: linhas numeradas grandes (01, 02…), título, uma frase natural, ferramentas
  em texto corrido; detalhes (problema / o que eu fiz / como validei) em
  `<details><summary>` acessível. Hover/focus: faixa de azulejos vira em onda atrás da linha.
- **Credenciais**: azulejos quadrados CSS3D com frente (arte do emissor) e verso (nome +
  emissor), viram no hover/focus e com toque; sem link inventado (só Notion tem Credly).
- **Contato/rodapé**: a parede volta (versão estática/leve do mosaico, sem foto) com
  "Bora conversar?" e e-mail/WhatsApp/LinkedIn/GitHub grandes.
- Demais seções (ferramentas, trajetória, formação, idiomas): mesma tipografia e tokens,
  sem tabelas de "matriz de evidência".

## Copy (natural, PT/EN/ES)

Voz em primeira pessoa, informal e direta. Exemplos PT:

- Hero: "Oi, eu sou o" / "GUSTAVO FRAGAS" / "Desenvolvedor pleno na Alest. Faço sistemas
  conversarem — APIs, filas, integrações e a nuvem por trás. Meu próximo passo é DevOps."
- Sobre: "Entrei na Alest como estagiário em outubro de 2025 e virei pleno em 2026. Antes
  disso, passei dois anos na Argentina em serviço voluntário — daí o espanhol fluente."
- Projetos: "Coisas que eu construí" / Contato: "Bora conversar?"

Fatos só de `portfolioContent.ts`/`CONTEXTO.md`. Não inventar cargo, métrica, diploma ou
link. Cases profissionais continuam anonimizados. Título público: "Desenvolvedor Pleno"
(nunca sênior). Nunca "Open to Work". EN/ES com o mesmo tom, não tradução literal.

## Fora de escopo

Deploy, push, merge, nova dependência, Three.js/WebGL novo, assets de terceiros, imagem
gerada por IA, alteração de backend .NET, `vercel.json`.

## Critérios de aceite

1. Desktop 1440×900 e mobile 390×844: hero com retrato reconhecível acima da dobra, nome e
   CTA visíveis, sem texto cortado/sobreposto/fora da tela.
2. Lente funciona com mouse e toque; entrada termina ≤ 1.2 s; nada bloqueia scroll/clique.
3. Scroll story: em 0/25/50/75/100 % a parede se desmonta, o retrato fica nítido e o Sobre
   aparece legível; sem scroll travado.
4. `prefers-reduced-motion: reduce` → versão estática completa.
5. Canvas desabilitado/erro → `<img>` + conteúdo completos.
6. Teclado: skip link, foco visível, `<details>` operável, credenciais viram no foco.
7. PT/EN/ES completos para todo texto novo.
8. `npm run lint` e `npm run build` verdes; bundle inicial não maior que o atual.
9. Revisão visual independente sem aspecto genérico/"cara de IA".

## Rodada 2 — pedido do Gustavo (27/10/2026)

Gustavo aprovou o começo (hero, lente, parede, story até o Sobre) — **preservar como está**.
Mudanças pedidas:

1. **Certificações também no começo.** "É o que muda o jogo." Manter a seção do fim, mas mostrar
   as credenciais principais logo no início: fileira compacta no hero (AWS DevOps Engineer –
   Professional, Google Cloud Generative AI Leader, BYU–Idaho) visível acima da dobra no desktop e
   logo abaixo dos CTAs no mobile, sem poluir o hero aprovado.
2. **Novo certificado acadêmico (fonte primária conferida):** BYU–Idaho, *Certificate in Web &
   Computer Programming*, concluído em 15/08/2026 (eCertificate certificado em 24/09/2026).
   Arquivo original: `~/Downloads/30-Documentos/9359543_eDiploma.pdf`. É certificado, não diploma
   de bacharelado; o BS continua "em andamento". Pode linkar uma cópia do PDF em
   `client/public/certificates/`. **Atualizado a pedido do Gustavo:** BYU–Idaho, LingoPass e
   DIO usam as logos oficiais extraídas dos próprios certificados
   (`client/public/certificates/logos/`, procedência em `docs/pixel-wall/asset-sources.md`),
   sobre superfície clara, sem sugerir endosso.
3. **Credenciais com "mais coisa".** Seção do fim mais rica: azulejos 3D com espessura real
   (borda extrudada CSS3D), flutuação ociosa, giro por arrasto/ponteiro, entrada em que os
   azulejos da parede montam cada badge, verso com nome, emissor, data só quando conhecida e
   uma frase simples do que a credencial comprova. Sem data ou link inventado.
4. **Projetos fáceis de entender.** Teste: um recrutador sem formação técnica entende em 10 s o
   que é cada projeto e o que o Gustavo fez. Por projeto: título simples, "o que é" em
   linguagem do dia a dia, problema → o que eu fiz → resultado (sem métrica inventada), tags.
   Jargão (snapshot, fallback, coletor, FIFO, DLQ, visibility timeout) só em "Detalhes técnicos"
   expansível. Cases profissionais seguem anonimizados.
5. **Scrollytelling na página inteira.** Projetos em scroll horizontal guiado pelo scroll
   vertical (seção fixada, trilho horizontal, indicador de progresso em azulejos). Demais seções
   com coreografia ligada ao scroll na linguagem dos azulejos: títulos que se montam,
   trajetória Estagiário → Júnior → Pleno que acende passo a passo, ferramentas e idiomas que
   entram por azulejos, contato em que a parede se remonta (espelho do hero).
   Limites: sem sequestrar a roda do mouse; trechos fixados curtos; teclado precisa levar o
   painel focado para a vista; mobile funcional (trilho horizontal ou empilhado); movimento
   reduzido = versão estática empilhada; navegadores sem suporte = estático completo.

6. **Menu cinético** (referência: 21st.dev "Sterling Gate: Kinetic Navigation", enviada pelo
   Gustavo). Recriar o comportamento com código próprio usando `motion` (já instalado), sem
   GSAP, sem shadcn e sem colar o componente:
   - botão "Menu +" no canto superior direito em todos os breakpoints; o texto troca para
     "Fechar" deslizando na vertical e o + gira 315° até virar ×;
   - ao abrir, overlay escurece e três painéis entram da direita em cascata
     (`--wall-ink`, `--wall-pink`, `--paper`); o último recebe o menu;
   - links grandes em Mona Sans condensada (`wdth` 75), caixa alta, entrando de baixo com leve
     rotação em cascata: Sobre, Certificações, Projetos, Trajetória, Contato + PT/EN/ES;
   - hover/foco: faixa clara atrás do link e formas de azulejo (blocos rosa/azul) que surgem no
     fundo do painel, uma composição por link, no lugar dos círculos e blobs da referência;
   - acessível: `aria-expanded` e `aria-controls`, foco preso no menu, Esc e clique no overlay
     fecham, foco volta ao botão, link fecha o menu e rola até a seção;
   - movimento reduzido: abre e fecha só com fade.
   Sem o rótulo manuscrito "click me" (exigiria fonte nova).

## Rodada 3 — pedido do Gustavo (27/10/2026)

1. **Trajetória pública** (decisão do Gustavo): Estagiário out/2025–mar/2026 · Júnior
   mar/2026–out/2026 (efetivado em 30/03/2026) · **Pleno desde out/2026**. Tirar do texto público
   as datas internas Dev II (14/05) e Dev III (01/06), que contradizem essa trilha.
2. **Transição hero → Sobre obrigatória.** Scroll rápido hoje pula a animação. Primeira intenção
   de descer a partir do hero (roda, swipe, PageDown/Espaço/seta) dispara a transição completa
   em tempo (~1,2–1,5 s) com a rolagem travada e levada até o Sobre; depois libera. Subindo do
   Sobre, o mesmo ao contrário. Âncoras (menu, CTAs, skip link, foco por Tab) pulam direto, sem
   trava. Movimento reduzido: sem trava, como hoje.
3. **Scroll horizontal visível.** O trilho precisa aparecer em notebooks comuns (largura ≥ 1024
   e altura de viewport ≥ ~600, ex. MacBook com o navegador aberto), com o conteúdo cabendo por
   tipografia/espaço em função da altura e os "Detalhes técnicos" abrindo fora do trilho, sem
   rolagem interna. Abaixo de 1024 de largura (celular, painel estreito): carrossel horizontal
   nativo por swipe com `scroll-snap-type: x`, indicador em azulejos e botões anterior/próximo.
   Lista empilhada só com movimento reduzido.

**Proibido nesta rodada:** commit, push, merge ou deploy. Alterações ficam no working tree
para o Gustavo ver primeiro.

## Rodada 4 — pedido do Gustavo (28/10/2026)

frontendMode continua `authorial`. A tese, o hero aprovado, a lente, o storyGlide e a
transição hero → Sobre ficam como estão; muda o que está listado abaixo.

**Linha de base medida antes de qualquer código** (prints, probe do Zen e medição do menu em
`outputs/portfolio-pixel-wall-2026-10-26/round-5/before/`):

- Zen/Gecko 1440×900: `.project-list` com `scrollWidth` = 14578 px para 4 cards de 960 px
  (último card termina em ~4030 px). O trilho anda ~3,5× demais e os cards somem da tela.
- Menu cinético no Chrome 1440×900, 4 ciclos abrir/fechar: com CPU 1× máx. 33 ms por frame,
  0 frame > 50 ms; com CPU 4× (notebook médio) máx. 200 ms, 8 frames > 50 ms, 10 long tasks
  (844 ms). Dentro das tasks: recálculo de estilo do documento inteiro (`UpdateLayoutTree`
  40–60 ms por abertura/fechamento), commit do React 30–60 ms e o frame da parede de pixels.

### Decisões

1. **Trilho de projetos (P0).** Cards do trilho com largura definida (`flex: none` e
   largura explícita em função de vw/altura) e overflow medido pela borda direita do último
   card + padding final, nunca por `scrollWidth`. O carrossel (< 1024 px) também não depende de
   `scrollWidth` inflado. Sem regressão no Chrome.
2. **Ícones 3D na fileira de certificações do hero.** Técnica estudada no portfólio do Ryan
   (`.certification-badge`, só como referência; nenhum código copiado): perspectiva no
   container, flutuação lenta, giro contínuo em Y com duração escalonada por badge, espessura
   por camadas empilhadas em Z com a própria arte como máscara (PNG opaco vira uma placa
   retangular com borda, que é o comportamento correto), face frontal e traseira, sombra no
   chão em azulejos (identidade pixel), cor da espessura por emissor. Pausa fora da tela, com
   o menu aberto e no hover; movimento reduzido = estático de frente. Só `transform`/`opacity`
   animados.
3. **Site inteiro escuro.** Fundo das seções em `--wall-ink` / `--wall-navy` alternando,
   texto `--paper`, rosa como acento. Feito por tokens semânticos (abaixo); o mapeamento claro
   antigo fica num único bloco comentado, de modo que reverter é trocar um bloco. A parede do
   hero se desmonta para a superfície escura do Sobre (mesma mecânica e mesmo progresso; muda só
   a cor de destino); o contato se remonta a partir da mesma superfície. As placas claras das
   logos oficiais (BYU–Idaho, LingoPass, DIO) continuam claras. Painel final do menu cinético
   continua `--paper`: é a única superfície clara que sobra e marca a camada nova sobre o site
   escuro.
4. **Menu cinético fluido.** Mesmo visual. Animações de painel e links só em `transform` /
   `opacity` compostos (sem `x`/`y`/`rotate` independentes no main thread); a parede de pixels
   pausa enquanto o menu está aberto; abrir o menu não muda a largura útil da página
   (`scrollbar-gutter` ou equivalente) nem dispara resize do canvas; trabalho pesado (`inert`,
   classes no `html`) fora dos frames da animação ou com escopo menor; chunk pré-carregado no
   hover/foco/idle.
5. **Rodapé 8-bit.** Componente próprio (sem shadcn/cva), inspirado no "8bit-navigation-menu"
   do 8bitcn: gatilhos com chevron que gira, painel com borda pixelada por `box-shadow` em
   degraus nos 4 lados, fonte "Press Start 2P" (OFL, self-host com `@font-face`,
   `unicode-range`, `font-display: swap`) usada só no rodapé. Grupos: Navegar (seções),
   Contato (e-mail, LinkedIn, GitHub do perfil) e link direto de volta ao topo em linguagem de
   game sem infantilizar, PT/EN/ES. Clique/toque/teclado (nunca só hover), `aria-expanded`,
   Esc e clique fora fecham, no mobile os painéis abrem para cima e cabem na tela.
6. **Conteúdo.**
   - Argentina: continua "serviço voluntário" no texto visível, sem frase religiosa. O link da
     entrada aponta para o site oficial da Igreja no idioma (PT `?lang=por`, EN `?lang=eng`,
     ES `?lang=spa`, URLs confirmadas). Nome acessível honesto contendo o texto visível
     (WCAG 2.5.3), ex.: "Argentina — site da Igreja de Jesus Cristo dos Santos dos Últimos
     Dias (abre em nova aba)", com `title` igual. No Sobre, "serviço voluntário" pode virar
     link discreto para o mesmo site.
   - Estudos: duas graduações + DIO, escaneável por recrutador: Bacharelado em
     Desenvolvimento de Software (BYU–Idaho, online via BYU‑Pathway; nunca "Engenharia de
     Software"), Tecnologia em Análise e Desenvolvimento de Sistemas (UFBRA, out/2025 –
     jul/2027) e DIO (trilhas/bootcamps, dio.me). Linha "Estudando" do Sobre e seção "Ainda
     estudando" atualizadas.
   - "Desarrollador Semi Senior" (ES) fica.
   - Prêmios da Alest: um único item verificado → **monday.com Partner of the Year — LATAM**
     (6º Partner Summit, fev/2026; release oficial de 17/02/2026 no Business Wire:
     https://www.businesswire.com/news/home/20260217722947/en/monday.com-Reinforces-AI-First-Work-Platform-With-Expanded-Partner-Program ;
     cobertura independente: https://channellife.news/story/monday-com-boosts-ai-first-partner-drive-with-new-perks ).
     Uma linha discreta ligada à Alest, enquadrada como conquista do time no período em que ele
     faz parte, com data e link da fonte em nova aba e nome acessível. Estrutura de lista para
     acrescentar outros depois (ex.: Done Awards da monday.com, 29/10/2026). Sem bloco grande.
     Fora: "Advanced Delivery Partner" (é tier, não prêmio) e "Best professional services
     partner LATAM" (2024, fora da janela).
   - ATS Optimizer: print real da tela de upload (repositório público
     github.com/GustavoFragas/ats-optimizer), otimizado (~1200 px, ≤ 150 KB) em
     `client/public/projects/`, mostrado no drawer de detalhes (lugar seguro para o trilho),
     com `alt` descritivo, `loading="lazy"`, `width`/`height`.
7. **Limpeza pré-publicação.** JSON-LD `jobTitle` → "Desenvolvedor Pleno" com o hash
   SHA-256 do script inline recalculado em `vercel.json` (`script-src`), conferido também no
   `client/dist/index.html`. Favicon pixel da marca (mark de 2×2 azulejos ou monograma "G",
   legível a 16 px): `favicon.svg`, `apple-touch-icon.png` 180×180 e `favicon-32.png`.
   Esta rodada autoriza a alteração de `vercel.json` (antes fora de escopo), só no hash.

### Contratos entre autores

- **Tokens semânticos** (definidos em `:root` no `index.css`; quem escreve CSS novo usa estes
  nomes, com fallback para o valor claro enquanto o tema não entra):
  `--surface` (fundo padrão), `--surface-alt` (seção alternada), `--surface-raised`
  (card/drawer/painel), `--text`, `--text-soft` (≥ 4.5:1 sobre as três superfícies),
  `--line` (fio fino), `--rule` (fio forte), `--accent` (`--wall-pink`; texto pequeno só
  sobre `--surface`, 5,0:1; sobre navy dá 4,6:1), `--accent-soft` (`--wall-pink-soft`) e
  `--focus` (anel visível ≥ 3:1 contra o fundo adjacente).
- O rodapé novo mantém o elemento raiz `<footer class="site-footer …">` (o menu cinético o
  marca como `inert` enquanto aberto).
- O case do ATS Optimizer ganha o campo opcional
  `shot?: { src: string; width: number; height: number; alt: string }` em `CaseItem`
  (PT/EN/ES); o drawer de detalhes renderiza quando existir.
- CSS de componente novo fica em arquivo próprio importado pelo componente
  (`client/src/styles/*.css`), usando os tokens acima.

### Critérios de aceite da Rodada 4

1. Zen (Gecko) 1440×900: `--rail-p` 0 → 1 leva o primeiro card do início ao último card
   terminando encostado no fim do palco (borda direita do último card + padding = largura do
   palco, ± 2 px); nenhum card some antes da hora. Chrome idem, sem regressão em 1280×720 e no
   carrossel < 1024 px.
2. Menu cinético, Chrome 1440×900 com CPU 4×, chunk já carregado: nenhum frame > 50 ms ao
   abrir/fechar (medido com o mesmo script da linha de base); 1× sem regressão; Zen sem
   travadas visíveis. Mesmo visual, foco preso, Esc/overlay fecham, foco volta ao botão,
   movimento reduzido só com fade.
3. Badges 3D girando na fileira do hero (desktop) e na fileira pós-story (mobile), pausando
   fora da tela, com o menu aberto e no hover; movimento reduzido estático; hero aprovado sem
   texto cortado em 1440×900, 1280×720 e 390×844.
4. Todas as seções escuras; contraste ≥ 4.5:1 em todo texto (≥ 3:1 em display e foco); foco
   visível no escuro; transição hero → Sobre e storyGlide intactos.
5. Rodapé 8-bit operável por mouse, toque e teclado; Esc e clique fora fecham; painéis
   cabem em 390 px abrindo para cima; fonte pixel só no rodapé, servida do próprio domínio.
6. Conteúdo PT/EN/ES: link da Argentina honesto, duas graduações + DIO, linha do prêmio com
   fonte e data, print do ATS no drawer.
7. `index.html`/`vercel.json`: hash recalculado bate com o script inline do arquivo final e do
   `dist`; favicons novos referenciados.
8. `npm --prefix client run lint` e `npm --prefix client run build` verdes; sem scroll
   horizontal nem texto cortado em 390×844, 1280×720 e 1440×900; movimento reduzido
   respeitado.
9. Revisão independente de design (aberta pelo coordenador depois desta rodada).

**Proibido nesta rodada:** commit, push, merge, deploy, `git stash`, `git reset`,
`git checkout -- <arquivo>` e dependência npm nova.

## Rodada 5 — ajustes do Gustavo vendo o site escuro (28/10/2026)

Entraram na Rodada 4: trilho do Zen corrigido, menu em WAAPI, rodapé 8-bit, conteúdo, badges 3D,
favicon/hash e site inteiro escuro por tokens (`--surface`, `--surface-alt`, `--surface-raised`,
`--surface-tint`, `--text`, `--text-soft`, `--line`, `--rule`, `--mark`, `--accent`,
`--accent-soft`, `--focus`; mapeamento claro antigo comentado no `index.css`).

- **A. Badges 3D:** seguem girando no hover (sai a pausa no hover; realce leve opcional).
  Continuam pausando fora da tela e com o menu aberto; movimento reduzido estático.
- **B. TileReveal sem lascas:** em nenhuma posição de scroll pode sobrar azulejo parcial em volta
  de "Português", "Español", "English" (scaleY parcial deixa lascas claras sobre o escuro) nem dos
  outros títulos com TileReveal. O azulejo some também por opacidade e termina antes, ou o cover
  sai de `.study__language`.
- **C. Logos da Formação sem placa clara:** BYU–Idaho e DIO em versão monocromática clara e
  transparente da marca oficial (filtro só se o PNG tiver alpha, ou asset limpo gerado da marca
  oficial). Sem redesenhar a marca; se não ficar limpo, só o nome.
- **D. Instituições clicáveis na cor do texto** (não rosa), sublinhado/↗ discreto no hover e no
  foco, nova guia com `rel="noopener noreferrer"` e o mesmo sufixo acessível dos outros links.
  URLs verificadas pelo coordenador em 28/10 (200): ETEC Parque Belém
  https://etecparquebelem.cps.sp.gov.br/ · Brigham Young University‑Idaho (as duas entradas)
  https://www.byupathway.edu/ · UFBRA https://ufbra.edu.br/ · DIO https://www.dio.me/ .
- **E. Rodapé:** fica só o "▲ START" (nome acessível "Voltar ao topo" / "Back to top" /
  "Volver arriba"). A linha de baixo vira linha curta na fonte pixel, AA, sem créditos de stack e
  sem aviso de anonimizados: "© 2026 GUSTAVO FRAGAS" à esquerda e "PLAYER 1 · SÃO PAULO" à
  direita, empilhado no mobile (PT/EN/ES; sem piada forçada nem dado inventado).
- **F. Ferramentas › Engenharia com agentes:** "Claude Code, Codex, Kiro, MCP e Learning Loop"
  (PT/EN/ES). Nenhuma outra afirmação nova.
- **G. "Com o time da Alest":** segunda linha discreta, sem link e sem chamar de prêmio:
  PT "Com o time da Alest: case GOL + Zoom Contact Center apresentado no CONAREC 2026 · set/2026";
  EN "With the Alest team: GOL + Zoom Contact Center case presented at CONAREC 2026 · Sep/2026";
  ES "Con el equipo de Alest: caso GOL + Zoom Contact Center presentado en CONAREC 2026 · sep/2026".
  Fonte: post público do Head Brasil e América do Sul da Zoom no LinkedIn e notícia interna da
  Alest de 01/10/2026 (sem artigo público estável, por isso sem link). O "prêmio do Zoom" não
  existe em nenhuma fonte e não entra.

## Rodada 5b — pacote de impacto em Projetos e Trajetória (aprovado pelo Gustavo, 28/10/2026)

**Projetos ("Coisas que eu construí")**

1. **Manchete de resultado** no topo de cada card (≈ 6 palavras), rastreável ao "Resultado" e
   aos "Detalhes técnicos" atuais, sem número nem fato novo. Integração: "60 s → < 2 s" com o
   qualificador visível "em teste local controlado". Demais: mecanismo/efeito (ex.: "Uma fonte cai,
   o painel segue de pé"; "Falhou? Vai para a fila, sem travar nada"; "Só sugere o que é verdade").
2. **Mini-diagrama de arquitetura em pixel** em cada case — elemento de assinatura do pacote:
   blocos/azulejos, setas em degrau, cores dos tokens escuros. Só componentes e fluxos que o case e
   o drawer já dizem (nenhum cliente, sistema interno ou serviço fora do texto). Esboços a
   confirmar contra o texto: monitoramento (fontes isoladas → armazenamento → painel, "última
   versão boa" como fallback); avisos (sistema principal → fila → serviço de avisos → destinos;
   falha → separada para nova tentativa; registros mascarados); integração (plataforma A ⇄
   integração com trava anti-loop ⇄ plataforma B); comparador (currículo + vaga → regras + IA →
   sugestões → revisão humana). SVG inline ou grid CSS, sem dependência nem canvas extra; texto
   alternativo curto ou `aria-hidden` com o fluxo já descrito em texto visível; funciona no
   trilho (≥ 1024×600), no carrossel (< 1024) e na pilha (movimento reduzido); movimento opcional
   e mínimo só com `prefers-reduced-motion: no-preference`; contraste AA.
3. **Ordem nova 01–04:** 01 integração · 02 comparador de currículo (o único com repositório
   público), com o print real do ATS visível no card (webp otimizado, dimensões explícitas, lazy,
   alt) · 03 monitoramento · 04 avisos. Lead da seção ajustado se citar a ordem.
   O trilho continua com largura definida por card e overflow medido pelo último card (fix do
   Zen da Rodada 4).

**Trajetória ("O caminho até aqui")**

4. Manchete da seção: PT "De estagiário a pleno em 12 meses" · EN "From intern to mid-level in
   12 months" · ES "De pasante a semi senior en 12 meses" (out/2025 → out/2026). Escadinha grande e
   legível no desktop e no mobile, com a data de cada degrau.
5. Os três cargos da Alest em destaque, com as linhas "Com o time da Alest" (monday e CONAREC)
   logo abaixo.
6. Atento, Argentina e Jovem Aprendiz numa faixa compacta "Antes da Alest" / "Before Alest" /
   "Antes de Alest": período, papel e lugar em uma linha cada; bullets em disclosure ou removidos;
   Argentina mantém o link discreto da Igreja.

**Fora de escopo sem nova aprovação:** badges além do item A, clique na badge levando ao cartão,
novo card de projeto (Agent Driven Flow) e qualquer texto novo sobre o que ele entrega.

**Contrato de dados de Projetos:** `CaseItem` ganha `key: 'integration' | 'ats' | 'monitoring' |
'alerts'`, `headline: string` e `headlineNote?: string` (PT/EN/ES), e os arrays de cases ficam na
ordem nova. Rótulos dos diagramas ficam em `client/src/data/projectDiagrams.ts`, indexados por
`key` e idioma.

**Critérios de aceite (5 + 5b):** langs sem lascas nos offsets de scroll de referência
(`$SP/r5/langs.cjs`) e nos outros títulos com TileReveal; badges girando no hover; 4 links de
instituição nos 3 idiomas; trilho no Zen e no Chrome (`probe.cjs` e `rail-probe`) verde; contraste AA
também nos diagramas; 1440×900, 1280×720 e 390×844 sem scroll horizontal nem texto cortado;
movimento reduzido completo; lint e build verdes; hash CSP conferido se o `index.html` mudar.

## Rodada 6A — correções da revisão de design, desempenho no celular e paradas do menu (aprovada pelo Gustavo, 28/10/2026)

Revisão de design independente: FIX 7,6/10 (`outputs/.../round-5/design-review/`). A 6B (conteúdo novo,
cards mais enxutos, carrossel do celular) vem depois e mexe nos mesmos arquivos: nesta 6A não muda a
estrutura dos cards de projeto nem o conteúdo da Trajetória além do listado.

1. **Clique no trilho (P1):** o realinhamento do trilho no foco (`onFocusIn`) só roda para foco de
   teclado (`:focus-visible`). Um clique abre o drawer de qualquer card e o `scrollY` não muda (Chrome e
   Zen, 1440×900 e 1280×720).
2. **Idiomas (P1):** sai o TileReveal de `.study__language`; nenhum azulejo sobre o texto em nenhuma
   posição de rolagem (1440 e 390).
3. **Desempenho no celular:** medido com `$SP/r5v/perf.cjs` (dist servido com os headers do Vercel em
   brotli; 390×844, CPU 4×, 4G lento). HEAD → working tree: LCP 3124 → 5276 ms, TBT 247 → 725 ms (long
   task inicial 283 → 520 ms); desktop TBT 28 → 84 ms. Causas: artes de badge em PNG 600×600 e logos
   grandes baixando na carga e disputando banda com o `profile.jpg` (LCP), URLs baixadas 2× (máscara +
   `<img>`), primeiro layout forçado (`sizeFrame`) 359 → 476 ms pelo DOM maior, `updateCarousel` 50 ms.
   Correção: derivados no tamanho de exibição (2× o maior tamanho exibido), uma URL por asset, o que não
   é LCP com `decoding="async"` + `fetchpriority="low"` ou lazy, máscaras fora da tela só perto do
   viewport; `content-visibility: auto` só se não quebrar âncoras/paradas do menu nem a medição do
   trilho; variante menor do `profile.jpg` para telas estreitas só se a parede e o retrato não mudarem.
   **Meta no mesmo harness:** celular LCP ≤ 3,3 s e TBT ≤ 300 ms; desktop sem piora contra HEAD.
4. **Paradas do menu** (o Gustavo testou no Zen): ao navegar para uma seção, o eyebrow/título fica a
   ~24–32 px abaixo da barra do topo; em Credenciais, o máximo da grade visível (1440×900: a primeira
   linha de cards inteira); Contato rola até o fim da página (contato, "Navegar" e START juntos); Sobre e
   Projetos ficam como estão. Mesma regra para os links do rodapé e para a navegação direta por hash.
   Prova em Chrome e Zen, 1440×900, 1280×720 e 390×844, com print de cada parada.
5. **Texto:** manchete da integração "até 60 s → < 2 s" (EN "up to 60 s → < 2 s", ES "hasta 60 s →
   < 2 s"), mantendo o `headlineNote`; sai a redundância "hoje AGORA" / "now now" mantendo o destaque do
   cargo atual (3 idiomas); intro de Ferramentas sem "Sem barrinha de porcentagem" → frase positiva (ex.
   "O que eu uso toda semana no trabalho.", EN/ES no mesmo tom).
6. **Placas bege nas credenciais:** BYU, DIO e LingoPass no tile roxo (`.cred__logo`) recebem o mesmo
   tratamento monocromático claro de `.study__logo--mono`, sem placa, marca legível. O badge 3D da BYU
   no hero fica como está.

**Fechamento:** lint e build verdes; hash CSP conferido se o `index.html` mudar; probe do Zen no trilho;
evidências em `outputs/.../round-6a/`; relatório com antes/depois medido por item.

## Rodada 6B — minimalismo, liderança e detalhes técnicos visuais (aprovada pelo Gustavo, 28/10/2026)

"Quanto mais minimalista, melhor." Fonte única de conteúdo: `claims-6b.md` do coordenador (cliente só
pelo setor). **Situação em 29/10:** o arquivo se perdeu na limpeza do scratchpad após o reboot da
máquina e não foi restaurado; nada que dependa dele entra até ele voltar (linhas L1–L6, cases novos
01 e 06, reescrita da stack e do papel do 02 "plataforma interna", diagrama de liderança do 01, números
novos, eixo trabalho × pessoal do rótulo da integração). Entra agora o que não depende de fato novo.

**Trajetória:** H2 vira "De estagiário a pleno em 12 meses" (EN/ES), sai "O caminho até aqui"; ≥ 1024 px
a escadinha fica ao lado da manchete e em 1280×720 não encosta na dobra. Depois dos cargos da Alest, o
bloco "Liderança na prática" / "Leadership in practice" / "Liderazgo en la práctica": linhas L1–L6
compactas (rótulo curto de tipo, contexto por setor, período, uma frase, uma marca de azulejo por linha;
pendente da fonte) e um único depoimento aprovado, sem nome: PT literal "É o padrão que eu espero de
quem lidera execução técnica — e você entrega isso com consistência." · assinatura "gestor na Alest ·
jul/2026"; EN/ES tradução fiel com a marca discreta "traduzido do português" (EN "translated from
Portuguese", ES "traducido del portugués"); `<figure>`/`<blockquote>`/`<figcaption>`, AA, legível em
390 px. Recomendações do LinkedIn não entram.

**Projetos:** 6 cases na ordem da fonte (01 modernização com time, 02 plataforma interna, 03 ATS,
04 avisos, 05 integração, 06 FragasTokenPulse) — pendente da fonte. Card enxuto: número, rótulo, título,
manchete, uma frase, mini-diagrama, tags e botão de detalhes; problema, o que fiz, resultado e validação
vão para o drawer; no máximo 2 rótulos em caixa alta por card, nunca < 12 px. Drawer visual: diagrama
ampliado que acende passo a passo com legenda de uma linha por nó (movimento reduzido: estático e
numerado; alternativa em texto: lista ordenada), faixa "antes → depois" (uma frase de cada lado),
números verificados em destaque (só os da fonte), stack em chips de azulejo, texto curto; continua
diálogo acessível (foco preso, Esc, foco volta ao gatilho). No case 01, o card mostra o diagrama de
liderança e o drawer o técnico. Print do ATS recortado na área útil, ≥ 360 px no drawer com legenda
curta; no card só se legível. Celular: card enxuto ≤ ~700 px em 390×844, anterior/próximo ao alcance
sem voltar ao topo do card. O fix do trilho no Zen continua (largura definida, deslocamento pela borda
do último card).

**Ajustes finos:** kicker só onde o H2 não diz qual é a seção (F9). Depoimentos além do aprovado: não.

**Contratos:** dados visuais de projeto por `key` e idioma — diagramas de card em
`client/src/data/projectDiagrams.ts` (bundle inicial); diagrama técnico, legendas dos passos, antes → depois,
números e recorte do print em `client/src/data/projectDetails.ts`, carregado sob demanda com o
`TechDrawer.tsx` (prefetch em idle depois das imagens da dobra e no hover/foco do botão; atualizado em
29/10 para tirar ~2,4 kB brotli do JS inicial); dados de Trajetória em `portfolioLocales.ts`
(`ui.experience.leadership`: título, linhas, depoimento).

**Fechamento:** lint, build, probe do Zen no trilho, regressões da 6A (paradas, clique no trilho,
desempenho no mesmo harness sem piorar a 6A), prints 1440×900, 1280×720 e 390×844 em PT/EN/ES com o
drawer aberto em cada case, evidências em `outputs/.../round-6b/`, tabela "frase publicada → linha do
claims-6b".

### Rodada 6B — conteúdo (29/10/2026, fontes restauradas)

Fonte única: `outputs/portfolio-pixel-wall-2026-10-26/research/claims-6b.md` (`github.md` só confirma
detalhes; nada é publicado sem estar no claims). Entram L1–L6 em `ui.experience.leadership.lines` e os 6
cases na ordem 01 modernização com time (`key: 'modernization'`, diagrama de liderança no card e técnico no
drawer) · 02 plataforma interna de adoção de IA (reescreve `monitoring`: papel de principal autor, coletor
incluído, stack corrigida, sem "com orientação do líder técnico") · 03 ATS · 04 avisos · 05 integração
(rótulo "Case do trabalho, anonimizado", "Integração" vira tag) · 06 FragasTokenPulse (`key: 'tokenpulse'`,
"Projeto pessoal", sem link, cada frase confirmada no README do app).
Proibido no texto publicado: ACOM, Odebrecht/OEC, SISFER, GOL (exceto a linha pública do CONAREC),
Inspirali, nomes de colegas, valores, IDs e hosts; não afirmar produção.
Decisões do coordenador: Contato rola até o fim, salvo se o título ficar a menos de ~16 px abaixo da topbar
ou sob ela — aí para com o título a ~24 px (1024×600, Zen 390); depoimento ES "… y tú lo entregas con
consistencia." ("gerente en Alest" fica); saem os órfãos desta rodada (`projects/ats-optimizer-upload-640.webp`
se sem referência, `ui.projects.what` e `ui.projects.and`, `.kicker--wall` e `.about__text .kicker`); no
drawer do ATS o print vem logo depois de Problema ▸ Resultado e antes do diagrama; F8 na Formação: quando a
logo já mostra o nome, sai o nome repetido em texto (fica no alt/aria). Tabela "frase publicada → linha do
claims-6b" em `outputs/.../round-6b/`.

## Rodada 6C — Liderança reescrita, Ferramentas e Idiomas (aprovada pelo Gustavo, 29/10/2026: "Sim, implementa")

Fonte única: seções "Rodada 6C" e "Respostas do Gustavo (29/10)" de `outputs/.../research/claims-6b.md`
(texto PT literal de lá; EN/ES com o mesmo conteúdo). Regra nova: o rótulo diz o papel e o impacto, nunca
o que faltou.
- **Liderança na prática:** destaque F (rótulo, contexto, período, faixa compacta de números
  "4 devs · 67 cards revisados · plano aprovado sem ressalvas" na linguagem dos números do drawer,
  bullets F1–F3 e "ver o projeto 01 →"), depois as linhas A–E (E = mais de 70 voluntários, sem
  instituição nem religião); saem L5 e L6 (a L6 vira prova em Idiomas); depoimento igual. Desenho
  autoral na linguagem da parede, sem grade de cards. Trajetória em 390 PT ≤ ~2600 px; desktop sem
  regressão. A migração Oracle → SQL Server não é dita como executada.
- **Idiomas:** sob Español, a linha de prova do claims; o visual grande fica.
- **Ferramentas ("Com o que eu trabalho"):** ferramentas em chips no estilo do drawer; "visto em → 01 ·
  02" por grupo, levando ao card, só onde o case lista a ferramenta (derivado dos `tools` dos cases);
  pode entrar só o que está nos cases (React, Java 21 + Jakarta EE, Swift, Oracle/SQL Server/PL/SQL);
  no máximo 6 grupos; sem barra de nível nem gráfico de skill.
- **Contratos:** `Capability` = `[área, frase, chips: string[]]`; links para um card usam
  `<a href="#projetos" data-project-key="<key>">`, tratados pelo `Projects.tsx` (leva o trilho, o
  carrossel ou a pilha até o card).
