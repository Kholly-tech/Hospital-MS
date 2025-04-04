using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HospitalAppointmentSystem.Core;
using HospitalAppointmentSystem.Core.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace HospitalAppointmentSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IDoctorRepository _doctorRepository;
        private readonly IPatientRepository _patientRepository;
        private readonly ILogger<AppointmentsController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public AppointmentsController(
            IAppointmentRepository appointmentRepository,
            IDoctorRepository doctorRepository,
            IPatientRepository patientRepository,
            ILogger<AppointmentsController> logger,
            IMapper mapper,
            UserManager<User> userManager
            )
        {
            _appointmentRepository = appointmentRepository;
            _doctorRepository = doctorRepository;
            _patientRepository = patientRepository;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize("Admin")]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAllAppointments()
        {
            try
            {
                var appointments = await _appointmentRepository.GetAll()
                    .Include(a => a.Patient)
                        .ThenInclude(p => p.User)
                    .Include(a => a.Doctor)
                        .ThenInclude(d => d.User)
                    .ToListAsync();
                
                return Ok(_mapper.Map<List<AppointmentDto>>(appointments));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving appointments");
                return StatusCode(500, "An error occurred while retrieving appointments");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppointmentDto>> GetAppointment(int id)
        {
            try
            {
                var appointment = await _appointmentRepository.GetAll()
                    .Include(a => a.Patient)
                        .ThenInclude(p => p.User)
                    .Include(a => a.Doctor)
                        .ThenInclude(d => d.User)
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (appointment == null)
                {
                    return NotFound();
                }

                return Ok(_mapper.Map<AppointmentDto>(appointment));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving appointment with id {id}");
                return StatusCode(500, $"An error occurred while retrieving appointment with id {id}");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AppointmentDto>> CreateAppointment([FromBody] CreateAppointmentDto createAppointmentDto)
        {
            try
            {
                var appointment = _mapper.Map<Appointment>(createAppointmentDto);

                // Manually set the Patient and Doctor since they come from repositories
                appointment.Patient = await _patientRepository.GetByIdAsync(createAppointmentDto.PatientId);
                appointment.Doctor = await _doctorRepository.GetByIdAsync(createAppointmentDto.DoctorId);
                
                if (appointment.Patient == null || appointment.Doctor == null)
                {
                    return BadRequest("Invalid patient or doctor ID");
                }

                var user = await _userManager.GetUserAsync(User);
                var roles = await _userManager.GetRolesAsync(user!);
                if(roles.Contains("Doctor")) appointment.Status = NewStatus.Approved;
                else appointment.Status = NewStatus.Pending;
                appointment.CreatedAt = DateTime.UtcNow;

                await _appointmentRepository.AddAsync(appointment);

                var appointmentDto = _mapper.Map<AppointmentDto>(appointment);
                return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointmentDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating appointment");
                return StatusCode(500, "An error occurred while creating appointment");
            }
        }

        [HttpPut("{id}/cancel")]
        [Authorize]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            try
            {
                var appointment = await _appointmentRepository.GetByIdAsync(id);
                if (appointment == null)
                {
                    return NotFound();
                }

                if (DateTime.Now.AddHours(48) > appointment.AppointmentDate)
                {
                    return BadRequest("Appointments can only be cancelled up to 48 hours before the scheduled time.");
                }

                appointment.Status = NewStatus.Cancelled;
                appointment.UpdatedAt = DateTime.UtcNow;

                await _appointmentRepository.UpdateAsync(appointment);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error cancelling appointment with id {id}");
                return StatusCode(500, $"An error occurred while cancelling appointment with id {id}");
            }
        }

        [HttpPut("admin/{id}/cancel")]
        [Authorize("Admin")]
        public async Task<IActionResult> AdminCancelAppointment(int id)
        {
            try
            {
                var appointment = await _appointmentRepository.GetByIdAsync(id);
                if (appointment == null)
                {
                    return NotFound();
                }

                // if (DateTime.Now.AddHours(48) > appointment.AppointmentDate)
                // {
                //     return BadRequest("Appointments can only be cancelled up to 48 hours before the scheduled time.");
                // }

                appointment.Status = NewStatus.Cancelled;
                appointment.UpdatedAt = DateTime.UtcNow;

                await _appointmentRepository.UpdateAsync(appointment);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error cancelling appointment with id {id}");
                return StatusCode(500, $"An error occurred while cancelling appointment with id {id}");
            }
        }

        [HttpPut("{id}/accept")]
        [Authorize("AdminorDoctor")]
        public async Task<IActionResult> AcceptAppointment(int id)
        {
            try
            {
                var appointment = await _appointmentRepository.GetByIdAsync(id);
                if (appointment == null)
                {
                    return NotFound();
                }

                // if (DateTime.Now.AddHours(48) > appointment.AppointmentDate)
                // {
                //     return BadRequest("Appointments can only be cancelled up to 48 hours before the scheduled time.");
                // }

                appointment.Status = NewStatus.Approved;
                appointment.UpdatedAt = DateTime.UtcNow;

                await _appointmentRepository.UpdateAsync(appointment);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error cancelling appointment with id {id}");
                return StatusCode(500, $"An error occurred while cancelling appointment with id {id}");
            }
        }

        // [HttpPut("update")]
        // [Authorize]
        // public async Task

        [HttpGet("doctor/{doctorId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetDoctorAppointments(int doctorId)
        {
            try
            {
                var appointments = await _appointmentRepository.GetAll()
                    .Include(a => a.Patient)
                        .ThenInclude(p => p.User)
                    .Include(a => a.Doctor)
                        .ThenInclude(d => d.User)
                    .Where(a => a.DoctorId == doctorId)
                    .ToListAsync();

                return Ok(_mapper.Map<List<AppointmentDto>>(appointments));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving appointments for doctor with id {doctorId}");
                return StatusCode(500, $"An error occurred while retrieving appointments for doctor with id {doctorId}");
            }
        }

        [HttpGet("patient/{patientId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetPatientAppointments(int patientId)
        {
            try
            {
                var appointments = await _appointmentRepository.GetAll()
                    .Include(a => a.Patient)
                        .ThenInclude(p => p.User)
                    .Include(a => a.Doctor)
                        .ThenInclude(d => d.User)
                    .Where(a => a.PatientId == patientId)
                    .ToListAsync();

                return Ok(_mapper.Map<List<AppointmentDto>>(appointments));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving appointments for patient with id {patientId}");
                return StatusCode(500, $"An error occurred while retrieving appointments for patient with id {patientId}");
            }
        }
    }
}