using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Productions
{
    public class ListProductionHistory
    {
        public class Query : IRequest<Result<List<ProductionDto>>>
        {
            public Guid OperatorId { get; set; }
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
                var history = await _context.Productions
                    .Where(p => p.Operator.Id == request.OperatorId)
                    .Select(p => new ProductionDto
                    {
                        TyreCode = p.Tyre.Code.ToString(),
                        QuantityProduced = p.QuantityProduced,
                        ProductionDate = p.Tyre.ProductionDate,
                        Shift = p.Shift,
                        MachineNumber = p.Machine.Id.ToString()
                    })
                    .ToListAsync();

                return Result<List<ProductionDto>>.Success(history);
            }
        }
    }
}