using GustavoPortfolio.Application.DTOs;
using GustavoPortfolio.Application.Interfaces;
using GustavoPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GustavoPortfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CertificatesController : ControllerBase
{
    private readonly IRepository<Certificate> _repository;

    public CertificatesController(IRepository<Certificate> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CertificateDto>>> GetAll()
    {
        var certificates = await _repository.GetAllAsync();
        var certificateDtos = certificates.Select(c => new CertificateDto
        {
            Id = c.Id,
            Name = c.Name,
            Issuer = c.Issuer,
            IssueDate = c.IssueDate,
            CredentialUrl = c.CredentialUrl,
            LogoUrl = c.LogoUrl
        }).OrderByDescending(c => c.IssueDate);
        return Ok(certificateDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CertificateDto>> GetById(Guid id)
    {
        var certificate = await _repository.GetByIdAsync(id);
        if (certificate == null)
            return NotFound();

        var certificateDto = new CertificateDto
        {
            Id = certificate.Id,
            Name = certificate.Name,
            Issuer = certificate.Issuer,
            IssueDate = certificate.IssueDate,
            CredentialUrl = certificate.CredentialUrl,
            LogoUrl = certificate.LogoUrl
        };
        return Ok(certificateDto);
    }
}
