using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Productions
{
    public class GetProductionByShift
    {
        public class Query : IRequest<Result<List<ProductionDto>>>
        {
            public int Shift { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProductionDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<ProductionDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var productions = await _context.Productions
                    .Where(p => p.Shift == request.Shift)
                    .Select(p => new ProductionDto
                    {
                        TyreCode = p.Tyre.Code.ToString(),
                        Shift = p.Shift,
                        QuantityProduced = p.QuantityProduced,
                        MachineNumber = p.Machine.Id.ToString(),
                        ProductionDate = p.ProductionDate
                    })
                    .ToListAsync(cancellationToken);

                return Result<List<ProductionDto>>.Success(productions);
            }
        }

    }
}