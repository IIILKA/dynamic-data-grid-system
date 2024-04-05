# Work breakdown structure

## Dynamic Data Grid System

1. Create base for application
   1. Backend
      1. Create ASP.NET Core application
      2. Add necessary libs
         1. System.Text.Json
         2. Serilog
         3. Mapster
         4. Swagger
         5. XUnit / AutoFixture / NSubstitute / Shouldly
      3. Configure linter
      4. Add Docker compose
   2. DB
      1. Add MongoDB driver for .NET
      2. Add generic repository
      3. Add Docker Compose
   3. Frontend
      1. Create React application
      2. Add necessary libs
         1. Linter
         2. Choose and add UI lib
         3. Choose and add Icon lib
         4. Choose and add lib for tests
         5. Others...
      3. Add Docker compose
2. Add Authorization and Authentication
   1. Choose identity library and ways to authorization/authentication
   2. Add Identity server (if it necessary)
   3. Add login page
      1. Configure form components
      2. Create the page
   4. Add profile page
3. Add Data grid (with primitive date types)
   1. Frontend
      1. Create data grid component
         1. To learn how to do this
      2. Add CRUD data grid pages
         1. Add index data grid page
         2. Add create data grid page
         3. Add edit data grid page
         4. Add details data grid page (maybe it is not necessary)
   2. Backend
      1. Add data grid
      2. Add endpoints for data grid CRUD operations
         1. Add index data grid endpoint
         2. Add create data grid endpoint
         3. Add edit data grid endpoint
         4. Add details data grid endpoint (maybe it is not necessary)
      3. Add permissions for data grids
4. Add remaining types for Data grid
   1. Email supporting
      1. Frontend
      2. Backend
   2. Regexp validated supporting
      1. Frontend
      2. Backend
   3. External collection supporting
      1. Frontend
      2. Backend
   4. Single-select supporting
      1. Frontend
      2. Backend
   5. Multi-select supporting
      1. Frontend
      2. Backend