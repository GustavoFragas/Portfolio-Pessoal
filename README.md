# Portfolio Pessoal - Gustavo Fragas Cunha

Portfolio técnico para apresentar minha atuação como **Software Engineer com foco em C#/.NET, backend, APIs, integrações, observabilidade e AI Automation**.

O site público é um frontend estático em React/Vite, com dados centralizados em TypeScript para facilitar manutenção. O repositório também mantém um backend .NET como referência arquitetural, com entidades, controllers, repositórios, InMemory DB e testes de API.

[Ver site ao vivo](https://portfolio-pessoal-vert.vercel.app/) · [LinkedIn](https://linkedin.com/in/gustavofragascunha) · [GitHub](https://github.com/GustavoFragas)

## O Que Este Portfolio Mostra

- Posicionamento profissional discreto e técnico, sem linguagem de recolocação.
- Projetos públicos em C#/.NET, React, TypeScript e IA aplicada.
- Cases profissionais descritos de forma segura, sem expor dados, clientes ou detalhes confidenciais.
- Stack alinhada com backend, APIs, automações, cloud, observabilidade e ferramentas modernas de AI-assisted development.
- Formação, certificados, idiomas e experiências organizados em seções objetivas.

## Stack

**Frontend**

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Icons

**Backend de referência**

- .NET 10
- ASP.NET Core
- Entity Framework Core InMemory
- Repository Pattern
- Swagger/OpenAPI
- xUnit + WebApplicationFactory

**Temas técnicos destacados**

- C#/.NET e APIs REST
- Integrações com SaaS e webhooks
- AWS, Docker, Git/GitHub e observabilidade
- Notion API, Monday API, Google APIs
- Codex, Kiro, Windsurf e AI-assisted development

## Estrutura

```text
Portfolio-Pessoal/
├── client/                         # Frontend React usado em produção
│   ├── src/components/             # Hero, About, Projects, Skills, Experience...
│   ├── src/data/portfolioData.ts   # Fonte principal dos dados públicos
│   ├── src/services/api.ts         # Adapter local que entrega os dados estáticos
│   └── public/                     # Imagem de perfil e certificados
├── GustavoPortfolio.API/           # API .NET de referência
├── GustavoPortfolio.Application/   # DTOs e contratos
├── GustavoPortfolio.Domain/        # Entidades
├── GustavoPortfolio.Infrastructure/# DbContext e repositórios
└── GustavoPortfolio.Tests/         # Testes de endpoints
```

## Rodando Localmente

### Frontend

```bash
cd client
npm install
npm run dev
```

O Vite sobe em:

```text
http://localhost:5173
```

### Build do Frontend

```bash
cd client
npm run build
```

### Lint

```bash
cd client
npm run lint
```

### Backend de Referência

```bash
dotnet run --project GustavoPortfolio.API/GustavoPortfolio.API.csproj
```

Swagger em ambiente local:

```text
https://localhost:5001
```

### Testes .NET

```bash
dotnet test GustavoPortfolio.Tests/GustavoPortfolio.Tests.csproj
```

## Decisões Técnicas

| Decisão | Motivo |
|---|---|
| Dados públicos em `portfolioData.ts` | Deploy simples na Vercel, sem depender de backend para conteúdo estático |
| Backend mantido no repo | Demonstra modelagem, controllers, repositórios e testes em .NET |
| Cases confidenciais sem link de repo | Permite mostrar impacto técnico sem expor informação interna |
| Textos sem "buscando vaga" | Mantém presença profissional discreta e compatível com emprego atual |
| Projetos com foco em impacto | Aproxima o portfolio do padrão de leitura de Tech Leads e recrutadores técnicos |

## Checks Úteis

```bash
cd client
npm run build
npm run lint

cd ..
dotnet test GustavoPortfolio.Tests/GustavoPortfolio.Tests.csproj
```

## Observação Sobre Confidencialidade

Alguns trabalhos profissionais envolvem plataformas internas, automações corporativas e dados sensíveis. Nesses casos, o portfolio descreve arquitetura, stack e tipo de problema resolvido sem publicar nomes de clientes, bases de dados, regras internas ou detalhes operacionais.
