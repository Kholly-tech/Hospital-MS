namespace HospitalAppointmentSystem.Core.DTOs
{
    public class PrescriptionDto
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }
        public DoctorDto Doctor { get; set; }
        public PatientDto Patient { get; set; }
        public string Medication { get; set; }
        public string Dosage { get; set; }
        public string Instructions { get; set; }
        public DateTime PrescribedDate { get; set; }
        public TimeSpan Duration { get; set; }
    }

    public class CreatePrescriptionDto
    {
        public int AppointmentId { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public string Medication { get; set; }
        public string Dosage { get; set; }
        public string Instructions { get; set; }
        public TimeSpan Duration { get; set; }
    }

    public class UpdatePrescriptionDto
    {
        public string Medication { get; set; }
        public string Dosage { get; set; }
        public string Instructions { get; set; }
        public TimeSpan Duration { get; set; }
    }
}