using HospitalAppointmentSystem.Core;
using HospitalAppointmentSystem.Core.Enums;
public class AppointmentDto
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public Patient patient {get; set;}
        public int DoctorId { get; set; }

        public Doctor doctor {get; set;}
        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public AppointmentStatus Status { get; set; }
        public string? Notes { get; set; }
    }