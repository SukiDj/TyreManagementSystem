using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sales
{
    public class GetStockBalance
    {
        public class Query : IRequest<Result<List<StockBalanceDto>>>
        {
            public DateTime Date { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<StockBalanceDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<StockBalanceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var stockBalances = await _context.Tyres
                    .Select(t => new StockBalanceDto
                    {
                        TyreCode = t.Code.ToString(),
                        StockBalance = t.Productions.Sum(p => p.QuantityProduced) - t.Sales.Sum(s => s.QuantitySold)
                    })
                    .ToListAsync(cancellationToken);

                return Result<List<StockBalanceDto>>.Success(stockBalances);
            }
        }
    }
}