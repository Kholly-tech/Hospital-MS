using AutoMapper;
using HospitalAppointmentSystem.Core;
// using HospitalAppointmentSystem.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HospitalAppointmentSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<DoctorsController> _logger;

        public DoctorsController(
            IDoctorRepository doctorRepository,
            IMapper mapper,
            ILogger<DoctorsController> logger)
        {
            _doctorRepository = doctorRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorDto>>> GetAllDoctors()
        {
            try
            {
                var doctors = await _doctorRepository.GetAllWithDetailsAsync();
                return Ok(_mapper.Map<List<DoctorDto>>(doctors));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving doctors");
                return StatusCode(500, "An error occurred while retrieving doctors");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorDto>> GetDoctorById(int id)
        {
            try
            {
                var doctor = await _doctorRepository.GetByIdWithDetailsAsync(id);
                if (doctor == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<DoctorDto>(doctor));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving doctor with id {id}");
                return StatusCode(500, $"An error occurred while retrieving doctor with id {id}");
            }
        }

        [HttpGet("spec/{specialization}")]
        public async Task<ActionResult<IEnumerable<DoctorDto>>> GetDoctorsBySpecialization(string specialization)
        {
            try
            {
                var doctors = await _doctorRepository.GetBySpecializationAsync(specialization);
                if (doctors == null || !doctors.Any())
                {
                    return NotFound($"No doctors found with specialization: {specialization}");
                }
                
                return Ok(_mapper.Map<List<DoctorDto>>(doctors));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving doctors with specialization {specialization}");
                return StatusCode(500, $"An error occurred while retrieving doctors with specialization {specialization}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<DoctorDto>> CreateDoctor([FromBody] CreateDoctorDto doctorDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var doctor = _mapper.Map<Doctor>(doctorDto);
                await _doctorRepository.AddAsync(doctor);
                
                var createdDoctor = await _doctorRepository.GetByIdWithDetailsAsync(doctor.Id);
                return CreatedAtAction(
                    nameof(GetDoctorById), 
                    new { id = doctor.Id }, 
                    _mapper.Map<DoctorDto>(createdDoctor));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating doctor");
                return StatusCode(500, "An error occurred while creating doctor");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] UpdateDoctorDto doctorDto)
        {
            try
            {
                if (id != doctorDto.Id)
                {
                    return BadRequest("ID mismatch");
                }

                var existingDoctor = await _doctorRepository.GetByIdAsync(id);
                if (existingDoctor == null)
                {
                    return NotFound();
                }

                _mapper.Map(doctorDto, existingDoctor);
                await _doctorRepository.UpdateAsync(existingDoctor);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating doctor with id {id}");
                return StatusCode(500, $"An error occurred while updating doctor with id {id}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            try
            {
                var doctor = await _doctorRepository.GetByIdAsync(id);
                if (doctor == null)
                {
                    return NotFound();
                }

                await _doctorRepository.DeleteAsync(doctor);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting doctor with id {id}");
                return StatusCode(500, $"An error occurred while deleting doctor with id {id}");
            }
        }
    }
}