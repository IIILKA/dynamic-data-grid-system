FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8001
EXPOSE 4431

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["DDGS.Api/DDGS.Api.csproj", "DDGS.Api/"]
COPY ["DDGS.Core/DDGS.Core.csproj", "DDGS.Core/"]
COPY ["DDGS.Identity/DDGS.Identity.csproj", "DDGS.Identity/"]
RUN dotnet restore "./DDGS.Identity/DDGS.Identity.csproj"
COPY . .
WORKDIR "/src/DDGS.Identity"
RUN dotnet build "./DDGS.Identity.csproj" -c %BUILD_CONFIGURATION% -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./DDGS.Identity.csproj" -c %BUILD_CONFIGURATION% -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DDGS.Identity.dll"]
