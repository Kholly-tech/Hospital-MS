# Dockerfile (place in HospitalManagementSystem.API folder)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish "HospitalManagementSystem.API.csproj" -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://*:$PORT
ENTRYPOINT ["dotnet", "HospitalManagementSystem.API.dll"]