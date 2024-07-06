# Launching application

To launch the application, go to the root of the project

```powershell
cd <Path to root of project>
```

## Configuring https (optional)

If you want to use https in the application, you need to generate ssl certificates.
The section on configuring https can be skipped if you don't want to use https, since you can work with this application over http.
The following describes how to generate the necessary ssl certificates using the .NET CLI. To use the .NET CLI, you must have the .NET installed

First, generate a .pfx file for the server

```powershell
dotnet dev-certs https -ep $env:APPDATA\ASP.NET\Https\DDGS.API.pfx -p ddgs-api-cryptic-password@123
```

---
**NOTE**

*The path to this file can be changed, but then you will have to make corresponding changes in the docker-compose.override.yml file, since this path is used for the volume with the certificate*

*The password can be changed too*

---

Next, you need to add the certificate to the list of trusted certificates

```powershell
dotnet dev-certs https --trust
```

Next, customize the application's secrets

```powershell
dotnet user-secrets -p DDGS.API\DDGS.API.csproj set "Kestrel:Certificates:Development:Password" "ddgs-api-cryptic-password@123"
```

---
**NOTE**

*The password must match the password of the generated certificate*

---

Next you need to generate a certificate for the client, but unlike the certificate for the server, this certificate must be located inside the client folder, because of it must be available to the docker at the time the container is built

```powershell
dotnet dev-certs https -ep ddgs.client\https\ddgs.client.pfx -p ddgs-client-cryptic-password@123
```

```powershell
dotnet dev-certs https --trust
```

---
**NOTE**

*If you change the password here, you should also make corresponding changes in the ddgs.client\vite.config.ts file.*

---
---
**INFO**

*For more information about generating certificate and cleanup, see [Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/core/additional-tools/self-signed-certificates-guide)*

---
## Launching containers

You can start containers in three different ways:

---
**NOTE**

*You must have docker installed*

---

- To launch the application running on http and https, execute the following command

```powershell
docker-compose --profile with-clients --profile with-https up -d
```

- If you have not configured https, execute the following command

```powershell
docker-compose --profile with-http-client --profile without-https up -d
```

- If you want to use only https, use the command

```powershell
docker-compose --profile with-https-client --profile with-https up -d
```

The client will be accessible by url:
- https://localhost:3000
- http://localhost:3080

The server will be accessible by url:
- https://localhost:4430/api
- http://localhost:8000/api

## Configuring url, ports and connection strings

See the .env file and docker-compose.override.yml to configure the url, ports, and connection strings
