namespace HospitalAppointmentSystem.Core
{
    public class Doctor : User
    {
        public string Specialization { get; set; }
        public string LicenseNumber { get; set; }
        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}