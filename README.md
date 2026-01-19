
# 💼 Portfólio Pessoal - Gustavo Fragas Cunha

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**[🌐 Ver Site Ao Vivo](https://portfolio-pessoal-vert.vercel.app/)**

[![Deploy Status](https://img.shields.io/badge/deploy-automated-success?style=for-the-badge&logo=vercel)](https://portfolio-pessoal-vert.vercel.app/)
[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](https://github.com/GustavoFragas/Portfolio-Pessoal)

</div>

---

## 📖 Sobre o Projeto

Portfólio profissional desenvolvido para apresentar minhas habilidades, projetos e experiências como **Desenvolvedor Fullstack**. O site é **100% frontend**, totalmente responsivo, com design moderno e otimizado para performance máxima.

### ✨ Características Principais

- 🎨 **Design Moderno**: Interface dark theme com gradientes vibrantes e animações fluidas
- 📱 **Totalmente Responsivo**: Layout adaptado para desktop, tablet e mobile com breakpoints otimizados
- ⚡ **Performance Otimizada**: 
  - Lazy loading inteligente de componentes
  - Code splitting automático
  - Memoização de componentes com React.memo
  - Dados estáticos pré-carregados (sem requisições HTTP)
  - Bundle otimizado com Vite
- 🚀 **100% Frontend**: Sem dependência de backend - todos os dados são estáticos
- 🌐 **Multi-idioma**: Apresentação em Português com suporte a Espanhol e Inglês
- 📄 **Certificados**: Visualização de certificados em PDF integrada
- 🔗 **Links Sociais**: Integração com GitHub, LinkedIn, WhatsApp e Instagram
- 🎯 **SEO Otimizado**: Meta tags e estrutura semântica
- ♿ **Acessível**: Aria labels e navegação por teclado

---

## 🚀 Tecnologias Utilizadas

### Frontend (Principal)
- **React 18.3.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.6+** - Tipagem estática para JavaScript
- **TailwindCSS 3.4.17** - Framework CSS utility-first para estilização rápida
- **Vite 6.4.1** - Build tool moderna com HMR ultrarrápido
- **React Icons** - Biblioteca completa de ícones

### Otimizações de Performance
- **React.memo** - Memoização de componentes para evitar re-renderizações desnecessárias
- **useMemo** - Memoização de cálculos e dados filtrados
- **useCallback** - Memoização de funções para otimizar performance
- **Code Splitting** - Lazy loading automático de componentes
- **Tree Shaking** - Remoção de código não utilizado
- **CSS Purging** - TailwindCSS remove classes CSS não utilizadas

### Arquitetura
- **Componentização** - Componentes reutilizáveis e isolados
- **Dados Estáticos** - Centralização de dados em `portfolioData.ts`
- **TypeScript Strict** - Tipagem rigorosa para segurança de tipos
- **Clean Code** - Código limpo e bem documentado

### Backend (Legado - Não mais utilizado em produção)
- **.NET 9** - Framework para API RESTful (mantido para referência)
- **Entity Framework Core** - ORM para acesso a dados
- **Clean Architecture** - Separação de responsabilidades

---

## 📁 Estrutura do Projeto

```
Portfolio-Pessoal/
├── client/                          # Frontend React (Produção)
│   ├── public/
│   │   ├── certificates/            # Arquivos PDF dos certificados
│   │   │   ├── Lingopass certificate B2 Advanced.pdf
│   │   │   ├── Versionamento de Código com Git e GitHub.pdf
│   │   │   └── ... (outros certificados)
│   │   └── images/
│   │       ├── profile.jpg          # Foto de perfil
│   │       ├── projects/            # Imagens dos projetos
│   │       └── certificates/        # Logos de certificações
│   │
│   ├── src/
│   │   ├── components/              # Componentes React (memoizados)
│   │   │   ├── About.tsx           # Seção sobre mim + idiomas
│   │   │   ├── Certificates.tsx     # Carousel de certificados
│   │   │   ├── Contact.tsx          # Formulário e links sociais
│   │   │   ├── Education.tsx        # Timeline de educação
│   │   │   ├── Experience.tsx       # Timeline de experiências
│   │   │   ├── Hero.tsx             # Seção inicial com animação de texto
│   │   │   ├── Projects.tsx         # Grid de projetos
│   │   │   ├── Sidebar.tsx          # Menu lateral responsivo
│   │   │   └── Skills.tsx           # Carousel de habilidades
│   │   │
│   │   ├── data/
│   │   │   └── portfolioData.ts     # ⭐ Dados estáticos centralizados
│   │   │       ├── profileData      # Informações pessoais
│   │   │       ├── experiencesData  # Histórico profissional
│   │   │       ├── skillsData       # Habilidades técnicas e soft skills
│   │   │       ├── projectsData     # Portfólio de projetos
│   │   │       ├── certificatesData # Certificações
│   │   │       └── educationData    # Formação acadêmica
│   │   │
│   │   ├── services/
│   │   │   └── api.ts               # Serviço de dados (retorna dados estáticos)
│   │   │
│   │   ├── types/
│   │   │   └── index.ts             # Definições TypeScript
│   │   │
│   │   ├── utils/
│   │   │   └── smoothScroll.ts      # Utilitário para scroll suave
│   │   │
│   │   ├── App.tsx                  # Componente principal (otimizado)
│   │   ├── index.css                # Estilos globais + TailwindCSS
│   │   └── main.tsx                 # Entry point
│   │
│   ├── dist/                        # Build de produção (gerado)
│   ├── package.json                 # Dependências do frontend
│   ├── tailwind.config.js           # Configuração TailwindCSS
│   ├── tsconfig.json                # Configuração TypeScript
│   ├── vite.config.ts               # Configuração Vite + otimizações
│   └── postcss.config.js            # Configuração PostCSS
│
├── GustavoPortfolio.API/            # Backend .NET (legado - não utilizado)
├── GustavoPortfolio.Application/
├── GustavoPortfolio.Domain/
├── GustavoPortfolio.Infrastructure/
├── GustavoPortfolio.Tests/
│
├── README.md                        # Este arquivo
└── .gitignore
```

### 📊 Tamanho dos Bundles (Otimizado)

```
dist/index.html                    1.04 kB │ gzip:  0.50 kB
dist/assets/index-*.css           21.58 kB │ gzip:  4.51 kB
dist/assets/Projects-*.js          1.96 kB │ gzip:  0.85 kB (lazy)
dist/assets/Experience-*.js        2.03 kB │ gzip:  0.91 kB (lazy)
dist/assets/Education-*.js         2.56 kB │ gzip:  1.09 kB (lazy)
dist/assets/Contact-*.js           2.93 kB │ gzip:  0.98 kB (lazy)
dist/assets/Certificates-*.js      3.27 kB │ gzip:  1.18 kB (lazy)
dist/assets/Skills-*.js            3.39 kB │ gzip:  1.21 kB (lazy)
dist/assets/vendor-*.js            4.17 kB │ gzip:  1.82 kB
dist/assets/index-*.js            21.59 kB │ gzip:  7.01 kB (main)
dist/assets/react-vendor-*.js    151.48 kB │ gzip: 49.67 kB (vendor)

Total (gzipped): ~68 kB
```

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- **Node.js 18+** (recomendado: 20+)
- **npm** ou **yarn**
- **Git**

### Instalação e Execução

1. **Clone o repositório**
```bash
git clone https://github.com/GustavoFragas/Portfolio-Pessoal.git
cd Portfolio-Pessoal
```

2. **Navegue para a pasta do frontend**
```bash
cd client
```

3. **Instale as dependências**
```bash
npm install
```

4. **Execute em modo desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

### 🏗️ Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento com HMR
npm run build    # Gera build de produção otimizado
npm run preview  # Visualiza build de produção localmente
npm run lint     # Executa ESLint para verificar código
```

---

## 🌐 Deploy na Vercel

O projeto está configurado para deploy automático na **Vercel** via GitHub.

### Configuração do Deploy

**Importante**: Configure o projeto na Vercel com as seguintes settings:

1. **Root Directory**: `client`
2. **Framework Preset**: `Vite`
3. **Build Command**: `npm run build` (padrão)
4. **Output Directory**: `dist` (padrão)
5. **Install Command**: `npm install` (padrão)

### Deploy Manual via CLI

```bash
cd client
npm install -g vercel
vercel --prod
```

### Build para Produção

```bash
cd client
npm run build
```

A pasta `client/dist/` contém os arquivos otimizados prontos para deploy em qualquer serviço de hospedagem estática (Vercel, Netlify, GitHub Pages, etc.).

---

## 📝 Personalização e Atualização de Dados

### 🎯 Centralizando Dados

Todos os dados do portfólio estão centralizados em um único arquivo para facilitar atualizações:

```
client/src/data/portfolioData.ts
```

### 📋 Estrutura de Dados

#### 1. **Informações Pessoais** (`profileData`)
```typescript
{
  id: "1",
  name: "Seu Nome",
  role: "Seu Cargo",
  bio: "Sua descrição profissional",
  email: "seu@email.com",
  phone: "+55 11 99999-9999",
  linkedIn: "https://linkedin.com/in/seu-perfil",
  gitHub: "https://github.com/seu-usuario",
  location: "Sua Cidade, Estado",
  imageUrl: "/images/profile.jpg"
}
```

#### 2. **Experiências Profissionais** (`experiencesData`)
```typescript
{
  id: "1",
  company: "Nome da Empresa",
  role: "Seu Cargo",
  startDate: "2025-01-01",
  endDate: "2025-12-31",  // ou undefined se ainda trabalha
  isCurrent: true,         // true se ainda trabalha
  description: "Suas responsabilidades e conquistas"
}
```

#### 3. **Habilidades** (`skillsData`)
```typescript
{
  id: "1",
  name: "React.js",
  category: "Frontend",  // Backend, Frontend, Database, Tools, Soft Skills, Languages
  level: 85              // 0-100
}
```

#### 4. **Projetos** (`projectsData`)
```typescript
{
  id: "1",
  title: "Nome do Projeto",
  description: "Descrição detalhada",
  techStack: "React, TypeScript, Node.js",  // separado por vírgula
  repoUrl: "https://github.com/usuario/repo",
  demoUrl: "https://demo.com",              // opcional
  imageUrl: "/images/projects/projeto.jpg", // opcional
  createdAt: "2025-01-01"
}
```

#### 5. **Certificações** (`certificatesData`)
```typescript
{
  id: "1",
  name: "Nome do Certificado",
  issuer: "Instituição Emissora",
  issueDate: "2025-01-01",
  credentialUrl: "/certificates/arquivo.pdf",  // ou URL externa
  logoUrl: "/images/certificates/logo.png"     // opcional
}
```

#### 6. **Formação Acadêmica** (`educationData`)
```typescript
{
  id: "1",
  institution: "Nome da Instituição",
  degree: "Tipo de Curso",  // Bacharelado, Tecnólogo, Técnico, etc
  field: "Área de Estudo",
  startDate: "2025-01-01",
  endDate: "2029-12-31",    // ou undefined se em andamento
  isCurrent: true,
  description: "Descrição do curso",
  websiteUrl: "https://instituicao.com"  // opcional
}
```

### 📸 Adicionando Imagens

#### Foto de Perfil
1. Adicione a imagem em: `client/public/images/profile.jpg`
2. Formatos recomendados: JPG, PNG, WebP
3. Tamanho recomendado: 400x400px ou maior (quadrado)

#### Imagens de Projetos
1. Adicione em: `client/public/images/projects/`
2. Nomeie de forma descritiva: `portfolio.jpg`, `ecommerce.png`
3. Resolução recomendada: 1200x630px (16:9)

### 📄 Adicionando Certificados

1. **Adicione o PDF** em `client/public/certificates/`
   - Exemplo: `Certificacao AWS.pdf`

2. **Atualize `portfolioData.ts`**:
```typescript
{
  id: "novo-cert",
  name: "Certificação AWS Cloud Practitioner",
  issuer: "Amazon Web Services",
  issueDate: "2026-01-15",
  credentialUrl: "/certificates/Certificacao AWS.pdf",
  logoUrl: "/images/certificates/aws.png"
}
```

### 🔄 Hot Module Replacement (HMR)

O Vite detecta automaticamente alterações em `portfolioData.ts` e atualiza o navegador instantaneamente durante o desenvolvimento (`npm run dev`).

---

## 🎨 Seções do Portfólio

### 🏠 Home (Hero)
- Foto de perfil com efeito hover
- Nome e cargo com animação de digitação
- Bio profissional
- Links para redes sociais (GitHub, LinkedIn, WhatsApp, Instagram)
- Botões de ação (Ver Projetos, Contato)

### 👤 Sobre Mim
- Apresentação pessoal expandida
- Seção de idiomas com níveis:
  - 🇧🇷 Português (Nativo)
  - 🇪🇸 Espanhol (Fluente)
  - 🇺🇸 Inglês (B2 - Avançado)

### 💻 Habilidades
- Carousel interativo de categorias:
  - **Backend**: C#, .NET, Python, TypeScript, PHP, Laravel
  - **Frontend**: React.js, HTML5, CSS3, TailwindCSS
  - **Database**: SQL Server, MySQL, PostgreSQL, NoSQL
  - **Tools**: Git, GitHub, VS Code, Visual Studio, Notion, GCP
  - **Soft Skills**: Liderança, Comunicação, Resolução de Problemas
  - **Languages**: Português, Espanhol, Inglês
- Barras de progresso animadas com percentuais
- Navegação por setas (desktop) e scroll vertical (mobile)

### 🚀 Projetos
- Grid responsivo de projetos
- Cards com:
  - Descrição do projeto
  - Stack tecnológica (tags)
  - Links para repositório GitHub
  - Link para demo (se disponível)
- Efeitos hover e animações

### 💼 Experiência Profissional
- Timeline vertical com pontos destacados
- Experiências ordenadas da mais recente para a mais antiga
- Badge "Atual" para posição vigente
- Datas formatadas (pt-BR)
- Descrição detalhada de responsabilidades

### 🎓 Educação & Estudos
- Timeline de formação acadêmica
- Diferenciação entre:
  - Graduação/Bacharelado
  - Cursos técnicos
  - Bootcamps e certificações
  - Estudos autodidatas
- Status: "Em Andamento" ou "Concluído"
- Links para instituições

### 🏆 Certificações
- Carousel de certificados
- Visualização de PDFs integrada
- Informações de emissor e data
- Links para credenciais online
- Navegação por setas

### 📧 Contato
- Informações de contato diretas
- Links para todas as redes sociais
- Localização
- Footer com informações de copyright

---

## ⚡ Otimizações Implementadas

### 🎯 Performance

1. **Code Splitting & Lazy Loading**
   - Componentes carregados sob demanda
   - Redução do bundle inicial
   - Fallback de loading customizado

2. **Memoização**
   - `React.memo` em todos os componentes
   - `useMemo` para cálculos e filtros
   - `useCallback` para handlers de eventos

3. **Bundle Optimization**
   - Vendor splitting (React separado do código)
   - CSS purging (TailwindCSS remove classes não utilizadas)
   - Tree shaking automático
   - Compressão gzip

4. **Dados Estáticos**
   - Sem requisições HTTP em produção
   - Carregamento instantâneo
   - Sem estados de loading desnecessários

5. **Vite Configuration**
   ```typescript
   build: {
     target: 'esnext',
     sourcemap: false,
     chunkSizeWarningLimit: 1000,
     rollupOptions: {
       output: {
         manualChunks(id) {
           if (id.includes('react')) return 'react-vendor';
           if (id.includes('icons')) return 'icons';
           return 'vendor';
         }
       }
     }
   }
   ```

### 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints TailwindCSS**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- **Menu Sidebar**: Colapsável em mobile com overlay
- **Grid Adaptativo**: Ajuste automático de colunas
- **Tipografia Escalável**: Tamanhos de fonte responsivos

### ♿ Acessibilidade

- Aria labels em todos os botões e links
- Navegação por teclado funcional
- Contraste de cores adequado (WCAG AA)
- Smooth scroll nativo
- Focus states visíveis

---

## 🔧 Configurações Técnicas

### TailwindCSS (`tailwind.config.js`)
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {
    colors: {
      // Cores customizadas
    },
    fontFamily: {
      // Fontes customizadas
    }
  }
}
```

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Vite (`vite.config.ts`)
- Otimizações de build
- Code splitting manual
- Aliases de import
- Servidor de desenvolvimento configurado

---

## 📊 Métricas de Performance

### Lighthouse Score (Estimado)
- 🟢 Performance: 95+
- 🟢 Accessibility: 90+
- 🟢 Best Practices: 95+
- 🟢 SEO: 90+

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Bundle Size
- Initial JS (gzipped): ~58 kB
- Total CSS (gzipped): ~4.5 kB
- Lazy chunks: 1-3 kB cada

---

## 🐛 Troubleshooting

### Erro no deploy da Vercel

**Problema**: `cd: client: No such file or directory`

**Solução**: Configure no Vercel Dashboard:
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Build falha localmente

```bash
# Limpar cache e reinstalar
cd client
rm -rf node_modules dist
npm install
npm run build
```

### HMR não funciona

```bash
# Reiniciar servidor de desenvolvimento
npm run dev
```

### Certificados PDF não aparecem

- Verifique se os PDFs estão em `client/public/certificates/`
- Confira se o caminho em `portfolioData.ts` está correto
- Certifique-se de que os nomes não têm espaços ou caracteres especiais

---

## 📈 Próximas Melhorias

- [ ] Modo claro/escuro (theme toggle)
- [ ] Animações mais elaboradas (Framer Motion)
- [ ] Blog integrado
- [ ] Sistema de busca de projetos
- [ ] Filtros avançados para habilidades
- [ ] Integração com Google Analytics
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n) completa
- [ ] Formulário de contato funcional (EmailJS ou similar)

**Gustavo Fragas Cunha**

- 📧 Email: gustavofragascunha@gmail.com
- 💼 LinkedIn: [linkedin.com/in/gustavofragascunha](https://linkedin.com/in/gustavofragascunha)
- 🐙 GitHub: [github.com/GustavoFragas](https://github.com/GustavoFragas)
- 📍 Localização: São Paulo, Brasil

---

## � Contato

**Gustavo Fragas Cunha**  
*Desenvolvedor Fullstack (.NET + React)*

- 📧 **Email**: gustavofragascunha@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/gustavofragascunha](https://linkedin.com/in/gustavofragascunha)
- 🐙 **GitHub**: [github.com/GustavoFragas](https://github.com/GustavoFragas)
- 💬 **WhatsApp**: [+55 11 98019-2710](https://wa.me/5511980192710)
- 📸 **Instagram**: [@fragas_gustavo](https://www.instagram.com/fragas_gustavo/)
- 📍 **Localização**: São Paulo, Brasil

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você encontrar algum bug ou tiver sugestões de melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Sinta-se livre para usar como referência ou template para seu próprio portfólio.

---

## 🌟 Agradecimentos

- [React](https://react.dev/) - Biblioteca UI
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [React Icons](https://react-icons.github.io/react-icons/) - Ícones
- [Vercel](https://vercel.com/) - Hospedagem
- Comunidade open-source por todas as ferramentas incríveis

---

<div align="center">

### ⭐ Se este projeto te ajudou, considere dar uma estrela!

**Desenvolvido com ❤️ por [Gustavo Fragas Cunha](https://github.com/GustavoFragas)**

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=GustavoFragas.Portfolio-Pessoal)
![GitHub Stars](https://img.shields.io/github/stars/GustavoFragas/Portfolio-Pessoal?style=social)
![GitHub Forks](https://img.shields.io/github/forks/GustavoFragas/Portfolio-Pessoal?style=social)

---

**© 2025 Gustavo Fragas Cunha. Todos os direitos reservados.**

</div>
