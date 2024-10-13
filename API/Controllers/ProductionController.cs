using Application.Productions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class ProductionController : BaseApiController
    {
        private readonly DataContext _context;

        public ProductionController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("registerProduction")]
        public async Task<IActionResult> RegisterProduction(RegisterProduction.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("history/{operatorId}")]
        public async Task<IActionResult> GetProductionHistory(Guid operatorId)
        {
            return HandleResult(await Mediator.Send(new ListProductionHistory.Query { OperatorId = operatorId }));
        }
    }
}