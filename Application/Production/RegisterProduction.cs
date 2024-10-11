    using Application.Core;
    using Domain;
    using MediatR;
    using Persistence;

    namespace Application.Production
    {
        public class RegisterProduction
        {
            public class Command : IRequest<Result<Unit>>
            {
                public Guid TyreId { get; set; }
                public Guid OperatorId { get; set; }
                public Guid SupervisorId { get; set; }
                public Guid MachineId { get; set; }
                public int Shift { get; set; }
                public int QuantityProduced { get; set; }
                public int ProdOrderID { get; set; }
            }

            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }

                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var production = new Domain.Production
                    {
                        Tyre = await _context.Tyres.FindAsync(request.TyreId),
                        Operator = await _context.ProductionOperators.FindAsync(request.OperatorId),
                        Supervisor = await _context.QualitySupervisors.FindAsync(request.SupervisorId),
                        Machine = await _context.Machines.FindAsync(request.MachineId),
                        Shift = request.Shift,
                        QuantityProduced = request.QuantityProduced,
                        ProdOrderID = request.ProdOrderID
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