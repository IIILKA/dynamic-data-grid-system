using DDGS.Api.Configuration;
using DDGS.Api.Utils;
using DDGS.Infrastructure;
using DDGS.Infrastructure.Configuration;
using DDGS.Infrastructure.Core;
using DDGS.Infrastructure.Core.Interfaces;
using Mapster;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMapster();

builder.Services
    .AddMongoDb()
    .AddPostgresDb()
    .AddOpenIddictAuthentication()
    .AddAuthorization()
    .AddDdgsCors()
    .AddScoped<IEntityIdGenerator, EntityIdGenerator>()//TODO: Refactor, maybe change this service
    .AddTestServices()
    .AddEndpointsApiExplorer()
    .AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(options =>
{
    options.MapControllers();
    options.MapDefaultControllerRoute();
});

if (EnvironmentUtils.GetEnvironmentVariableAsBool("AUTO_MIGRATION_ENABLED", false))
{
    await DatabaseStateSynchronizer.SyncMigrationsAsync<DdgsPostgresDbContext>(app);
}

app.Run();
