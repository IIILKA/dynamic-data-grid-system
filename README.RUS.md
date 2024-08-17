# Запуск приложения

Для запуска приложения необходимо перейти в корень проекта

```powershell
cd <Путь к корню проекта>
```

## Настройка https

Вам необходимо сгенерировать ssl сертификаты.
Далее описано как сгенерировать необходимые ssl-сертификаты c помощью .NET CLI. Для использования .NET CLI у вас должен быть установлен .NET

Сначала генерируем .pfx файл для сервера

```powershell
dotnet dev-certs https -ep $env:APPDATA\ASP.NET\Https\DDGS.API.pfx -p ddgs-api-cryptic-password@123
```

---
**NOTE**

*Путь к данному файл можно изменить, но тогда вам придётся сделать соответствующие изменения в файле docker-compose.override.yml так как этот путь используется для volume'а с сертификатом*

*Пароль тоже может быть иным*

---

Далее необходима добавить сертификат в список доверенных сертификатов

```powershell
dotnet dev-certs https --trust
```

Далее настраиваем секреты приложения

```powershell
dotnet user-secrets -p DDGS.API\DDGS.API.csproj set "Kestrel:Certificates:Development:Password" "ddgs-api-cryptic-password@123"
```

---
**NOTE**

*Пароль должен совпадать с паролем сгенерированного сертификата*

---

Далее необходимо сгенерировать сертификат для клиента, но в отличие от сертификата для сервера этот сертификат должен располагаться внутри папки клиента, так как он должен быть доступен докеру на момент сборки контейнера

```powershell
dotnet dev-certs https -ep ddgs.client\https\ddgs.client.pfx -p ddgs-client-cryptic-password@123
```

```powershell
dotnet dev-certs https --trust
```

---
**NOTE**

*Если измените пароль здесь, то так же необходимо сделать соответсвующие изменения в файле ddgs.client\vite.config.ts*

---
**INFO**

*Дополнительная информация по генерации очистке сертификатов смотрите в [документации Microsoft](https://learn.microsoft.com/en-us/dotnet/core/additional-tools/self-signed-certificates-guide)*

---
## Запуск контейнеров

---
**NOTE**

*У вас должен быть установлен докер*

---

Для запуска приложения исполняем следующую команду:

```powershell
docker-compose --profile with-client up -d
```

Клиент будет доступен по url: https://localhost:3000

Сервер ресурсов будет доступен по url: https://localhost:4430

Сервер авторизации будет доступен по url: https://localhost:4431

## Настройка url, портов и строк подключения

Для настройки url, портов и строк подключения смотрите файл .env и docker-compose.override.yml
