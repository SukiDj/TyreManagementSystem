using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sales
{
    public class RegisterTyreSale
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid TyreId { get; set; }
            public Guid ClientId { get; set; }
            public int QuantitySold { get; set; }
            public double PricePerUnit { get; set; }
            public string UnitOfMeasure { get; set; }
            public DateTime SaleDate { get; set; }
            public string ProductionOrderId { get; set; }
            public string TargetMarket { get; set; }
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
                var sale = new Sale
                {
                    Tyre = await _context.Tyres.FindAsync(request.TyreId),
                    Client = await _context.Clients.FindAsync(request.ClientId),
                    SaleDate = request.SaleDate,
                    QuantitySold = request.QuantitySold,
                    PricePerUnit = request.PricePerUnit,
                    UnitOfMeasure = request.UnitOfMeasure,
                    TargetMarket = request.TargetMarket,
                    ProductionOrderId = request.ProductionOrderId
                };

                if (sale.Tyre == null || sale.Client == null)
                {
                    return Result<Unit>.Failure("Invalid references for Tyre or Client");
                }

                _context.Sales.Add(sale);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to register sale");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}