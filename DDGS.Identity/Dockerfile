#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

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