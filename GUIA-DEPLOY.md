# 🚀 Guia de Deploy - Portfolio Fullstack

## ✅ Código já está no GitHub!

**Repositório:** https://github.com/GustavoFragas/Portfolio-Pessoal

---

## 🌐 Opções de Hospedagem Recomendadas

### Frontend (React + Vite)

#### Opção 1: Vercel (RECOMENDADO) ⭐
**Vantagens:**
- ✅ Deploy automático do GitHub
- ✅ HTTPS grátis
- ✅ CDN global
- ✅ Build otimizado automático
- ✅ Domínio personalizado grátis

**Passos:**
1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione o repositório `Portfolio-Pessoal`
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Adicione variável de ambiente:
   - `VITE_API_BASE_URL` = URL do seu backend (ex: https://seu-backend.railway.app)
7. Clique em "Deploy"

**Resultado:** Seu frontend estará em `https://seu-portfolio.vercel.app`

#### Opção 2: Netlify
Similar ao Vercel, mas com configuração ligeiramente diferente.

---

### Backend (.NET 9 API)

#### Opção 1: Railway (RECOMENDADO) ⭐
**Vantagens:**
- ✅ Suporte nativo a .NET
- ✅ $5 de crédito grátis por mês
- ✅ PostgreSQL integrado
- ✅ Deploy do GitHub automático

**Passos:**
1. Acesse https://railway.app
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha `Portfolio-Pessoal`
6. Configure:
   - **Root Directory:** `/`
   - **Start Command:** `dotnet run --project GustavoPortfolio.API/GustavoPortfolio.API.csproj`
7. Adicione variáveis de ambiente:
   ```
   ASPNETCORE_ENVIRONMENT=Production
   ASPNETCORE_URLS=http://0.0.0.0:$PORT
   UseInMemoryDatabase=true
   ```
8. Railway gerará uma URL pública automaticamente

**Resultado:** Seu backend estará em `https://seu-backend.railway.app`

#### Opção 2: Render
**Passos:**
1. Acesse https://render.com
2. Faça login com GitHub
3. Clique em "New +" → "Web Service"
4. Conecte o repositório `Portfolio-Pessoal`
5. Configure:
   - **Name:** gustavo-portfolio-api
   - **Runtime:** .NET
   - **Build Command:** `dotnet publish GustavoPortfolio.API/GustavoPortfolio.API.csproj -c Release -o out`
   - **Start Command:** `dotnet out/GustavoPortfolio.API.dll`
6. Adicione variáveis de ambiente (igual ao Railway)
7. Clique em "Create Web Service"

#### Opção 3: Azure App Service (Plano Gratuito)
Ideal se você quiser mostrar experiência com Azure.

---

## 🔧 Configurações Importantes

### 1. CORS no Backend
Já está configurado! O backend aceita requisições do frontend.

Mas quando fizer deploy, atualize em `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("https://seu-portfolio.vercel.app") // Atualize aqui
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

### 2. Variáveis de Ambiente

**Frontend (.env):**
```
VITE_API_BASE_URL=https://seu-backend.railway.app
```

**Backend (Railway/Render):**
```
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://0.0.0.0:$PORT
UseInMemoryDatabase=true
```

### 3. Banco de Dados

**Opção A: InMemory (Atual - Mais Simples)**
- ✅ Já configurado
- ✅ Não precisa de PostgreSQL
- ⚠️ Dados resetam a cada deploy

**Opção B: PostgreSQL (Produção Real)**
1. No Railway, adicione PostgreSQL:
   - Clique em "New" → "Database" → "PostgreSQL"
2. Copie a Connection String
3. Atualize variável de ambiente:
   ```
   UseInMemoryDatabase=false
   ConnectionStrings__DefaultConnection=sua_connection_string
   ```

---

## 📝 Checklist de Deploy

### Antes do Deploy
- [x] Código no GitHub ✅
- [x] .gitignore configurado ✅
- [x] Credenciais removidas ✅
- [x] README atualizado ✅
- [ ] Testar build local:
  ```bash
  # Backend
  dotnet build
  
  # Frontend
  cd client
  npm run build
  ```

### Deploy Frontend (Vercel)
- [ ] Criar conta na Vercel
- [ ] Conectar repositório GitHub
- [ ] Configurar Root Directory: `client`
- [ ] Adicionar variável `VITE_API_BASE_URL`
- [ ] Fazer deploy
- [ ] Testar URL pública

### Deploy Backend (Railway)
- [ ] Criar conta no Railway
- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente
- [ ] Fazer deploy
- [ ] Testar endpoints (Swagger)
- [ ] Copiar URL pública

### Após Deploy
- [ ] Atualizar CORS no backend com URL do frontend
- [ ] Atualizar `VITE_API_BASE_URL` no Vercel
- [ ] Testar integração completa
- [ ] Adicionar URLs no LinkedIn e GitHub
- [ ] Compartilhar com recrutadores! 🎉

---

## 🔗 URLs Finais

Após o deploy, você terá:

**Frontend:** `https://gustavo-portfolio.vercel.app`  
**Backend API:** `https://gustavo-portfolio-api.railway.app`  
**Swagger:** `https://gustavo-portfolio-api.railway.app/swagger`  
**GitHub:** `https://github.com/GustavoFragas/Portfolio-Pessoal`

---

## 🎯 Domínio Personalizado (Opcional)

### Comprar Domínio
- **Registro.br:** ~R$ 40/ano (.com.br)
- **Namecheap:** ~$10/ano (.com)

### Configurar no Vercel
1. Vá em Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções
4. Aguarde propagação (até 48h)

**Resultado:** `https://gustavofragas.com` 🚀

---

## 🆘 Troubleshooting

### Erro: "CORS blocked"
**Solução:** Atualize a URL do frontend no `Program.cs` do backend

### Erro: "API not found"
**Solução:** Verifique se `VITE_API_BASE_URL` está correto no Vercel

### Erro: "Build failed"
**Solução:** Teste o build local primeiro:
```bash
dotnet build
cd client && npm run build
```

### Erro: "Port already in use"
**Solução:** Railway/Render usam variável `$PORT` automaticamente

---

## 📊 Monitoramento

### Vercel
- Analytics integrado
- Logs em tempo real
- Métricas de performance

### Railway
- Logs em tempo real
- Uso de recursos
- Métricas de deploy

---

## 🎉 Próximos Passos

1. ✅ Fazer deploy do frontend na Vercel
2. ✅ Fazer deploy do backend no Railway
3. ✅ Testar integração completa
4. ✅ Adicionar URLs no LinkedIn:
   - Seção "Projetos"
   - Link no perfil
5. ✅ Adicionar no README do GitHub
6. ✅ Compartilhar com recrutadores!

---

## 💡 Dicas Profissionais

1. **README do GitHub:** Adicione badges de build status
2. **LinkedIn:** Crie um post sobre o projeto
3. **GitHub:** Use GitHub Actions para CI/CD
4. **Monitoramento:** Configure alerts no Railway
5. **Performance:** Use Lighthouse para otimizar

---

**Seu portfolio está pronto para impressionar recrutadores! 🚀**

**Links Importantes:**
- 📦 Vercel: https://vercel.com
- 🚂 Railway: https://railway.app
- 🎨 Render: https://render.com
- 📚 Documentação: Veja README-EXECUCAO.md
