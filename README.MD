# 🚀 Portfolio Pessoal Fullstack - Gustavo Fragas

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Portfolio profissional desenvolvido com Clean Architecture, demonstrando habilidades em desenvolvimento fullstack com .NET e React.

---

## 📋 Product Requirements Document
**Versão:** 1.2  
**Autor:** Gustavo Fragas Cunha  
**Status:** Concluído  
**Data:** Novembro 2025

---

## 1. Visão Geral e Objetivo
Desenvolver uma aplicação web de portfólio "Over-engineered" (intencionalmente robusta) para demonstrar domínio técnico em **.NET (C#)** e **React**. O objetivo não é apenas exibir informações, mas servir como prova prática de arquitetura de software, consumo de API e boas práticas de desenvolvimento para recrutadores e clientes.

### 1.1. Diferenciais Competitivos (Value Proposition)
* **Backend Real:** Diferente de portfólios estáticos, este projeto consome uma API real em .NET, demonstrando habilidade de backend.
* **Arquitetura Corporativa:** Implementação de padrões usados em grandes empresas (Clean Architecture, CQRS pattern leve ou Repository Pattern).
* **Bilinguismo:** Interface preparada para demonstrar fluência em Inglês e Espanhol (foco no suporte trilíngue mencionado no CV).

---

## 2. Público-Alvo
1.  **Recrutadores Tech (.NET/C#):** Buscam verificar a qualidade do código no GitHub e o uso de padrões modernos.
2.  **Gestores de Contratação:** Buscam clareza na trajetória (Jovem Aprendiz -> Suporte -> Dev) e Soft Skills (Liderança Missionária).
3.  **Headhunters Internacionais:** Devido à proficiência em Inglês (B2) e Espanhol (Fluente).

---

## 3. Requisitos Funcionais (FR)

### 3.1. Módulo: Home & Hero
* **FR-01:** Exibir apresentação impactante com:
    * Nome: "Gustavo Fragas Cunha"
    * Role Dinâmica (Efeito de digitação): "Software Developer | .NET Enthusiast | Problem Solver".
    * Foto profissional (fundo neutro ou removido).
* **FR-02:** Botões de Call-to-Action (CTA):
    * Primário: "Ver Projetos" (Scroll suave).
    * Secundário: "Baixar CV" (Link direto para PDF).

### 3.2. Módulo: Sobre Mim (Storytelling)
* **FR-03:** Exibir biografia estruturada focada em transição de carreira.
    * *Destaque:* Experiência de liderança voluntária (IJCSUD) e suporte trilíngue (Atento).
* **FR-04:** Exibir "Badges" de idiomas com nível:
    * Português (Nativo)
    * Espanhol (Fluente - Atento Experience)
    * Inglês (B2 - Avançado/LingoPass)

### 3.3. Módulo: Skills (Hard & Soft)
* **FR-05:** Categorizar habilidades consumidas via API:
    * **Backend:** C#, .NET 8/9, ASP.NET Core, Entity Framework, LINQ, Python, Regex.
    * **Database:** SQL Server, MySQL, PostgreSQL.
    * **Frontend:** React.js, TailwindCSS, HTML5, CSS3.
    * **Tools:** Git/GitHub, Docker, Visual Studio, Swagger.
    * **Soft Skills:** Liderança, Comunicação Eficaz, Resolução de Problemas, Trabalho em Equipe.

### 3.4. Módulo: Projetos (Portfolio Showcase)
* **FR-06:** Grid de projetos com cards contendo:
    * Imagem de capa (Thumbnail).
    * Título e Breve descrição.
    * Tags de tecnologias usadas (ex: `.NET`, `React`).
    * **Botão Repository:** Link para GitHub.
    * **Botão Demo:** Link para o deploy (se houver).
* **FR-07:** Destaque para o projeto "Sistema de Gestão de Estacionamento" e o próprio Portfólio.

### 3.5. Módulo: Experiência Profissional (Timeline)
* **FR-08:** Exibir linha do tempo vertical (Timeline) com dados da API:
    * **Suporte Técnico Trilíngue (Atento):** Foco em resolução de problemas e sistemas Meta.
    * **Líder Voluntário (IJCSUD):** Foco em métricas (38 -> 118 batizados), treinamento de 70+ pessoas e gestão de metas com Excel.
    * **Jovem Aprendiz (Beneficência Portuguesa):** Foco em sistemas hospitalares (Tasy) e suporte.

### 3.6. Módulo: Formação Acadêmica
* **FR-09:** Listagem educacional:
    * *Bacharelado:* Software Development (BYU Pathway Worldwide) - Em andamento.
    * *Tecnólogo:* Análise e Desenvolvimento de Sistemas (UFBRA/EAD) - Em andamento (Convalidação).
    * *Técnico:* Desenvolvimento de Sistemas (ETEC Parque Belém) - Concluído.

### 3.7. Módulo: Certificações (Novo Requisito)
* **FR-10:** Seção dedicada "Certifications & Licenses".
* **FR-11:** Card de certificado deve conter:
    * Nome do Curso (ex: "Formação C# e .NET").
    * Emissor (ex: "DIO", "LingoPass", "EF SET").
    * Data de emissão.
    * Link de Validação (Credential URL).
* **Dados Iniciais:**
    * Certificado B2 Inglês (LingoPass).
    * Formação .NET (DIO).
    * Git e GitHub (DIO).

### 3.8. Contato e Social
* **FR-12:** Links sociais com ícones:
    * LinkedIn: `/in/gustavofragascunha`
    * GitHub: `/GustavoFragas`
    * WhatsApp: `API Link direto`
    * Email: `gustavofragascunha@gmail.com`
* **FR-13:** Formulário de Contato funcional (integrado com serviço de email como SendGrid ou apenas um `mailto` estilizadado se quiser simplificar a backend).

---

## 4. Requisitos Não Funcionais (NFR)

### 4.1. Arquitetura e Código
* **NFR-01 (Clean Architecture):** O Backend deve seguir a separação de responsabilidades:
    * `Domain`: Entidades (Project, Experience, Certificate).
    * `Application`: Interfaces, DTOs, Services.
    * `Infrastructure`: EF Core, Repositories, Migrations.
    * `API`: Controllers e Endpoints.
* **NFR-02 (Documentação):** A API deve possuir **Swagger/OpenAPI** habilitado em produção para que recrutadores testem os endpoints.
* **NFR-03 (Banco de Dados):** Utilizar PostgreSQL (recomendado para deploy gratuito no Railway/Render) ou SQL Server. Uso obrigatório de ORM (Entity Framework Core).

### 4.2. Performance e UX
* **NFR-04:** Carregamento inicial (LCP) abaixo de 2.5s.
* **NFR-05:** Design Responsivo (Mobile First) usando TailwindCSS.
* **NFR-06:** Modo Dark/Light (opcional, mas recomendado para devs).

### 4.3. Deploy e CI/CD
* **NFR-07:** Pipeline de CI/CD via **GitHub Actions** (build e deploy automático ao fazer push na main).
* **NFR-08:** Frontend hospedado na Vercel.
* **NFR-09:** Backend hospedado no Railway, Render ou Azure (Free Tier).

---

## 5. Modelo de Dados (Sugestão Simplificada)

Para este portfólio, um banco de dados relacional simples é suficiente.

**Table: Projects**
* `Id` (PK, Guid)
* `Title` (String)
* `Description` (Text)
* `TechStack` (String/JSON)
* `RepoUrl` (String)
* `DemoUrl` (String, Nullable)
* `ImageUrl` (String)

**Table: Experiences**
* `Id` (PK, Guid)
* `Company` (String)
* `Role` (String)
* `StartDate` (DateTime)
* `EndDate` (DateTime, Nullable)
* `Description` (Text - suporta Markdown)
* `IsCurrent` (Bool)

**Table: Certificates**
* `Id` (PK, Guid)
* `Name` (String)
* `Issuer` (String)
* `IssueDate` (DateTime)
* `CredentialUrl` (String)
* `LogoUrl` (String)

---

## 6. Stack Tecnológica Recomendada

Esta stack foi escolhida para balancear "Modernidade" com "Requisitos de Vagas .NET".

* **Backend:** .NET 8 (LTS), ASP.NET Core Web API.
* **Linguagem:** C#.
* **Banco de Dados:** PostgreSQL (Pela facilidade de deploy gratuito) ou SQL Server Express LocalDB (desenvolvimento).
* **ORM:** Entity Framework Core (Code First).
* **Frontend:** React (Vite) + TypeScript.
* **Estilização:** TailwindCSS (Padrão de mercado atual, rápido desenvolvimento).
* **Controle de Versão:** Git & GitHub.
* **Ícones:** React Icons (Lucide ou FontAwesome).

---

## 7. Próximos Passos (Action Plan)

1.  **Configuração do Ambiente:** Instalar .NET 8 SDK, Node.js, VS Code ou Visual Studio 2022.
2.  **Backend ("Core"):**
    * Criar solução `GustavoPortfolio`.
    * Configurar Clean Architecture (pastas Domain, Infra, App, API).
    * Criar Entidades e DbContext.
    * Rodar Migrations.
    * Criar Controllers (ProjectsController, CertificatesController).
    * *Dica:* Popule o banco de dados via "Seed Data" no código para não precisar criar um painel administrativo agora.
3.  **Frontend ("Visual"):**
    * Criar projeto React com Vite.
    * Configurar Tailwind.
    * Criar componentes (Card, Timeline, Navbar).
    * Consumir a API usando `fetch` ou `axios`.
4.  **Deploy:**
    * Subir API no Railway (tem plano hobby/trial bom para .NET).
    * Subir Front na Vercel.

---
*Este documento serve como guia base. Adaptações podem ser feitas conforme a evolução do desenvolvimento.*