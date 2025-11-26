using GustavoPortfolio.Application.DTOs;
using GustavoPortfolio.Application.Interfaces;
using GustavoPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GustavoPortfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExperiencesController : ControllerBase
{
    private readonly IRepository<Experience> _repository;

    public ExperiencesController(IRepository<Experience> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExperienceDto>>> GetAll()
    {
        var experiences = await _repository.GetAllAsync();
        var experienceDtos = experiences.Select(e => new ExperienceDto
        {
            Id = e.Id,
            Company = e.Company,
            Role = e.Role,
            StartDate = e.StartDate,
            EndDate = e.EndDate,
            Description = e.Description,
            IsCurrent = e.IsCurrent
        }).OrderByDescending(e => e.StartDate);
        return Ok(experienceDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ExperienceDto>> GetById(Guid id)
    {
        var experience = await _repository.GetByIdAsync(id);
        if (experience == null)
            return NotFound();

        var experienceDto = new ExperienceDto
        {
            Id = experience.Id,
            Company = experience.Company,
            Role = experience.Role,
            StartDate = experience.StartDate,
            EndDate = experience.EndDate,
            Description = experience.Description,
            IsCurrent = experience.IsCurrent
        };
        return Ok(experienceDto);
    }
}
