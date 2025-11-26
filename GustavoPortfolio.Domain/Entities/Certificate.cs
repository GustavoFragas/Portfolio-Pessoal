namespace GustavoPortfolio.Domain.Entities;

public class Certificate
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public DateTime IssueDate { get; set; }
    public string CredentialUrl { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
}
