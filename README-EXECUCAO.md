# 🚀 Gustavo Portfolio - Guia de Execução

## Pré-requisitos

- ✅ .NET 9 SDK
- ✅ Node.js 18+ e npm
- ✅ PowerShell (Windows)

## 🎯 Opção 1: Executar Tudo com Um Comando (Recomendado)

### Windows PowerShell:
```powershell
.\start.ps1
```

Este script irá:
1. Iniciar o backend .NET na porta 5000
2. Iniciar o frontend React na porta 5173
3. Abrir automaticamente o Swagger e a aplicação

## 🔧 Opção 2: Executar Manualmente

### 1. Backend (.NET API)

Abra um terminal e execute:

```bash
cd GustavoPortfolio.API
dotnet run
```

O backend estará disponível em:
- **API:** http://localhost:5000
- **Swagger:** http://localhost:5000/swagger

### 2. Frontend (React)

Abra outro terminal e execute:

```bash
cd client
npm run dev
```

O frontend estará disponível em:
- **App:** http://localhost:5173

## 📊 Endpoints da API

- `GET /api/profile` - Perfil do Gustavo
- `GET /api/projects` - Lista de projetos
- `GET /api/experiences` - Experiências profissionais
- `GET /api/skills` - Habilidades técnicas
- `GET /api/certificates` - Certificações

## 🧪 Executar Testes

```bash
dotnet test
```

Todos os 6 testes devem passar:
- ✅ ProfileController_GetAll_ReturnsSuccess
- ✅ ProjectsController_GetAll_ReturnsSuccess
- ✅ ExperiencesController_GetAll_ReturnsSuccess
- ✅ SkillsController_GetAll_ReturnsSuccess
- ✅ CertificatesController_GetAll_ReturnsSuccess
- ✅ SwaggerEndpoint_ReturnsSuccess

## 🗄️ Banco de Dados

O projeto está configurado para usar **InMemory Database** por padrão, com dados já populados (seed data).

Para usar PostgreSQL:
1. Altere `UseInMemoryDatabase` para `false` em `appsettings.json`
2. Configure a connection string no mesmo arquivo
3. Execute: `dotnet ef database update`

## 🎨 Tecnologias Utilizadas

### Backend
- .NET 9
- ASP.NET Core Web API
- Entity Framework Core
- Swagger/OpenAPI
- xUnit (testes)

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Icons

## 📁 Estrutura do Projeto

```
GustavoPortfolio/
├── GustavoPortfolio.Domain/        # Entidades
├── GustavoPortfolio.Application/   # DTOs e Interfaces
├── GustavoPortfolio.Infrastructure/# DbContext e Repositories
├── GustavoPortfolio.API/           # Controllers e Startup
├── GustavoPortfolio.Tests/         # Testes unitários
└── client/                         # Frontend React
    ├── src/
    │   ├── components/             # Componentes React
    │   ├── services/               # API calls
    │   └── types/                  # TypeScript types
    └── public/
```

## 🐛 Troubleshooting

### Erro de CORS
Se houver erro de CORS, verifique se o backend está configurado para aceitar requisições de `http://localhost:5173`.

### Porta já em uso
- Backend: Altere a porta em `launchSettings.json`
- Frontend: Altere a porta em `vite.config.ts`

### Erro ao conectar com a API
Verifique se:
1. O backend está rodando
2. A URL da API no frontend está correta (`src/services/api.ts`)

## 📞 Contato

**Gustavo Fragas Cunha**
- Email: gustavofragascunha@gmail.com
- GitHub: https://github.com/GustavoFragas
- LinkedIn: https://linkedin.com/in/gustavofragascunha

---

**Desenvolvido com ❤️ usando Clean Architecture**
