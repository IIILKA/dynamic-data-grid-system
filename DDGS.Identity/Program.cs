using DDGS.Infrastructure.Configuration;
using DDGS.Identity.Configuration;
using DDGS.Identity.Utils;
using Mapster;

var builder = WebApplication.CreateBuilder(args);

var typeAdapterConfig = new TypeAdapterConfig();

builder.Services
    .AddPostgresDb()
    .AddDdgsIdentity(typeAdapterConfig)
    .AddDdgsOpenIddict()
    .AddDdgsCors()
    .AddEndpointsApiExplorer()
    .AddSwaggerGen()
    .AddMapper(typeAdapterConfig);

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (EnvironmentUtils.GetEnvironmentVariableAsBool("ASPNETCORE_HTTPS_ENABLED", true))
{
    app.UseHttpsRedirection();
}

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
