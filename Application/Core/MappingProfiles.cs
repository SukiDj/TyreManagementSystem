using AutoMapper;
using Domain;
//using Microsoft.AspNetCore.Http;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Tyre, Tyre>();
        CreateMap<User, User>();
        CreateMap<BusinessUnitLeader, BusinessUnitLeader>();
        CreateMap<ProductionOperator, ProductionOperator>();
        CreateMap<QualitySupervisor, QualitySupervisor>();
        CreateMap<Client, Client>();
        CreateMap<Machine, Machine>();
        CreateMap<Report, Report>();
        CreateMap<Sale, Sale>();
        CreateMap<Production, Production>();
    
    }
}