# Procedência das logos de emissores (credenciais)

Logos extraídas dos próprios certificados do Gustavo, que são as fontes
primárias. Nada foi desenhado, redesenhado, gerado por IA ou baixado da
internet. Os intermediários de trabalho ficaram fora do repositório.

Ferramentas: poppler (`pdfimages`, `pdftoppm`, `pdftocairo`), `ffmpeg` (crop,
escala e codificação PNG) e numpy (cálculo do canal alpha). Margem uniforme de
24 px em todos os lados do PNG final.

Uso, válido para as três: marca do emissor usada só para identificar a
credencial conquistada pelo Gustavo, na frente do azulejo da credencial. Não
implica endosso, parceria nem patrocínio do emissor ao portfólio. Não
recolorir, distorcer, recortar a marca nem combiná-la com outros elementos.

## BYU–Idaho — `client/public/certificates/logos/byu-idaho.png`

- Fonte: `client/public/certificates/byu-idaho-web-computer-programming.pdf`
  (SHA-256 `ae0d10b91ca9b0c07f25e5f763bb3235aae0dc1e759bb15bd885dc58c610a5a9`).
- Página: 1, canto superior esquerdo. O selo circular da página 2 não foi usado.
- Método: na página 1 a logo é vetorial (8 caminhos `rgb(6,104,179)` e um
  filete `rgb(203,204,206)` entre BYU e IDAHO). Renderizada com
  `pdftoppm -r 800` e recortada no bbox da logo. O fundo, um raster cinza com
  marca d'água "Brigham Young University – Idaho", saiu por diferença de croma
  (alpha = (B−R)/173, exato sobre fundo neutro). O filete foi tratado à parte:
  retângulo alinhado aos eixos, com a cobertura das linhas de borda pela mediana
  da linha. A cor da tinta foi mantida exata.
- Dimensões: 870 × 524 px, RGBA, fundo transparente.
- SHA-256: `b1766469884591180c862c80a4bbb07089dfd9731d10e005bf884658d25f5f62`.
- Texto alternativo: "Logo da Brigham Young University–Idaho".
- Observação: o azul tem pouco contraste em fundo escuro. Usar sobre superfície
  clara.

## LingoPass — `client/public/certificates/logos/lingopass.png`

- Fonte: `client/public/certificates/Lingopass certificate B2 Advanced.pdf`
  (SHA-256 `30b634e265259eaafabe2a9f1b497f6ae1147ff9eaf204bf728867d2ec7ef1f3`).
- Página: 1, canto inferior esquerdo (ícone e palavra "lingopass").
- Método: imagem embutida original, extraída com `pdfimages -png`
  (4673 × 3306 px, 400 ppi, sem perdas). Recorte na resolução nativa, sem
  reamostragem: origem x 194, y 2805, área 824 × 199. Fundo branco removido por
  unmatting de borda: o interior opaco foi mantido pixel a pixel e, nas bordas, o
  alpha foi estimado pela cor do interior vizinho, com a cor reconstruída de
  forma exata. A recomposição sobre branco reproduz a fonte (erro máx. 2/255).
- Dimensões: 824 × 199 px, RGBA, fundo transparente.
- SHA-256: `e892f75e76c5dd2a9a2ef559a52b9ba027d1bd713d4aa6aebab53026140d323f`.
- Texto alternativo: "Logo da LingoPass".
- Observação: o contorno escuro de 1 px nas letras já existe no raster
  original. A palavra é azul-marinho, então usar sobre superfície clara.

## DIO — `client/public/certificates/logos/dio.png`

- Fonte: `client/public/certificates/Versionamento de Código com Git e GitHub.pdf`
  (SHA-256 `1895e088118fcaa924a2899696a36180e82eaf72f6beb31bc38c2a40284dc1a1`).
- Página: 1, cabeçalho superior esquerdo: marca "dio.pro" com estrela. A marca
  "dio. CERTIFICATION PROGRAM" do rodapé não foi usada: tem metade da resolução
  (cerca de 150 px).
- Método: imagem embutida original, extraída com `pdfimages -png` (o certificado
  inteiro é um JPEG de 1120 × 793 px a 72 ppi, sem vetor nem texto). Recorte
  nativo com origem x 105, y 112 e área 342 × 98, ampliado 2× com Lanczos para
  atingir a largura mínima. O fundo (plano ajustado na margem) foi removido por
  projeção de cada pixel na reta fundo→tinta, usando as duas tintas medidas na
  própria imagem: preto `rgb(1,3,18)` e verde `rgb(5,221,110)`. O interior opaco
  foi mantido verbatim e as bordas receberam a cor medida da tinta, o que remove
  o ringing do JPEG.
- Dimensões: 684 × 196 px, RGBA, fundo transparente.
- SHA-256: `6ba9fad9226bfedc524a69a7489e6a5bccf2262be4bc94c828f3e052a3114054`.
- Texto alternativo: "Logo da DIO".
- Limitações: a fonte tem só cerca de 320 px de largura nativa. A ampliação 2×
  não acrescenta detalhe, então as bordas ficam macias e há leve mosqueado de
  JPEG no interior. O "dio" é preto, então usar sobre superfície clara. Para
  nitidez maior, só com arquivo oficial da DIO, mediante decisão humana.

## Notion Service Specialist — `client/public/certificates/notion-service-specialist.png`

- Fonte: arte oficial do emissor (Notion HQ) publicada pelo Credly no badge
  público emitido para "Gustavo Fragas":
  https://www.credly.com/badges/bdb75f61-1764-4ad0-8b8b-13778192f8fc
- Imagem: `https://images.credly.com/images/1415bce6-0a31-4349-9917-55cbd7d7aefc/blob`
  (versão em alta do og:image do badge), baixada em 27/10/2026.
- Original: 2048 × 2048 px, PNG RGBA, 236.601 B, SHA-256
  `3b7a42c6b2c3a48dddca2a4867d71311f940b8f7742b3c3f18e4bb0ca60f9c34`.
- Método: `sips --resampleWidth 600`, sem recolorir nem recortar.
- Final: 600 × 600 px, 46.369 B, SHA-256
  `d28efdedb8177ada8b1b8e1d062b57c6c361f15ed3e913e935b38b300e6cc80e`.
- Texto alternativo: "Selo: Notion Service Specialist".
- Frase do verso parafraseada do og:description oficial do badge ("Certified
  Services Specialists scope, design, and deliver Notion solutions that achieve
  business outcomes, leading discovery, architecture, implementation, and change
  management through to successful adoption and handoff.").

## Notion Certified Admin — `client/public/certificates/notion-certified-admin.png` (reduzida)

- Mesma arte do emissor que já estava no repositório (badge
  https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946).
- Antes: 2048 × 2048 px, 703.446 B, SHA-256
  `5223c7386037966516562331a2de5c1ef9301925d12dbcc07e390a5e203569ed`.
- Método (27/10/2026): `sips --resampleWidth 600`, sem recolorir nem recortar.
- Depois: 600 × 600 px, 118.207 B, SHA-256
  `d9161ce25b5c27b1f212b2510d158f1f9fbfd23ea1abde582f5ae5c9a9dad4e6`.

# Rodada 4 — fonte do rodapé e print do ATS Optimizer

## Press Start 2P — `client/public/fonts/` (só o rodapé)

- Fonte: "Press Start 2P", de CodeMan38 (Cody Boisclair), distribuída pelo Google Fonts.
  Copyright: "Copyright 2012 The Press Start 2P Project Authors (cody@zone38.net), with
  Reserved Font Name "Press Start 2P"".
- Licença: SIL Open Font License 1.1. Texto integral copiado sem alteração de
  https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/OFL.txt em 28/10/2026 e
  versionado ao lado dos arquivos: `client/public/fonts/press-start-2p-OFL.txt`
  (SHA-256 `705960c3281a5765ecc0b59bd4ed7ca59eed165748076bc2fc3e8fdbfeb944b0`).
- Arquivos: os dois subconjuntos WOFF2 servidos pelo Google Fonts (CSS2, família
  `Press+Start+2P`), baixados pelo coordenador em 28/10/2026 e copiados sem modificação.
  O nome reservado não é usado em versão modificada.
  - `press-start-2p-latin.woff2`: 4.704 B, SHA-256
    `42144b97bd2942ea606e5d880684eae0f7be5c804bdd57b1faac5a8d7699ae6e`.
  - `press-start-2p-latin-ext.woff2`: 3.704 B, SHA-256
    `3e1ea894dba11389007b78e4f6ce1a1c70542fe66cda38f7de48deff0d89c372`.
- Uso: `@font-face` em `client/src/styles/retro-footer.css` com `font-display: swap` e o
  mesmo `unicode-range` latin/latin-ext do CSS do Google Fonts. Servida do próprio domínio
  (`font-src 'self'`). Nenhum outro componente usa a fonte.
- Glifos: acentos do português e do espanhol, `—`, `·` e `©` medidos no Chrome com avanço de
  1 em (presentes no subconjunto). O `▲` do "START" e os chevrons são SVG em pixels, não glifos.

## ATS Optimizer — `client/public/projects/ats-optimizer-upload.webp`

- Fonte: print real da tela de upload do ATS Optimizer, projeto pessoal do Gustavo, rodado
  localmente a partir do repositório público https://github.com/GustavoFragas/ats-optimizer
  (commit `c48fef7bde625164be7ff936cf4784d9ca8986ea`, 08/03/2026), só o front-end, sem API
  (a tela inicial renderiza sem backend). Capturado pelo coordenador em 28/10/2026 no Chrome
  headless, 1440 × 900 a 2× (`ats-upload-dark.png`, 2880 × 1800, 670.252 B, SHA-256
  `2697b4f4b0f276f56bfac73b8f174ebf12fb1482dc3af885ff1aeee6d5fa2cc4`). Sem dado pessoal na
  tela (formulário vazio).
- Método: `cwebp 1.6.0 -q 90 -m 6 -crop 0 0 2880 1728 -resize 1200 720`. O corte tira só
  as últimas 72 linhas, onde o botão "Analisar Compatibilidade" aparecia pela metade. Sem
  recolorir, retocar nem acrescentar nada.
- Final: 1200 × 720 px, WebP, 29.272 B, SHA-256
  `e01656e9cd5a9d3545f3569b3067056720b1c7879ec5f4ac2b4d2f79dfc2ea3d`.
- Texto alternativo (PT): "Tela de upload do ATS Optimizer, em tema escuro: áreas para enviar o
  currículo e o perfil do LinkedIn em PDF, campo para colar a descrição da vaga, opção de
  anexar uma foto da vaga e campo opcional com a URL da empresa." EN e ES em
  `portfolioLocales.ts` (avisam que a interface está em português).
- Versão do card (Rodada 5b): `client/public/projects/ats-optimizer-upload-640.webp`, mesma
  origem e mesmo corte, `cwebp 1.6.0 -q 90 -m 6 -crop 0 0 2880 1728 -resize 640 384`;
  640 × 384 px, WebP, 10.724 B, SHA-256
  `0499541b0776f359d9978bfcf03654f385a21073e3f3b071ef1cb5fcdfec40ad`. Usada no card 02 de
  Projetos (`srcSet` 640w/1200w); o drawer continua com a de 1200 px. Desde a Rodada 6B o
  print saiu do card e o arquivo ficou sem uso; removido em 29/10/2026 por decisão do
  coordenador (órfão desta rodada, sem nenhuma referência no código).
- Recorte do drawer (Rodada 6B): `client/public/projects/ats-optimizer-upload-crop.webp`,
  recortado de `ats-optimizer-upload.webp` (1200 × 720, SHA-256 `e01656e9…ea3d`) na coluna
  útil do app (cabeçalho com a marca, upload do currículo e do LinkedIn, descrição da vaga,
  foto da vaga e URL), nos pixels do próprio arquivo, sem redimensionar:
  `cwebp 1.6.0 -q 92 -m 6 -crop 232 0 736 712`. Sem recolorir, retocar nem acrescentar nada.
  O original 2880 × 1800 se perdeu na limpeza do scratchpad após o reboot de 28/10.
  Final: 736 × 712 px, WebP, 27.864 B, SHA-256
  `349d9cfce0f8e13b69d366bec51c2fef95f17e64b93294387b02ab9a4f72ca7e`. Usado só no drawer do
  comparador, com o mesmo alt.

## Fontes de conteúdo (Rodada 4)

- Prêmio do time da Alest: "monday.com Partner of the Year — LATAM", 6º Partner Summit da
  monday.com, fev/2026. Fonte linkada: release oficial de 17/02/2026 na Business Wire
  (https://www.businesswire.com/news/home/20260217722947/en/monday.com-Reinforces-AI-First-Work-Platform-With-Expanded-Partner-Program).
  Cobertura independente conferida em 28/10/2026: ChannelLife
  (https://channellife.news/story/monday-com-boosts-ai-first-partner-drive-with-new-perks:
  "Partner of the Year awards went to … Alest for LATAM"). Nesta conferência a Business
  Wire bloqueou o acesso automatizado (HTTP "Access Denied"); a verificação do release
  ficou com o coordenador.
- Argentina / Sobre: site oficial em cada idioma — `?lang=por`, `?lang=eng`, `?lang=spa`
  em https://www.churchofjesuschrist.org/ (URLs confirmadas pelo coordenador).

# Rodada 5 — logos da Formação, links de instituição e "Com o time da Alest"

## Logos da Formação sem placa clara (BYU–Idaho e DIO)

- Nenhum arquivo novo. Os PNGs oficiais já documentados acima (`byu-idaho.png` e `dio.png`)
  têm canal alpha limpo: medido em 28/10/2026 com `ffmpeg` (RGBA cru) + numpy, BYU–Idaho
  sem nenhum pixel parcialmente transparente isolado (a mais de 5 px de um pixel opaco) e
  DIO com 18 desses pixels, alpha máximo 11/255 (invisível).
- Método: só na seção Formação (`Education.tsx` + `content.css`), o PNG vira máscara CSS
  (`mask: url(...) center / contain no-repeat`) de um bloco pintado com o token `--text`.
  A forma da marca é exatamente o alpha do arquivo oficial (sem redesenhar, recortar,
  distorcer nem combinar com outro elemento); muda só a cor, que vira uma versão
  monocromática clara, como pedido na Rodada 5 (item C). No tema claro (bloco comentado do
  `index.css`) a mesma regra pinta a marca com a tinta escura.
- A logo é decorativa (`aria-hidden`); o nome da instituição vem logo ao lado, em texto.
- Fora desta seção (credenciais, hero) as logos continuam como antes, em cor original.

## Sites oficiais das instituições (Formação)

URLs verificadas pelo coordenador em 28/10/2026 (HTTP 200), em
`client/src/data/portfolioContent.ts` (`institutionUrls`), iguais nos três idiomas:

- ETEC Parque Belém: https://etecparquebelem.cps.sp.gov.br/
- Brigham Young University‑Idaho (as duas entradas): https://www.byupathway.edu/
- UFBRA: https://ufbra.edu.br/
- DIO: https://www.dio.me/

## "Com o time da Alest: case GOL + Zoom Contact Center apresentado no CONAREC 2026 · set/2026"

- Fontes: post público no LinkedIn do Head Brasil e América do Sul da Zoom e notícia interna
  da Alest de 01/10/2026 (informadas pelo Gustavo/coordenador). Não há artigo público
  estável, por isso a linha não tem link. Não é prêmio e não é chamada de prêmio; o
  "prêmio do Zoom" não aparece em nenhuma fonte e não entra.
- Dados: `ui.experience.teamHighlights` em `client/src/data/portfolioLocales.ts`
  (antes `awards`), com `url`/`source` opcionais.

# Rodada 6A — derivados no tamanho de exibição (desempenho no celular)

Os PNGs oficiais acima continuam no repositório, intactos (mesmos SHA-256). O site passou a usar
derivados WebP no tamanho de exibição: 2× o maior tamanho medido no Chrome em 2560×1440, 1920×1080,
1440×900, 1280×720, 1024×768, 820×1180, 768×1024, 430×932, 390×844 e 360×740 (28/10/2026). Cada
marca tem uma única URL: o mesmo arquivo serve a face (`<img>`), a máscara das fatias e da versão
monocromática, então não há download duplo (o `<img>` do hero pede a arte em modo CORS, como a
máscara CSS).

Comando (ferramentas do sistema, sem dependência nova): `sips --resampleWidth <L> <origem>.png
--out <tmp>.png` e `cwebp -q 85 -m 6 -alpha_q 100 -sharp_yuv <tmp>.png -o <destino>.webp`
(cor com perda leve, alpha sem perda).

| Derivado | Origem | Dimensões | Bytes | Maior exibição medida | SHA-256 |
|---|---|---|---|---|---|
| `certificates/aws-devops-professional-460.webp` | `aws-devops-professional.png` (600×600, 44 226 B) | 460×460 | 17 550 | 228×228 (credenciais, 1280×720) | `8fcd00fd42b832093f0bdd6c1c31825ccd24f3d83dc3da98d0f6ae58cb395c46` |
| `certificates/google-generative-ai-leader-460.webp` | `google-generative-ai-leader.png` (600×600, 110 111 B) | 460×460 | 17 890 | 227×227 (credenciais, 1280×720) | `c02fadd9c971dac42998ac99e533e2699243af6bea3c6c91cf5c5c539934b019` |
| `certificates/notion-certified-admin-460.webp` | `notion-certified-admin.png` (600×600, 118 207 B) | 460×460 | 22 356 | 227×227 (credenciais, 1280×720) | `e34fb8720dead34e7aa0b92d09b71b4926c8b9c73bffcf762db69d31bd38f0cf` |
| `certificates/notion-service-specialist-460.webp` | `notion-service-specialist.png` (600×600, 46 369 B) | 460×460 | 9 412 | 227×227 (credenciais, 1280×720) | `324920f1d84436de9ac0c60b5c3e907d7ad45ade7646114c4ed2e29d6e9255f3` |
| `certificates/logos/byu-idaho-340.webp` | `logos/byu-idaho.png` (870×524, 21 146 B) | 340×204 | 11 108 | 163×98 (credenciais, 820×1180) | `4a11317bae20567904d374f2cf69db3b581ad68cd1cadfd084f4b94dc0b676e2` |
| `certificates/logos/dio-440.webp` | `logos/dio.png` (684×196, 59 870 B) | 440×126 | 10 742 | 219×63 (credenciais, 430×932) | `664eee862c394db3d096f40ad6ec8ceef80d705d730f359320e88affb1eadbdb` |
| `certificates/logos/lingopass-440.webp` | `logos/lingopass.png` (824×199, 37 620 B) | 440×106 | 8 314 | 219×53 (credenciais, 430×932) | `7d6c796397575321a68351c68c339302205cc747baf2c29940a5b5cceb272905` |

Alpha conferido nos decodificados (`dwebp` → `ffmpeg` RGBA cru → numpy): borda do arquivo
transparente nas logos e nenhum pixel parcial isolado em AWS, Google, Notion, DIO e LingoPass. Na
BYU–Idaho a 340 px o filete fino entre BYU e IDAHO fica com alpha parcial (antialiasing da redução,
sem pixel opaco por perto), o que é esperado e não aparece como ruído.

## Credenciais sem placa clara (BYU–Idaho, DIO e LingoPass)

- Mesmo tratamento da Formação: no azulejo roxo (`.cred__logo`, `Certificates.tsx` + `index.css`)
  o alpha da marca vira máscara de um bloco pintado com `--text`, sem placa, no mesmo espaço que
  a logo ocupava dentro da placa. A forma é exatamente a da marca oficial; muda só a cor.
- LingoPass, conferido como BYU/DIO (`ffmpeg` RGBA cru + numpy, 28/10/2026): no PNG oficial,
  77,3% dos pixels com alpha 0, 20,0% opacos, borda toda transparente e nenhum pixel parcial a
  mais de 5 px de um pixel opaco. A máscara reproduz o ícone (três pílulas) e a palavra
  "lingopass" sem resto de fundo.
- No azulejo a marca tem `role="img"` com o nome do emissor, como o `alt` da imagem anterior.
- O badge 3D da BYU–Idaho no hero continua na cor original sobre a placa clara (decisão do
  brief); usa o mesmo derivado WebP.
