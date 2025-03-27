namespace HospitalAppointmentSystem.Core
{
    public class Patient : User
    {
        public string Address { get; set; }
        public string InsuranceProvider { get; set; }
        public string InsurancePolicyNumber { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}