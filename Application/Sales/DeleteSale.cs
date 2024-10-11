using Application.Core;
using MediatR;
using Persistence;

namespace Application.Sales
{
    public class DeleteSale
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var sale = await _context.Sales.FindAsync(request.Id);

                if (sale == null) return null;

                _context.Sales.Remove(sale);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete sale");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}