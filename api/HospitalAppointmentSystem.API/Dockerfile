FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# Copy ALL .csproj files first (for efficient restore)
COPY *.sln .
COPY HospitalAppointmentSystem.API/*.csproj ./HospitalAppointmentSystem.API/
COPY HospitalAppointmentSystem.Core/*.csproj ./HospitalAppointmentSystem.Core/
COPY HospitalAppointmentSystem.Infrastructure/*.csproj ./HospitalAppointmentSystem.Infrastructure/
COPY HospitalAppointmentSystem.Shared/*.csproj ./HospitalAppointmentSystem.Shared/
RUN dotnet restore
# Copy everything else
COPY . .
RUN dotnet publish "HospitalAppointmentSystem.API/HospitalAppointmentSystem.API.csproj" -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "HospitalAppointmentSystem.API.dll"]