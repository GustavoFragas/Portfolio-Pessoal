using GustavoPortfolio.Application.DTOs;
using GustavoPortfolio.Application.Interfaces;
using GustavoPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GustavoPortfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EducationController : ControllerBase
{
    private readonly IRepository<Education> _repository;

    public EducationController(IRepository<Education> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EducationDto>>> GetAll()
    {
        var educations = await _repository.GetAllAsync();
        var educationDtos = educations.Select(e => new EducationDto
        {
            Id = e.Id,
            Institution = e.Institution,
            Degree = e.Degree,
            Field = e.Field,
            StartDate = e.StartDate,
            EndDate = e.EndDate,
            IsCurrent = e.IsCurrent,
            Description = e.Description,
            Url = e.Url
        }).OrderByDescending(e => e.StartDate);
        return Ok(educationDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EducationDto>> GetById(Guid id)
    {
        var education = await _repository.GetByIdAsync(id);
        if (education == null)
            return NotFound();

        var educationDto = new EducationDto
        {
            Id = education.Id,
            Institution = education.Institution,
            Degree = education.Degree,
            Field = education.Field,
            StartDate = education.StartDate,
            EndDate = education.EndDate,
            IsCurrent = education.IsCurrent,
            Description = education.Description,
            Url = education.Url
        };
        return Ok(educationDto);
    }
}
