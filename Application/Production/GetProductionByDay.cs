using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Production
{
    public class GetProductionByDay
    {
        public class Query : IRequest<Result<List<ProductionDto>>>
        {
            public DateTime Date { get; set; }
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
                    .Where(p => p.Tyre.ProductionDate == request.Date)
                    .Select(p => new ProductionDto
                    {
                        TyreCode = p.Tyre.Code.ToString(),
                        Shift = p.Shift,
                        QuantityProduced = p.QuantityProduced,
                        MachineNumber = p.Machine.Id.ToString(),
                        ProductionDate = p.Tyre.ProductionDate
                    })
                    .ToListAsync(cancellationToken);

                return Result<List<ProductionDto>>.Success(productions);
            }
        }
    }
}