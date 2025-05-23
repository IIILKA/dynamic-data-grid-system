FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8000
EXPOSE 4430

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["DDGS.Api/DDGS.Api.csproj", "DDGS.Api/"]
COPY ["DDGS.Core/DDGS.Core.csproj", "DDGS.Core/"]
COPY ["DDGS.Infrastructure/DDGS.Infrastructure.csproj", "DDGS.Infrastructure/"]
RUN dotnet restore "./DDGS.Api/DDGS.Api.csproj"
COPY . .
WORKDIR "/src/DDGS.Api"
RUN dotnet build "./DDGS.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./DDGS.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DDGS.Api.dll"]
