using GustavoPortfolio.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GustavoPortfolio.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Experience> Experiences { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<Certificate> Certificates { get; set; }
    public DbSet<Education> Educations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed Profile
        var profileId = Guid.NewGuid();
        modelBuilder.Entity<Profile>().HasData(new Profile
        {
            Id = profileId,
            Name = "Gustavo Fragas Cunha",
            Role = "Software Engineer C#/.NET | Backend, APIs & AI Automation",
            Bio = "Oi, tudo bem? Sou desenvolvedor de software com foco em C#/.NET, backend, APIs, integrações e automações com IA. Trabalho transformando processos manuais e dados espalhados em sistemas mais limpos, observáveis e fáceis de manter, usando também TypeScript, React, AWS, Notion, Monday e ferramentas modernas de AI-assisted development.",
            Email = "gustavofragascunha@gmail.com",
            Phone = "+55 11 98019-2710",
            LinkedIn = "https://linkedin.com/in/gustavofragascunha",
            GitHub = "https://github.com/GustavoFragas",
            Location = "São Paulo, Brasil",
            ImageUrl = "/images/profile.jpg"
        });

        // Seed Experiences
        modelBuilder.Entity<Experience>().HasData(
            new Experience
            {
                Id = Guid.NewGuid(),
                Company = "Alest Consultoria",
                Role = "Software Engineer | Desenvolvimento de Sistemas",
                StartDate = new DateTime(2025, 10, 27),
                EndDate = null,
                IsCurrent = true,
                Description = "• Desenvolvimento de APIs, integrações e automações para plataformas internas e ferramentas SaaS\n• Construção de rotinas de observabilidade, saneamento de dados e rastreio de execuções para apoiar decisões técnicas\n• Uso de C#/.NET, TypeScript, Node.js, React, AWS, SQL/NoSQL e integrações com Notion, Monday e Google APIs\n• Aplicação prática de AI-assisted development com Codex, Kiro e Windsurf para acelerar entregas com revisão técnica"
            },
            new Experience
            {
                Id = Guid.NewGuid(),
                Company = "Atento",
                Role = "Suporte Técnico Trilíngue (META)",
                StartDate = new DateTime(2025, 8, 1),
                EndDate = new DateTime(2025, 10, 31),
                IsCurrent = false,
                Description = "• Suporte técnico especializado para plataformas Meta (Facebook, Instagram, WhatsApp)\n• Atendimento trilíngue (Português, Espanhol, Inglês) com resolução de 95% dos casos no primeiro contato\n• Redução de 30% no tempo médio de atendimento através de otimização de processos"
            },
            new Experience
            {
                Id = Guid.NewGuid(),
                Company = "IJCSUD",
                Role = "Representante Institucional",
                StartDate = new DateTime(2023, 3, 1),
                EndDate = new DateTime(2025, 4, 30),
                IsCurrent = false,
                Description = "• Liderança e gestão de equipe de 70+ pessoas, resultando em crescimento de 210% nas métricas principais (38 para 118 batizados)\n• Implementação de sistema de treinamento que capacitou 70+ pessoas, aumentando a produtividade em 40%\n• Gestão de dados e análise de métricas usando Excel, otimizando processos e tomada de decisões estratégicas"
            },
            new Experience
            {
                Id = Guid.NewGuid(),
                Company = "Beneficência Portuguesa de São Paulo",
                Role = "Jovem Aprendiz - Suporte Técnico",
                StartDate = new DateTime(2021, 5, 1),
                EndDate = new DateTime(2022, 11, 30),
                IsCurrent = false,
                Description = "• Suporte técnico em ambiente hospitalar com sistema Tasy (gestão hospitalar)\n• Atendimento a 50+ usuários diários, mantendo 98% de satisfação\n• Redução de 25% no tempo de resolução de incidentes através de documentação de processos e criação de base de conhecimento"
            }
        );

        // Seed Skills
        modelBuilder.Entity<Skill>().HasData(
            // Backend
            new Skill { Id = Guid.NewGuid(), Name = "C#", Category = "Backend", Level = 55 },
            new Skill { Id = Guid.NewGuid(), Name = ".NET", Category = "Backend", Level = 50 },
            new Skill { Id = Guid.NewGuid(), Name = "Python", Category = "Backend", Level = 60 },
            new Skill { Id = Guid.NewGuid(), Name = "TypeScript", Category = "Backend", Level = 45 },
            new Skill { Id = Guid.NewGuid(), Name = "PHP", Category = "Backend", Level = 40 },
            new Skill { Id = Guid.NewGuid(), Name = "Laravel", Category = "Backend", Level = 30 },
            
            // Frontend
            new Skill { Id = Guid.NewGuid(), Name = "React.js", Category = "Frontend", Level = 30 },
            new Skill { Id = Guid.NewGuid(), Name = "HTML5", Category = "Frontend", Level = 70 },
            new Skill { Id = Guid.NewGuid(), Name = "CSS3", Category = "Frontend", Level = 70 },
            new Skill { Id = Guid.NewGuid(), Name = "TailwindCSS", Category = "Frontend", Level = 30 },
            
            // Database
            new Skill { Id = Guid.NewGuid(), Name = "SQL Server", Category = "Database", Level = 50 },
            new Skill { Id = Guid.NewGuid(), Name = "MySQL", Category = "Database", Level = 55 },
            new Skill { Id = Guid.NewGuid(), Name = "PostgreSQL", Category = "Database", Level = 30 },
            new Skill { Id = Guid.NewGuid(), Name = "NoSQL", Category = "Database", Level = 30 },
            new Skill { Id = Guid.NewGuid(), Name = "phpMyAdmin", Category = "Database", Level = 50 },
            
            // Tools
            new Skill { Id = Guid.NewGuid(), Name = "Git", Category = "Tools", Level = 60 },
            new Skill { Id = Guid.NewGuid(), Name = "GitHub", Category = "Tools", Level = 60 },
            new Skill { Id = Guid.NewGuid(), Name = "Visual Studio", Category = "Tools", Level = 55 },
            new Skill { Id = Guid.NewGuid(), Name = "VS Code", Category = "Tools", Level = 65 },
            new Skill { Id = Guid.NewGuid(), Name = "Windsurf IDE", Category = "Tools", Level = 60 },
            new Skill { Id = Guid.NewGuid(), Name = "Notion", Category = "Tools", Level = 80 },
            new Skill { Id = Guid.NewGuid(), Name = "XAMPP", Category = "Tools", Level = 30 },
            new Skill { Id = Guid.NewGuid(), Name = "USBWebServer", Category = "Tools", Level = 50 },
            new Skill { Id = Guid.NewGuid(), Name = "Google Cloud Platform", Category = "Tools", Level = 30 },
            
            // Soft Skills
            new Skill { Id = Guid.NewGuid(), Name = "Liderança", Category = "Soft Skills", Level = 85 },
            new Skill { Id = Guid.NewGuid(), Name = "Comunicação", Category = "Soft Skills", Level = 90 },
            new Skill { Id = Guid.NewGuid(), Name = "Resolução de Problemas", Category = "Soft Skills", Level = 85 },
            new Skill { Id = Guid.NewGuid(), Name = "Trabalho em Equipe", Category = "Soft Skills", Level = 85 },
            new Skill { Id = Guid.NewGuid(), Name = "Proatividade", Category = "Soft Skills", Level = 90 },
            
            // Languages
            new Skill { Id = Guid.NewGuid(), Name = "Português (Nativo)", Category = "Languages", Level = 100 },
            new Skill { Id = Guid.NewGuid(), Name = "Espanhol (Fluente)", Category = "Languages", Level = 95 },
            new Skill { Id = Guid.NewGuid(), Name = "Inglês (B2)", Category = "Languages", Level = 85 }
        );

        // Seed Projects
        modelBuilder.Entity<Project>().HasData(
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Portfólio Técnico",
                Description = "Portfolio profissional com frontend responsivo em React/Vite, dados centralizados em TypeScript e backend .NET mantido como referência arquitetural para API, entidades, repositórios e testes.",
                TechStack = "React, TypeScript, TailwindCSS, .NET 10, Clean Architecture",
                RepoUrl = "https://github.com/GustavoFragas/Portfolio-Pessoal",
                DemoUrl = null,
                ImageUrl = "/images/projects/portfolio.jpg",
                CreatedAt = new DateTime(2025, 11, 1)
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Title = "Sistema para Estacionamento",
                Description = "Sistema completo para gestão de estacionamentos com controle de entrada/saída de veículos, cálculo automático de tarifas e geração de relatórios. Desenvolvido em C# com Windows Forms.",
                TechStack = "C#, Windows Forms, SQL Server",
                RepoUrl = "https://github.com/GustavoFragas/Sistema-para-Estacionamento",
                DemoUrl = null,
                ImageUrl = "/images/projects/parking.jpg",
                CreatedAt = new DateTime(2024, 6, 1)
            }
        );

        // Seed Certificates
        modelBuilder.Entity<Certificate>().HasData(
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Certificação B2 - Inglês Avançado",
                Issuer = "LingoPass",
                IssueDate = new DateTime(2025, 8, 15),
                CredentialUrl = "/certificates/Lingopass certificate B2 Advanced.pdf",
                LogoUrl = "/images/certificates/lingopass.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Versionamento de Código com Git e GitHub",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 7, 10),
                CredentialUrl = "/certificates/Versionamento de Código com Git e GitHub.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Sintaxe Básica com .NET C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 7, 15),
                CredentialUrl = "/certificates/Sintaxe Básica com .NET CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Sintaxe e Tipos de Dados em C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 7, 18),
                CredentialUrl = "/certificates/Sintaxe e Tipos de Dados em CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Operadores Aritméticos em C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 7, 20),
                CredentialUrl = "/certificates/Operadores Aritméticos em CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Tipos de Operadores em C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 7, 22),
                CredentialUrl = "/certificates/Tipos de Operadores em CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Conhecendo a Organização de um Programa C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 7, 25),
                CredentialUrl = "/certificates/Conhecendo a Organização de um Programa CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Conhecendo as Estruturas de Repetição em C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 7, 28),
                CredentialUrl = "/certificates/Conhecendo as Estruturas de Repetição em CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Array e Listas em C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 8, 1),
                CredentialUrl = "/certificates/Array e Listas em CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Propriedades, Métodos e Construtores com C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 8, 5),
                CredentialUrl = "/certificates/Propriedades, Métodos e Construtores com CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Comentários e Boas Práticas em C#",
                Issuer = "Digital Innovation One (DIO)",
                IssueDate = new DateTime(2025, 8, 8),
                CredentialUrl = "/certificates/Comentários e Boas Práticas em CSharp.pdf",
                LogoUrl = "/images/certificates/dio.png"
            },
            new Certificate
            {
                Id = Guid.NewGuid(),
                Name = "Notion Certified Admin",
                Issuer = "Notion",
                IssueDate = new DateTime(2025, 10, 15),
                CredentialUrl = "https://www.credly.com/badges/b42ef774-8d31-4ede-bd53-2166f9b30946",
                LogoUrl = "/certificates/notion-certified-admin.png"
            }
        );

        // Seed Education
        modelBuilder.Entity<Education>().HasData(
            new Education
            {
                Id = Guid.NewGuid(),
                Institution = "BYU Pathway Worldwide 🇺🇸",
                Degree = "Bacharelado",
                Field = "Software Development",
                StartDate = new DateTime(2025, 5, 1),
                EndDate = null,
                IsCurrent = true,
                Description = "Programa internacional de desenvolvimento de software com foco em programação, banco de dados e desenvolvimento web. Instituição americana credenciada. Atualmente no 4º bloco do programa.",
                Url = "https://www.byupathway.edu/"
            },
            new Education
            {
                Id = Guid.NewGuid(),
                Institution = "UFBRA",
                Degree = "Tecnólogo",
                Field = "Análise e Desenvolvimento de Sistemas",
                StartDate = new DateTime(2025, 10, 1),
                EndDate = null,
                IsCurrent = true,
                Description = "Curso superior de tecnologia focado em desenvolvimento de sistemas, banco de dados e engenharia de software. 1º semestre em andamento.",
                Url = "https://www.ufbra.edu.br/"
            },
            new Education
            {
                Id = Guid.NewGuid(),
                Institution = "ETEC Parque Belém",
                Degree = "Técnico",
                Field = "Desenvolvimento de Sistemas",
                StartDate = new DateTime(2020, 2, 1),
                EndDate = new DateTime(2022, 12, 31),
                IsCurrent = false,
                Description = "Curso técnico completo em desenvolvimento de sistemas com foco em programação, banco de dados e desenvolvimento web.",
                Url = "https://www.cps.sp.gov.br/"
            },
            new Education
            {
                Id = Guid.NewGuid(),
                Institution = "Digital Innovation One (DIO)",
                Degree = "Bootcamp",
                Field = ".NET e Banco de Dados MySQL",
                StartDate = new DateTime(2025, 6, 1),
                EndDate = null,
                IsCurrent = true,
                Description = "Plataforma de aprendizado com foco em .NET, C#, MySQL e desenvolvimento backend.",
                Url = "https://www.dio.me/"
            },
            new Education
            {
                Id = Guid.NewGuid(),
                Institution = "Autodidata",
                Degree = "Estudos",
                Field = "AWS Cloud Practitioner",
                StartDate = new DateTime(2025, 11, 1),
                EndDate = null,
                IsCurrent = true,
                Description = "Estudando para certificação AWS Cloud Practitioner com foco em serviços de nuvem e arquitetura AWS.",
                Url = "https://aws.amazon.com/certification/certified-cloud-practitioner/"
            },
            new Education
            {
                Id = Guid.NewGuid(),
                Institution = "Autodidata",
                Degree = "Estudos",
                Field = "Monday.com Platform",
                StartDate = new DateTime(2025, 10, 1),
                EndDate = null,
                IsCurrent = true,
                Description = "Aprendendo gerenciamento de projetos e automação de processos com Monday.com.",
                Url = "https://monday.com/"
            },
            new Education
            {
                Id = Guid.NewGuid(),
                Institution = "Notion",
                Degree = "Ferramenta",
                Field = "Organização e Produtividade",
                StartDate = new DateTime(2025, 10, 1),
                EndDate = null,
                IsCurrent = true,
                Description = "Uso avançado do Notion para organização pessoal, gestão de projetos e documentação.",
                Url = "https://www.notion.so/"
            }
        );
    }
}
