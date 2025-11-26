namespace GustavoPortfolio.Domain.Entities;

public class Experience
{
    public Guid Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool IsCurrent { get; set; }
}
