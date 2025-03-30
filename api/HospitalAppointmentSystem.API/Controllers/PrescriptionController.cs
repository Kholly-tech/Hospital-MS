using AutoMapper;
using HospitalAppointmentSystem.Core;
using HospitalAppointmentSystem.Core.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PrescriptionsController : ControllerBase
{
    private readonly IPrescriptionRepository _prescriptionRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<PrescriptionsController> _logger;

    public PrescriptionsController(
        IPrescriptionRepository prescriptionRepository,
        IMapper mapper,
        ILogger<PrescriptionsController> logger)
    {
        _prescriptionRepository = prescriptionRepository;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PrescriptionDto>>> GetAll(
        [FromQuery] string search = "",
        [FromQuery] int? doctorId = null,
        [FromQuery] int? patientId = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        try
        {
            var query = _prescriptionRepository.GetQueryable();

            // Apply search filter
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => 
                    p.Medication.Contains(search) ||
                    p.Instructions.Contains(search));
            }

            // Apply doctor filter
            if (doctorId.HasValue)
            {
                query = query.Where(p => p.DoctorId == doctorId.Value);
            }

            // Apply patient filter
            if (patientId.HasValue)
            {
                query = query.Where(p => p.PatientId == patientId.Value);
            }

            // Apply date range filter
            if (startDate.HasValue)
            {
                query = query.Where(p => p.PrescribedDate >= startDate.Value);
            }
            if (endDate.HasValue)
            {
                query = query.Where(p => p.PrescribedDate <= endDate.Value);
            }

            var prescriptions = await query.ToListAsync();
            return Ok(_mapper.Map<List<PrescriptionDto>>(prescriptions));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving prescriptions");
            return StatusCode(500, "An error occurred while retrieving prescriptions");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PrescriptionDto>> GetById(int id)
    {
        try
        {
            var prescription = await _prescriptionRepository.GetByIdWithDetailsAsync(id);
            if (prescription == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<PrescriptionDto>(prescription));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving prescription with id {id}");
            return StatusCode(500, $"An error occurred while retrieving prescription with id {id}");
        }
    }

    [HttpGet("doctor/{doctorId}")]
    public async Task<ActionResult<IEnumerable<PrescriptionDto>>> GetByDoctor(int doctorId)
    {
        try
        {
            var prescriptions = await _prescriptionRepository.GetByDoctorAsync(doctorId);
            return Ok(_mapper.Map<List<PrescriptionDto>>(prescriptions));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving prescriptions for doctor {doctorId}");
            return StatusCode(500, $"An error occurred while retrieving prescriptions for doctor {doctorId}");
        }
    }

    [HttpGet("patient/{patientId}")]
    public async Task<ActionResult<IEnumerable<PrescriptionDto>>> GetByPatient(int patientId)
    {
        try
        {
            var prescriptions = await _prescriptionRepository.GetByPatientAsync(patientId);
            return Ok(_mapper.Map<List<PrescriptionDto>>(prescriptions));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving prescriptions for patient {patientId}");
            return StatusCode(500, $"An error occurred while retrieving prescriptions for patient {patientId}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<PrescriptionDto>> Create([FromBody] CreatePrescriptionDto dto)
    {
        try
        {
            var prescription = _mapper.Map<Prescription>(dto);
            await _prescriptionRepository.AddAsync(prescription);
            
            var created = await _prescriptionRepository.GetByIdWithDetailsAsync(prescription.Id);
            return CreatedAtAction(
                nameof(GetById), 
                new { id = prescription.Id }, 
                _mapper.Map<PrescriptionDto>(created));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating prescription");
            return StatusCode(500, "An error occurred while creating prescription");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdatePrescriptionDto dto)
    {
        try
        {
            var existing = await _prescriptionRepository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            _mapper.Map(dto, existing);
            await _prescriptionRepository.UpdateAsync(existing);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating prescription {id}");
            return StatusCode(500, $"An error occurred while updating prescription {id}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var prescription = await _prescriptionRepository.GetByIdAsync(id);
            if (prescription == null) return NotFound();

            await _prescriptionRepository.DeleteAsync(prescription);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deleting prescription {id}");
            return StatusCode(500, $"An error occurred while deleting prescription {id}");
        }
    }
}