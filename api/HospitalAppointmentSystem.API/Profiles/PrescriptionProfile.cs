using AutoMapper;
using HospitalAppointmentSystem.Core;
using HospitalAppointmentSystem.Core.DTOs;

namespace HospitalAppointmentSystem.Core.Profiles
{
    public class PrescriptionProfile : Profile
    {
        public PrescriptionProfile()
        {
            CreateMap<Prescription, PrescriptionDto>()
                .ForMember(dest => dest.Doctor, opt => opt.MapFrom(src => src.Doctor))
                .ForMember(dest => dest.Patient, opt => opt.MapFrom(src => src.Patient));

            CreateMap<CreatePrescriptionDto, Prescription>()
                .ForMember(dest => dest.PrescribedDate, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<UpdatePrescriptionDto, Prescription>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}