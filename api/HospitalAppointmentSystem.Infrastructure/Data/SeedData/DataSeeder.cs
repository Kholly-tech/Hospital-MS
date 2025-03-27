using Bogus;
using HospitalAppointmentSystem.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HospitalAppointmentSystem.Infrastructure.Data.SeedData
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(HospitalDbContext context, UserManager<IdentityUser> userManager)
        {
            if (!await context.Doctors.AnyAsync())
            {
                var doctorFaker = new Faker<Doctor>()
                    .RuleFor(d => d.FirstName, f => f.Name.FirstName())
                    .RuleFor(d => d.LastName, f => f.Name.LastName())
                    .RuleFor(d => d.Email, (f, d) => f.Internet.Email(d.FirstName, d.LastName))
                    .RuleFor(d => d.PhoneNumber, f => f.Phone.PhoneNumber())
                    .RuleFor(d => d.DateOfBirth, f => f.Date.Past(30, DateTime.Now.AddYears(-25)))
                    .RuleFor(d => d.Specialization, f => f.PickRandom(new[] { "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology" }))
                    .RuleFor(d => d.LicenseNumber, f => f.Random.AlphaNumeric(10).ToUpper())
                    .RuleFor(d => d.password, f => f.Internet.Password(7, false, "!@#$%^&*()_+"));

                var doctors = doctorFaker.Generate(20);
                await context.Doctors.AddRangeAsync(doctors);

                // Create doctor users
                foreach (var doctor in doctors)
                {
                    var user = new IdentityUser
                    {
                        UserName = doctor.Email,
                        Email = doctor.Email,
                        EmailConfirmed = true
                    };
                    var result = await userManager.CreateAsync(user, "Doctor123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Doctor");
                    }
                }
            }

            if (!await context.Patients.AnyAsync())
            {
                var patientFaker = new Faker<Patient>()
                    .RuleFor(p => p.FirstName, f => f.Name.FirstName())
                    .RuleFor(p => p.LastName, f => f.Name.LastName())
                    .RuleFor(p => p.Email, (f, p) => f.Internet.Email(p.FirstName, p.LastName))
                    .RuleFor(p => p.PhoneNumber, f => f.Phone.PhoneNumber())
                    .RuleFor(p => p.DateOfBirth, f => f.Date.Past(60, DateTime.Now.AddYears(-18)))
                    .RuleFor(p => p.Address, f => f.Address.FullAddress())
                    .RuleFor(p => p.InsuranceProvider, f => f.PickRandom(new[] { "Aetna", "Blue Cross", "UnitedHealth", "Cigna", "Humana" }))
                    .RuleFor(p => p.InsurancePolicyNumber, f => f.Random.AlphaNumeric(10).ToUpper());

                var patients = patientFaker.Generate(1000);
                await context.Patients.AddRangeAsync(patients);

                // Create patient users
                foreach (var patient in patients)
                {
                    var user = new IdentityUser
                    {
                        UserName = patient.Email,
                        Email = patient.Email,
                        EmailConfirmed = true
                    };
                    var result = await userManager.CreateAsync(user, "Patient123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Patient");
                    }
                }
            }

            await context.SaveChangesAsync();

            if (!await context.Schedules.AnyAsync())
            {
                var doctors = await context.Doctors.ToListAsync();
                var scheduleFaker = new Faker<Schedule>();
                
                foreach (var doctor in doctors)
                {
                    for (int i = 0; i < 5; i++) // 5 days per doctor
                    {
                        var schedule = new Schedule
                        {
                            DoctorId = doctor.Id,
                            DayOfWeek = (DayOfWeek)(i % 7),
                            StartTime = new TimeSpan(9, 0, 0),
                            EndTime = new TimeSpan(17, 0, 0),
                            IsAvailable = true
                        };
                        await context.Schedules.AddAsync(schedule);
                    }
                }
                await context.SaveChangesAsync();
            }
        }
    }
}