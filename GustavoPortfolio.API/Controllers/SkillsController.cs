using GustavoPortfolio.Application.DTOs;
using GustavoPortfolio.Application.Interfaces;
using GustavoPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GustavoPortfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly IRepository<Skill> _repository;

    public SkillsController(IRepository<Skill> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SkillDto>>> GetAll()
    {
        var skills = await _repository.GetAllAsync();
        var skillDtos = skills.Select(s => new SkillDto
        {
            Id = s.Id,
            Name = s.Name,
            Category = s.Category,
            Level = s.Level
        });
        return Ok(skillDtos);
    }

    [HttpGet("by-category/{category}")]
    public async Task<ActionResult<IEnumerable<SkillDto>>> GetByCategory(string category)
    {
        var skills = await _repository.GetAllAsync();
        var filteredSkills = skills.Where(s => s.Category.Equals(category, StringComparison.OrdinalIgnoreCase));
        var skillDtos = filteredSkills.Select(s => new SkillDto
        {
            Id = s.Id,
            Name = s.Name,
            Category = s.Category,
            Level = s.Level
        });
        return Ok(skillDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SkillDto>> GetById(Guid id)
    {
        var skill = await _repository.GetByIdAsync(id);
        if (skill == null)
            return NotFound();

        var skillDto = new SkillDto
        {
            Id = skill.Id,
            Name = skill.Name,
            Category = skill.Category,
            Level = skill.Level
        };
        return Ok(skillDto);
    }
}
