using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace GustavoPortfolio.Tests;

public class ControllersTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public ControllersTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task ProfileController_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/api/profile");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task ProjectsController_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/api/projects");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task ExperiencesController_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/api/experiences");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task SkillsController_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/api/skills");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task CertificatesController_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/api/certificates");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task SwaggerEndpoint_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/swagger/v1/swagger.json");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
