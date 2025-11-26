# 🚀 Guia de Hospedagem GRATUITA - Portfolio Fullstack

## 🎯 Objetivo
Hospedar seu portfolio **100% GRÁTIS** com URLs profissionais para compartilhar no LinkedIn e GitHub.

---

## 📋 O Que Você Vai Ter

**Frontend:** `https://seu-nome.vercel.app` (Grátis para sempre)  
**Backend API:** `https://seu-nome.up.railway.app` (Grátis com $5 crédito/mês)  
**GitHub:** `https://github.com/GustavoFragas/Portfolio-Pessoal` ✅ Já está pronto!

---

## 🌐 PASSO 1: Hospedar Frontend (Vercel) - 100% GRÁTIS

### Por que Vercel?
- ✅ **Grátis para sempre** (sem cartão de crédito)
- ✅ Deploy automático do GitHub
- ✅ HTTPS grátis
- ✅ CDN global (site rápido no mundo todo)
- ✅ Domínio personalizado grátis

### Passos:

#### 1.1. Criar Conta
1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar seus repositórios

#### 1.2. Fazer Deploy
1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Encontre o repositório **"Portfolio-Pessoal"**
3. Clique em **"Import"**

#### 1.3. Configurar o Projeto
Na tela de configuração, preencha:

**Framework Preset:** Vite  
**Root Directory:** `client`  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`

#### 1.4. Adicionar Variável de Ambiente
1. Clique em **"Environment Variables"**
2. Adicione:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `http://localhost:5167` (por enquanto, vamos atualizar depois)
3. Clique em **"Add"**

#### 1.5. Deploy!
1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. ✅ Seu frontend estará no ar!

**URL:** `https://portfolio-pessoal-[seu-hash].vercel.app`

---

## 🚂 PASSO 2: Hospedar Backend (Railway) - GRÁTIS ($5/mês)

### Por que Railway?
- ✅ **$5 de crédito grátis por mês** (suficiente para projetos pequenos)
- ✅ Suporte nativo a .NET
- ✅ Deploy automático do GitHub
- ✅ PostgreSQL grátis (se precisar)

### Passos:

#### 2.1. Criar Conta
1. Acesse: https://railway.app
2. Clique em **"Login"**
3. Escolha **"Login with GitHub"**
4. Autorize o Railway

#### 2.2. Criar Novo Projeto
1. Clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione **"Portfolio-Pessoal"**
4. Clique em **"Deploy Now"**

#### 2.3. Configurar Variáveis de Ambiente
1. No dashboard do projeto, clique na aba **"Variables"**
2. Adicione as seguintes variáveis:

```
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://0.0.0.0:$PORT
UseInMemoryDatabase=true
```

**Importante:** Railway fornece a variável `$PORT` automaticamente.

#### 2.4. Configurar Build
1. Clique em **"Settings"**
2. Em **"Build"**, configure:
   - **Build Command:** (deixe vazio, Railway detecta automaticamente)
   - **Start Command:** `dotnet run --project GustavoPortfolio.API/GustavoPortfolio.API.csproj`

#### 2.5. Gerar Domínio Público
1. Clique em **"Settings"**
2. Em **"Networking"**, clique em **"Generate Domain"**
3. Railway criará uma URL pública: `https://seu-projeto.up.railway.app`

#### 2.6. Aguardar Deploy
- O primeiro deploy pode levar 5-10 minutos
- Acompanhe os logs em **"Deployments"**
- ✅ Quando aparecer "Application started", está pronto!

**URL:** `https://seu-projeto.up.railway.app`

---

## 🔗 PASSO 3: Conectar Frontend com Backend

Agora que o backend está no ar, vamos atualizar o frontend:

### 3.1. Atualizar Variável no Vercel
1. Volte ao dashboard da **Vercel**
2. Selecione seu projeto
3. Vá em **"Settings"** → **"Environment Variables"**
4. Edite `VITE_API_BASE_URL`:
   - **Novo valor:** `https://seu-projeto.up.railway.app` (URL do Railway)
5. Clique em **"Save"**

### 3.2. Fazer Redeploy
1. Vá em **"Deployments"**
2. Clique nos **"..."** do último deploy
3. Clique em **"Redeploy"**
4. Aguarde 2 minutos

✅ **Pronto! Seu portfolio está 100% funcional e online!**

---

## 🔧 PASSO 4: Atualizar CORS no Backend

Para o frontend acessar o backend, precisamos atualizar o CORS:

### 4.1. Editar Program.cs
No arquivo `GustavoPortfolio.API/Program.cs`, encontre:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

### 4.2. Adicionar URL da Vercel
Atualize para:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins(
                "http://localhost:5173",
                "https://seu-portfolio.vercel.app"  // ← Adicione sua URL da Vercel aqui
            )
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

### 4.3. Fazer Commit e Push
```bash
git add .
git commit -m "feat: Adicionar URL da Vercel no CORS"
git push
```

O Railway fará deploy automático em 2-3 minutos!

---

## ✅ CHECKLIST FINAL

### Verificar se está tudo funcionando:

- [ ] **Frontend no ar:** Acesse `https://seu-portfolio.vercel.app`
- [ ] **Backend no ar:** Acesse `https://seu-projeto.up.railway.app/swagger`
- [ ] **Integração funcionando:** Teste se os dados aparecem no frontend
- [ ] **Certificados abrindo:** Clique em "Ver Certificado" e veja se o PDF abre
- [ ] **Links do GitHub funcionando:** Teste os botões de repositório
- [ ] **Smooth scroll funcionando:** Clique nos links do menu

---

## 🎯 URLs Finais para Compartilhar

Após o deploy, você terá:

**🌐 Portfolio:** `https://seu-portfolio.vercel.app`  
**📡 API:** `https://seu-projeto.up.railway.app`  
**📚 Swagger:** `https://seu-projeto.up.railway.app/swagger`  
**💻 GitHub:** `https://github.com/GustavoFragas/Portfolio-Pessoal`

---

## 📱 PASSO 5: Adicionar no LinkedIn

### 5.1. Seção "Projetos"
1. Vá no seu perfil do LinkedIn
2. Clique em **"Adicionar seção do perfil"**
3. Escolha **"Projetos"**
4. Preencha:
   - **Nome:** Portfolio Pessoal Fullstack
   - **URL:** `https://seu-portfolio.vercel.app`
   - **Descrição:** Portfolio profissional desenvolvido com .NET 9 e React, demonstrando Clean Architecture e boas práticas de desenvolvimento.

### 5.2. Link em Destaque
1. No perfil, clique em **"Adicionar seção do perfil"**
2. Escolha **"Links"**
3. Adicione:
   - **Título:** Meu Portfolio
   - **URL:** `https://seu-portfolio.vercel.app`

---

## 💰 Custos

### Vercel (Frontend)
- **Plano:** Hobby (Grátis)
- **Limite:** 100 GB bandwidth/mês
- **Custo:** **$0/mês** ✅

### Railway (Backend)
- **Plano:** Trial
- **Crédito:** $5/mês grátis
- **Uso estimado:** ~$2-3/mês (com InMemory DB)
- **Custo:** **$0/mês** ✅ (dentro do crédito grátis)

**Total: $0/mês** 🎉

---

## 🔄 Atualizações Futuras

Quando você atualizar o código:

1. Faça commit e push no GitHub:
```bash
git add .
git commit -m "feat: Nova funcionalidade"
git push
```

2. **Vercel:** Deploy automático em 2 minutos ✅
3. **Railway:** Deploy automático em 3-5 minutos ✅

Não precisa fazer nada manual!

---

## 🆘 Troubleshooting

### Erro: "Failed to fetch"
**Causa:** Frontend não consegue acessar o backend  
**Solução:** Verifique se atualizou o CORS e a variável `VITE_API_BASE_URL`

### Erro: "Application failed to start"
**Causa:** Erro no build do .NET  
**Solução:** Verifique os logs no Railway e teste `dotnet build` localmente

### Erro: "Certificate not found"
**Causa:** PDFs não foram copiados  
**Solução:** Verifique se a pasta `client/public/certificates` tem os PDFs

### Frontend carrega mas não mostra dados
**Causa:** Backend não está respondendo  
**Solução:** Acesse `https://seu-projeto.up.railway.app/swagger` e veja se a API está no ar

---

## 🎉 Parabéns!

Seu portfolio está no ar e pronto para impressionar recrutadores!

**Próximos passos:**
1. ✅ Compartilhe no LinkedIn
2. ✅ Adicione no README do GitHub
3. ✅ Envie para recrutadores
4. ✅ Adicione no currículo

---

## 📚 Links Úteis

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Seu GitHub:** https://github.com/GustavoFragas/Portfolio-Pessoal

---

**Dúvidas?** Consulte a documentação ou abra uma issue no GitHub!
