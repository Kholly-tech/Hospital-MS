FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# Copy ALL .csproj files first (for efficient restore)
COPY *.sln .
COPY HospitalManagementSystem.API/*.csproj ./HospitalManagementSystem.API/
COPY HospitalManagementSystem.Core/*.csproj ./HospitalManagementSystem.Core/
COPY HospitalManagementSystem.Infrastructure/*.csproj ./HospitalManagementSystem.Infrastructure/
COPY HospitalManagementSystem.Shared/*.csproj ./HospitalManagementSystem.Shared/
RUN dotnet restore
# Copy everything else
COPY . .
RUN dotnet publish "HospitalManagementSystem.API/HospitalManagementSystem.API.csproj" -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "HospitalManagementSystem.API.dll"]