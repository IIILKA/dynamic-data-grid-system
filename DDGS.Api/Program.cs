using DDGS.Core.TestFeature;
using DDGS.Core.TestFeature.Interfaces;
using DDGS.Infrastructure.Configuration;
using DDGS.Infrastructure.Core;
using DDGS.Infrastructure.Core.Interfaces;
using DDGS.Infrastructure.TestFeature;
using Mapster;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbServices();

//Core
builder.Services.AddScoped<IEntityIdGenerator, EntityIdGenerator>();

//FeatureServices
builder.Services.AddScoped<ITestRepository, TestRepository>();
builder.Services.AddScoped<ITestService, TestService>();

builder.Services.AddMapster();

builder.Services.AddControllers();
//TODO: Configure cors
builder.Services.AddCors(opts =>
{
    opts.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
