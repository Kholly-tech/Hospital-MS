using HospitalAppointmentSystem.Core;
using HospitalAppointmentSystem.Core.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HospitalAppointmentSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentsController(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        [HttpGet]
        // [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAllAppointments()
        {
            var appointments = await _appointmentRepository.GetAllAsync();
            return Ok(appointments.Select(a => new AppointmentDto
            {
                Id = a.Id,
                PatientId = a.PatientId,
                patient = a.Patient,
                DoctorId = a.DoctorId,
                doctor = a.Doctor,
                AppointmentDate = a.AppointmentDate,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Status = a.Status,
                Notes = a.Notes
            }));
        }

        [HttpGet("{id}")]
        // [Authorize]
        public async Task<ActionResult<AppointmentDto>> GetAppointment(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(new AppointmentDto
            {
                Id = appointment.Id,
                PatientId = appointment.PatientId,
                DoctorId = appointment.DoctorId,
                AppointmentDate = appointment.AppointmentDate,
                StartTime = appointment.StartTime,
                EndTime = appointment.EndTime,
                Status = appointment.Status,
                Notes = appointment.Notes
            });
        }

        [HttpPost]
        // [Authorize(Roles = "Patient")]
        public async Task<ActionResult<AppointmentDto>> CreateAppointment([FromBody] CreateAppointmentDto createAppointmentDto)
        {
            // Validate appointment time, doctor availability, etc.
            // This would be more complex in a real implementation
            
            var appointment = new Appointment
            {
                PatientId = createAppointmentDto.PatientId,
                DoctorId = createAppointmentDto.DoctorId,
                AppointmentDate = createAppointmentDto.AppointmentDate,
                StartTime = createAppointmentDto.StartTime,
                EndTime = createAppointmentDto.EndTime,
                Notes = createAppointmentDto.Notes,
                Status = AppointmentStatus.Pending
            };

            await _appointmentRepository.AddAsync(appointment);

            return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, 
                new AppointmentDto
                {
                    Id = appointment.Id,
                    PatientId = appointment.PatientId,
                    DoctorId = appointment.DoctorId,
                    AppointmentDate = appointment.AppointmentDate,
                    StartTime = appointment.StartTime,
                    EndTime = appointment.EndTime,
                    Status = appointment.Status,
                    Notes = appointment.Notes
                });
        }

        [HttpPut("{id}/cancel")]
        // [Authorize(Roles = "Patient")]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            // Check if cancellation is allowed (48 hours before)
            if (DateTime.Now.AddHours(48) > appointment.AppointmentDate)
            {
                return BadRequest("Appointments can only be cancelled up to 48 hours before the scheduled time.");
            }

            appointment.Status = AppointmentStatus.Cancelled;
            appointment.UpdatedAt = DateTime.UtcNow;

            await _appointmentRepository.UpdateAsync(appointment);

            return NoContent();
        }
    }
}