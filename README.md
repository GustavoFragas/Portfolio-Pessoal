# 💼 Portfólio Pessoal - Gustavo Fragas Cunha

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**[🌐 Ver Site Ao Vivo](https://portfolio-pessoal-vert.vercel.app/)**

</div>

---

## 📖 Sobre o Projeto

Portfólio profissional desenvolvido para apresentar minhas habilidades, projetos e experiências como Desenvolvedor de Software. O site é totalmente responsivo, com design moderno e dark theme.

### ✨ Características

- 🎨 **Design Moderno**: Interface escura com gradientes e animações suaves
- 📱 **Responsivo**: Adaptado para desktop, tablet e mobile
- ⚡ **Performance**: Lazy loading de componentes e otimizações de build
- 🌐 **Multi-idioma**: Suporte a Português, Espanhol e Inglês
- 📄 **Certificados**: Visualização de certificados em PDF
- 🔗 **Links Sociais**: GitHub, LinkedIn, WhatsApp e Instagram

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **TailwindCSS** - Framework CSS utility-first
- **Vite** - Build tool moderna e rápida
- **React Icons** - Biblioteca de ícones

### Backend (Opcional - Para desenvolvimento local)
- **.NET 9** - Framework para API RESTful
- **Entity Framework Core** - ORM para acesso a dados
- **Clean Architecture** - Arquitetura de software limpa

---

## 📁 Estrutura do Projeto

```
Portfolio-Pessoal/
├── client/                     # Frontend React
│   ├── public/
│   │   ├── certificates/       # Arquivos PDF dos certificados
│   │   └── images/             # Imagens do portfólio
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── About.tsx
│   │   │   ├── Certificates.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Skills.tsx
│   │   ├── data/
│   │   │   └── portfolioData.ts # Dados estáticos do portfólio
│   │   ├── services/
│   │   │   └── api.ts          # Serviço de API
│   │   ├── types/
│   │   │   └── index.ts        # Tipos TypeScript
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── GustavoPortfolio.API/       # Backend .NET (opcional)
├── GustavoPortfolio.Application/
├── GustavoPortfolio.Domain/
├── GustavoPortfolio.Infrastructure/
└── GustavoPortfolio.Tests/
```

---

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/GustavoFragas/Portfolio-Pessoal.git
cd Portfolio-Pessoal
```

2. **Instale as dependências do frontend**
```bash
cd client
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

---

## 🌐 Deploy

O site está hospedado no **Vercel** com deploy automático via GitHub.

### Deploy Manual

```bash
cd client
npm run build
```

A pasta `dist/` gerada pode ser hospedada em qualquer serviço de hospedagem estática.

---

## 📝 Personalização

### Atualizando os Dados

Todos os dados do portfólio estão centralizados em:
```
client/src/data/portfolioData.ts
```

Você pode modificar:
- **Profile**: Informações pessoais e de contato
- **Experiences**: Histórico profissional
- **Skills**: Habilidades técnicas e soft skills
- **Projects**: Projetos desenvolvidos
- **Certificates**: Certificações obtidas
- **Education**: Formação acadêmica

### Adicionando Certificados

1. Adicione o arquivo PDF em `client/public/certificates/`
2. Atualize o array `certificatesData` em `portfolioData.ts`

---

## 📫 Contato

**Gustavo Fragas Cunha**

- 📧 Email: gustavofragascunha@gmail.com
- 💼 LinkedIn: [linkedin.com/in/gustavofragascunha](https://linkedin.com/in/gustavofragascunha)
- 🐙 GitHub: [github.com/GustavoFragas](https://github.com/GustavoFragas)
- 📍 Localização: São Paulo, Brasil

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Desenvolvido com ❤️ por **Gustavo Fragas Cunha**

</div>
