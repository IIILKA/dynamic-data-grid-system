using DDGS.Api.Configuration;
using DDGS.Api.DataGrid.Configuration;
using DDGS.Api.Utils;
using DDGS.Infrastructure;
using DDGS.Infrastructure.Core;
using DDGS.Infrastructure.Core.Interfaces;
using DDGS.Infrastructure.MongoDb;
using DDGS.Infrastructure.PostgresDb;
using Mapster;

var builder = WebApplication.CreateBuilder(args);

var typeAdapterConfig = new TypeAdapterConfig();

builder.Services
    .AddMongoDb()
    .AddPostgresDb()
    .AddDbServices()
    .AddOpenIddictAuthentication()
    .AddAuthorization()
    .AddDdgsCors()
    .AddScoped<IEntityIdGenerator, EntityIdGenerator>() //TODO: Refactor, maybe change this service
    //.AddTestServices()
    .AddDdgsIdentity()
    .AddDataGrid(typeAdapterConfig)
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
    await DatabaseStateSynchronizer.SyncMigrationsAsync<DdgsDbContext>(app);
}

app.Run();
