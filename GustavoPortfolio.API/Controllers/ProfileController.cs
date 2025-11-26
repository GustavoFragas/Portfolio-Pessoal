using GustavoPortfolio.Application.DTOs;
using GustavoPortfolio.Application.Interfaces;
using GustavoPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GustavoPortfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IRepository<Profile> _repository;

    public ProfileController(IRepository<Profile> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProfileDto>>> GetAll()
    {
        var profiles = await _repository.GetAllAsync();
        var profileDtos = profiles.Select(p => new ProfileDto
        {
            Id = p.Id,
            Name = p.Name,
            Role = p.Role,
            Bio = p.Bio,
            Email = p.Email,
            Phone = p.Phone,
            LinkedIn = p.LinkedIn,
            GitHub = p.GitHub,
            Location = p.Location,
            ImageUrl = p.ImageUrl
        });
        return Ok(profileDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProfileDto>> GetById(Guid id)
    {
        var profile = await _repository.GetByIdAsync(id);
        if (profile == null)
            return NotFound();

        var profileDto = new ProfileDto
        {
            Id = profile.Id,
            Name = profile.Name,
            Role = profile.Role,
            Bio = profile.Bio,
            Email = profile.Email,
            Phone = profile.Phone,
            LinkedIn = profile.LinkedIn,
            GitHub = profile.GitHub,
            Location = profile.Location,
            ImageUrl = profile.ImageUrl
        };
        return Ok(profileDto);
    }
}
