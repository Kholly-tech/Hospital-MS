using AutoMapper;
using HospitalAppointmentSystem.Core;
// using HospitalAppointmentSystem.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HospitalAppointmentSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PatientsController> _logger;

        public PatientsController(
            IPatientRepository patientRepository,
            IMapper mapper,
            ILogger<PatientsController> logger)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetAllPatients()
        {
            try
            {
                var patients = await _patientRepository.GetAllWithDetailsAsync();
                return Ok(_mapper.Map<List<PatientDto>>(patients));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving patients");
                return StatusCode(500, "An error occurred while retrieving patients");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDto>> GetPatientById(int id)
        {
            try
            {
                var patient = await _patientRepository.GetByIdWithDetailsAsync(id);
                if (patient == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<PatientDto>(patient));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving patient with id {id}");
                return StatusCode(500, $"An error occurred while retrieving patient with id {id}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<PatientDto>> CreatePatient([FromBody] CreatePatientDto patientDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var patient = _mapper.Map<Patient>(patientDto);
                await _patientRepository.AddAsync(patient);
                
                var createdPatient = await _patientRepository.GetByIdWithDetailsAsync(patient.Id);
                return CreatedAtAction(
                    nameof(GetPatientById), 
                    new { id = patient.Id }, 
                    _mapper.Map<PatientDto>(createdPatient));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating patient");
                return StatusCode(500, "An error occurred while creating patient");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] UpdatePatientDto patientDto)
        {
            try
            {
                if (id != patientDto.Id)
                {
                    return BadRequest("ID mismatch");
                }

                var existingPatient = await _patientRepository.GetByIdAsync(id);
                if (existingPatient == null)
                {
                    return NotFound();
                }

                _mapper.Map(patientDto, existingPatient);
                await _patientRepository.UpdateAsync(existingPatient);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating patient with id {id}");
                return StatusCode(500, $"An error occurred while updating patient with id {id}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            try
            {
                var patient = await _patientRepository.GetByIdAsync(id);
                if (patient == null)
                {
                    return NotFound();
                }

                await _patientRepository.DeleteAsync(patient);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting patient with id {id}");
                return StatusCode(500, $"An error occurred while deleting patient with id {id}");
            }
        }
    }
}