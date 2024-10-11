using Application.Core;
using MediatR;
using Persistence;

namespace Application.Production
{
    public class DeleteProduction
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
                var production = await _context.Productions.FindAsync(request.Id);

                if (production == null) return null;

                _context.Productions.Remove(production);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete production");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}