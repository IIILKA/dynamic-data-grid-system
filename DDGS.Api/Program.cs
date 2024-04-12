using DDGS.Core.TestFeature;
using DDGS.Core.TestFeature.Interfaces;
using DDGS.Infrastructure.Configuration;
using DDGS.Infrastructure.TestFeature;
using Mapster;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbServices();

builder.Services.AddScoped<ITestRepository, TestRepository>();
builder.Services.AddScoped<ITestService, TestService>();

builder.Services.AddMapster();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
