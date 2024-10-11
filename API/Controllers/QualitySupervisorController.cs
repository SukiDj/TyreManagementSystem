using Application.Production;
using Application.Sales;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class QualitySupervisorController : BaseApiController
    {
        private readonly DataContext _context;

        public QualitySupervisorController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("registerSale")]
        public async Task<IActionResult> RegisterSale(RegisterTyreSale.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("submissionHistory")]
        public async Task<IActionResult> GetSubmissionHistory()
        {
            var productionHistory = await Mediator.Send(new ListProductionHistory.Query());
            var salesHistory = await Mediator.Send(new ListSalesHistory.Query());

            return Ok(new 
            {
                ProductionHistory = productionHistory.Value,
                SalesHistory = salesHistory.Value
            });
        }

        [HttpPut("updateProduction/{id}")]
        public async Task<IActionResult> UpdateProduction(Guid id, UpdateProduction.Command command)
        {
            command.Id = id;
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("updateSale/{id}")]
        public async Task<IActionResult> UpdateSale(Guid id, UpdateSale.Command command)
        {
            command.Id = id;
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("deleteProduction/{id}")]
        public async Task<IActionResult> DeleteProduction(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteProduction.Command { Id = id }));
        }

        [HttpDelete("deleteSale/{id}")]
        public async Task<IActionResult> DeleteSale(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteSale.Command { Id = id }));
        }
    }
}