using HospitalAppointmentSystem.Core;
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

        public async Task<IEnumerable<Prescription>> GetAllAsync()
        {
            return await _context.Prescriptions
                .Include(p => p.Doctor).ThenInclude(d => d.User)
                .Include(p => p.Patient).ThenInclude(p => p.User)
                .ToListAsync();
        }

        public async Task<Prescription> GetByIdAsync(int id)
        {
            return await _context.Prescriptions.FindAsync(id);
        }

        public async Task<Prescription> GetByIdWithDetailsAsync(int id)
        {
            return await _context.Prescriptions
                .Include(p => p.Doctor).ThenInclude(d => d.User)
                .Include(p => p.Patient).ThenInclude(p => p.User)
                // .Include(p => p.Appointment)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Prescription>> GetByDoctorAsync(int doctorId)
        {
            return await _context.Prescriptions
                .Include(p => p.Doctor).ThenInclude(d => d.User)
                .Include(p => p.Patient).ThenInclude(p => p.User)
                .Where(p => p.DoctorId == doctorId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Prescription>> GetByPatientAsync(int patientId)
        {
            return await _context.Prescriptions
                .Include(p => p.Doctor).ThenInclude(d => d.User)
                .Include(p => p.Patient).ThenInclude(p => p.User)
                .Where(p => p.PatientId == patientId)
                .ToListAsync();
        }

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

        public IQueryable<Prescription> GetQueryable()
        {
            return _context.Prescriptions
                .Include(p => p.Doctor).ThenInclude(d => d.User)
                .Include(p => p.Patient).ThenInclude(p => p.User)
                .AsQueryable();
        }
    }
}