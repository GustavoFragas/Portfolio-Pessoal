using GustavoPortfolio.Application.DTOs;
using GustavoPortfolio.Application.Interfaces;
using GustavoPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GustavoPortfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IRepository<Project> _repository;

    public ProjectsController(IRepository<Project> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAll()
    {
        var projects = await _repository.GetAllAsync();
        var projectDtos = projects.Select(p => new ProjectDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            TechStack = p.TechStack,
            RepoUrl = p.RepoUrl,
            DemoUrl = p.DemoUrl,
            ImageUrl = p.ImageUrl,
            CreatedAt = p.CreatedAt
        });
        return Ok(projectDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetById(Guid id)
    {
        var project = await _repository.GetByIdAsync(id);
        if (project == null)
            return NotFound();

        var projectDto = new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            TechStack = project.TechStack,
            RepoUrl = project.RepoUrl,
            DemoUrl = project.DemoUrl,
            ImageUrl = project.ImageUrl,
            CreatedAt = project.CreatedAt
        };
        return Ok(projectDto);
    }
}
