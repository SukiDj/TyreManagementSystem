using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Productions
{
    public class RegisterProduction
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid TyreId { get; set; }
            //public Guid OperatorId { get; set; }
            public Guid SupervisorId { get; set; }
            public Guid MachineId { get; set; }
            public int Shift { get; set; }
            public int QuantityProduced { get; set; }
            //public int ProdOrderID { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var productionOperator = _context.ProductionOperators.FirstOrDefault(x => 
                    x.UserName == _userAccessor.GetUsername());

                if(productionOperator ==null) return Result<Unit>.Failure("Nije pronadjen vodic!");

                var production = new Production
                {
                    Tyre = await _context.Tyres.FindAsync(request.TyreId),
                    Operator = productionOperator,
                    Supervisor = await _context.QualitySupervisors.FindAsync(request.SupervisorId),
                    Machine = await _context.Machines.FindAsync(request.MachineId),
                    Shift = request.Shift,
                    QuantityProduced = request.QuantityProduced
                    //ProdOrderID = request.ProdOrderID
                };

                if (production.Tyre == null || production.Operator == null || production.Supervisor == null || production.Machine == null)
                {
                    return Result<Unit>.Failure("Invalid references for Tyre, Operator, Supervisor, or Machine");
                }

                _context.Productions.Add(production);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to register production");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}