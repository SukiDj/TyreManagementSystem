using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Actions
{
    public class List
    {
        public class Query : IRequest<Result<List<Action>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Action>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<Action>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var actions = await _context.Clients.ToListAsync(cancellationToken);
                var actionsToReturn = _mapper.Map<List<Action>>(actions);

                return Result<List<Action>>.Success(actionsToReturn);
            }
        }
    }
}