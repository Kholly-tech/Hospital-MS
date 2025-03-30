using HospitalAppointmentSystem.Core;
using HospitalAppointmentSystem.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HospitalAppointmentSystem.Infrastructure.Repositories
{
    public class PrescriptionRepository : IPrescriptionRepository
    {
        private readonly HospitalDbContext _context;

        public PrescriptionRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<Prescription?> GetByIdAsync(int id)
            => await _context.Prescriptions.FindAsync(id);

        public async Task<Prescription?> GetByIdWithDetailsAsync(int id)
            => await _context.Prescriptions
                .Include(p => p.Doctor)
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.Id == id);

        public IQueryable<Prescription> GetQueryable()
            => _context.Prescriptions.AsQueryable();

        public async Task AddAsync(Prescription prescription)
        {
            await _context.Prescriptions.AddAsync(prescription);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Prescription prescription)
        {
            _context.Prescriptions.Update(prescription);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Prescription prescription)
        {
            _context.Prescriptions.Remove(prescription);
            await _context.SaveChangesAsync();
        }

        public async Task<(List<Prescription> items, int totalCount)> GetByDoctorWithPagingAsync(
            int doctorId, int pageNumber, int pageSize)
        {
            var query = _context.Prescriptions
                .Where(p => p.DoctorId == doctorId)
                .Include(p => p.Doctor)
                .Include(p => p.Patient);

            var totalCount = await query.CountAsync();
            
            var items = await query
                .OrderByDescending(p => p.PrescribedDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }

        public async Task<(List<Prescription> items, int totalCount)> GetByPatientWithPagingAsync(
            int patientId, int pageNumber, int pageSize)
        {
            var query = _context.Prescriptions
                .Where(p => p.PatientId == patientId)
                .Include(p => p.Doctor)
                .Include(p => p.Patient);

            var totalCount = await query.CountAsync();
            
            var items = await query
                .OrderByDescending(p => p.PrescribedDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }
    }
}