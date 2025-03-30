namespace HospitalAppointmentSystem.Core
{
    public interface IPrescriptionRepository
    {
        Task<IEnumerable<Prescription>> GetAllAsync();
        Task<Prescription> GetByIdAsync(int id);
        Task<Prescription> GetByIdWithDetailsAsync(int id);
        Task<IEnumerable<Prescription>> GetByDoctorAsync(int doctorId);
        Task<IEnumerable<Prescription>> GetByPatientAsync(int patientId);
        Task AddAsync(Prescription prescription);
        Task UpdateAsync(Prescription prescription);
        Task DeleteAsync(Prescription prescription);
        IQueryable<Prescription> GetQueryable();
    }
}