namespace HospitalAppointmentSystem.Core
{
    public interface IDoctorRepository
    {
        Task<Doctor> GetByIdAsync(int id);
        Task<IEnumerable<Doctor>> GetAllAsync();
        Task AddAsync(Doctor doctor);
        Task UpdateAsync(Doctor doctor);
        Task DeleteAsync(Doctor doctor);
        Task<IEnumerable<Doctor>> GetBySpecializationAsync(string specialization);
    }
}