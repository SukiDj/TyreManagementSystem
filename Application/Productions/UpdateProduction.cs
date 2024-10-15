using Application.Core;
using MediatR;
using Persistence;

namespace Application.Productions
{
    public class UpdateProduction
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public int Shift { get; set; }
            public int QuantityProduced { get; set; }
            public Guid TyreId { get; set; }
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
                var production = await _context.Productions.FindAsync(request.Id);

                if (production == null) return null;

                production.Shift = request.Shift;
                production.QuantityProduced = request.QuantityProduced;
                //production.ProdOrderID = request.ProdOrderID;
                production.Tyre = await _context.Tyres.FindAsync(request.TyreId);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update production");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}