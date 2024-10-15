using Application.Productions;
using Application.Sales;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    public class BusinessUnitController : BaseApiController
    {
        [HttpGet("productionByDay")]
        public async Task<IActionResult> GetProductionByDay(DateTime date)
        {
            return HandleResult(await Mediator.Send(new GetProductionByDay.Query { Date = date }));
        }

        [HttpGet("productionByShift")]
        public async Task<IActionResult> GetProductionByShift(int shift)
        {
            return HandleResult(await Mediator.Send(new GetProductionByShift.Query { Shift = shift }));
        }

        [HttpGet("productionByMachine")]
        public async Task<IActionResult> GetProductionByMachine(Guid machineId)
        {
            return HandleResult(await Mediator.Send(new GetProductionByMachine.Query { MachineId = machineId }));
        }

        [HttpGet("productionByOperator")]
        public async Task<IActionResult> GetProductionByOperator(Guid operatorId)
        {
            return HandleResult(await Mediator.Send(new GetProductionByOperator.Query { OperatorId = operatorId }));
        }

        [HttpGet("stockBalance")]
        public async Task<IActionResult> GetStockBalance(DateTime date)
        {
            return HandleResult(await Mediator.Send(new GetStockBalance.Query { Date = date }));
        }
    }
}