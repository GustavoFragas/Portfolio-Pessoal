# 🚀 Guia de Hospedagem GRATUITA - Portfolio Fullstack

## 📌 Status atual (hoje)

- ✅ **PASSO 1 (Frontend na Vercel)** concluído
  - Projeto importado da GitHub
  - Build configurado com `Root Directory = client`
  - Variável `VITE_API_BASE_URL = http://localhost:5167` criada
  - Frontend publicado em `https://portfolio-pessoal-ten-lovat.vercel.app/`
- ✅ **Web App da API criado na Azure**
  - Nome: `portfolio-api-gustavo` (Free F1, Linux, .NET 10 LTS)
  - CI/CD configurado com GitHub Actions para o repositório `Portfolio-Pessoal`
- ⚠️ **Deploy da API na Azure ainda com erro de runtime**
  - Build e deploy no GitHub Actions estão verdes
  - Ao acessar a URL da API aparece "Application Error"

### O que falta fazer amanhã

1. Abrir os **logs de aplicação (Log stream / Diagnose and solve problems)** do Web App e identificar o erro de runtime.
2. Ajustar o código ou configuração da API conforme o erro (por exemplo, versão de .NET, caminho, configuração de hosting).
3. Confirmar que o Swagger abre em:
   - `https://portfolio-api-gustavo-....azurewebsites.net/swagger`
4. Configurar as **Application Settings** no Web App (se ainda não estiverem):
   - `ASPNETCORE_ENVIRONMENT = Production`
   - `UseInMemoryDatabase = true`
5. Atualizar na **Vercel** a variável:
   - `VITE_API_BASE_URL = https://portfolio-api-gustavo-....azurewebsites.net`
6. Fazer **Redeploy** do frontend na Vercel e testar o site completo (dados, certificados, navegação).

---

## 🎯 Objetivo
Hospedar seu portfolio **100% GRÁTIS** com URLs profissionais para compartilhar no LinkedIn e GitHub.

---

## 📋 O Que Você Vai Ter

**Frontend:** `https://seu-nome.vercel.app` (Grátis para sempre)  
**Backend API:** `https://seu-nome.azurewebsites.net` (Azure App Service Free)  
**GitHub:** `https://github.com/GustavoFragas/Portfolio-Pessoal` ✅ Já está pronto!

---

## 🌐 PASSO 1: Hospedar Frontend (Vercel) - 100% GRÁTIS ✅ **(JÁ CONCLUÍDO)**

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

> **Você já concluiu todo o PASSO 1 (Vercel)**. Seu frontend está online nessa URL, apenas aguardando o backend em produção.

---

## PASSO 2: Hospedar Backend (Azure App Service Free)

### Por que Azure App Service?
- **Runtime .NET nativo** (sem precisar configurar Docker)
- **Plano F1 (Free)** suficiente para portfolio pessoal
- **Deploy integrado com GitHub**
- **HTTPS grátis**

### Passos:

#### 2.1. Criar Conta
1. Acesse: https://portal.azure.com
2. Faça login com sua conta Microsoft (Outlook/Hotmail/etc.) ou crie uma conta nova

> Em alguns casos, a Azure pode pedir um cartão apenas para verificação, mas você usará o **plano gratuito F1**.

#### 2.2. Criar um App Service para a API
1. No portal Azure, clique em **"Create a resource"**
2. Procure por **"Web App"**
3. Clique em **"Create"** (Create Web App)
4. Preencha:
   - **Subscription:** sua assinatura padrão
   - **Resource Group:** crie um novo, por exemplo `rg-portfolio`
   - **Name:** `portfolio-api-seu-nome` (esse nome vira `https://portfolio-api-seu-nome.azurewebsites.net`)
   - **Publish:** `Code`
   - **Runtime stack:** `.NET`
   - **Operating System:** `Linux`
   - **Region:** escolha uma região próxima (por exemplo, `Brazil South` ou `East US`)
   - **Pricing Plan:** clique em **"Change plan"** e selecione **F1 (Free)**
5. Clique em **"Review + create"** e depois em **"Create"**

#### 2.3. Publicar a API usando GitHub Actions (recomendado)
1. Depois que o Web App for criado, abra o recurso **Web App** que você acabou de criar
2. No menu lateral, vá em **"Deployment Center"**
3. Em **Source**, escolha **GitHub**
4. Conecte sua conta GitHub (se ainda não estiver conectada)
5. Selecione:
   - **Organization:** sua conta
   - **Repository:** `Portfolio-Pessoal`
   - **Branch:** `main`
6. Em **Build provider**, escolha **GitHub Actions**
7. Em **Runtime stack / .NET**, mantenha o padrão detectado pela Azure
8. Clique em **"Save"** / **"Finish"**; a Azure vai criar um workflow do GitHub Actions para buildar e publicar a API sempre que você der push na `main`.

#### 2.4. Configurar variáveis de ambiente na Azure
1. No Web App, no menu lateral, vá em **"Configuration"**
2. Aba **"Application settings"**
3. Clique em **"New application setting"** e adicione:

   - **Name:** `ASPNETCORE_ENVIRONMENT`  
     **Value:** `Production`

   - **Name:** `UseInMemoryDatabase`  
     **Value:** `true`

4. Clique em **"Save"** e confirme o restart do Web App

#### 2.5. Verificar a URL da API
1. Na página do Web App, veja o campo **"Default domain"**
2. Será algo como:

   `https://portfolio-api-seu-nome.azurewebsites.net`

3. Acesse essa URL + `/swagger` para testar:

   `https://portfolio-api-seu-nome.azurewebsites.net/swagger`

Se o Swagger abrir, sua API está rodando em produção.

---

## PASSO 3: Conectar Frontend com Backend

Agora que o backend está no ar, vamos atualizar o frontend:

### 3.1. Atualizar Variável no Vercel
1. Volte ao dashboard da **Vercel**
2. Selecione seu projeto
3. Vá em **"Settings"** → **"Environment Variables"**
4. Edite `VITE_API_BASE_URL`:
   - **Novo valor:** `https://portfolio-api-seu-nome.azurewebsites.net` (URL do Azure App Service que você copiou no PASSO 2)
5. Clique em **"Save"**

### 3.2. Fazer Redeploy
1. Vá em **"Deployments"**
2. Clique nos **"..."** do último deploy
3. Clique em **"Redeploy"**
4. Aguarde 2 minutos

**Pronto! Seu portfolio está 100% funcional e online!**

---

## CHECKLIST FINAL

### Verificar se está tudo funcionando:

- **Frontend no ar:** Acesse `https://seu-portfolio.vercel.app`
- **Backend no ar:** Acesse `https://portfolio-api-seu-nome.azurewebsites.net/swagger`
- **Integração funcionando:** Teste se os dados aparecem no frontend
- **Certificados abrindo:** Clique em "Ver Certificado" e veja se o PDF abre
- **Links do GitHub funcionando:** Teste os botões de repositório
- **Smooth scroll funcionando:** Clique nos links do menu

---

## URLs Finais para Compartilhar

Após o deploy, você terá:

**Portfolio:** `https://seu-portfolio.vercel.app`  
**API:** `https://portfolio-api-seu-nome.azurewebsites.net`  
**Swagger:** `https://portfolio-api-seu-nome.azurewebsites.net/swagger`  
**GitHub:** `https://github.com/GustavoFragas/Portfolio-Pessoal`

---

## PASSO 5: Adicionar no LinkedIn

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

## Custos

### Vercel (Frontend)
- **Plano:** Hobby (Grátis)
- **Limite:** 100 GB bandwidth/mês
- **Custo:** **$0/mês** 

### Azure App Service (Backend)
- **Plano:** F1 Free (Web App for Linux)
- **Uso estimado:** suficiente para portfolio e testes
- **Custo:** **$0/mês** (dentro dos limites gratuitos)

**Total: $0/mês** 

---

## Atualizações Futuras

Quando você atualizar o código:

1. Faça commit e push no GitHub:
```bash
git add .
git commit -m "feat: Nova funcionalidade"
git push
```

2. **Vercel:** Deploy automático em 2 minutos 
3. **Azure App Service:** Deploy automático via GitHub Actions 

Não precisa fazer nada manual!

---

## Troubleshooting

### Erro: "Failed to fetch"
**Causa:** Frontend não consegue acessar o backend  
**Solução:** Verifique se atualizou o CORS e a variável `VITE_API_BASE_URL`

### Erro: "Application failed to start"
**Causa:** Erro no build do .NET  
**Solução:** Verifique os logs no Azure (Log stream / Deployments) e teste `dotnet build` localmente

### Erro: "Certificate not found"
**Causa:** PDFs não foram copiados  
**Solução:** Verifique se a pasta `client/public/certificates` tem os PDFs

### Frontend carrega mas não mostra dados
**Causa:** Backend não está respondendo  
**Solução:** Acesse `https://portfolio-api-seu-nome.azurewebsites.net/swagger` e veja se a API está no ar

---

## Parabéns!

Seu portfolio está no ar e pronto para impressionar recrutadores!

**Próximos passos:**
1. Compartilhe no LinkedIn
2. Adicione no README do GitHub
3. Envie para recrutadores
4. Adicione no currículo

---

## Links Úteis

- **Vercel Docs:** https://vercel.com/docs
- **Azure App Service Docs:** https://learn.microsoft.com/azure/app-service/
- **Seu GitHub:** https://github.com/GustavoFragas/Portfolio-Pessoal

---

**Dúvidas?** Consulte a documentação ou abra uma issue no GitHub!
