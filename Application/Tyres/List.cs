using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tyres
{
    public class List
    {
        public class Query : IRequest<Result<List<Tyre>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Tyre>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Tyre>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Tyre>>.Success(await _context.Tyres.ToListAsync(cancellationToken));
            }
        }
    }
}