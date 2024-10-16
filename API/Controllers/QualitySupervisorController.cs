using Application.Productions;
using Application.Sales;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class QualitySupervisorController : BaseApiController
    {
        [HttpPost("registerTyreSale")]
        public async Task<IActionResult> RegisterTyreSale([FromForm]RegisterTyreSaleDto sale)
        {
            return HandleResult(await Mediator.Send(new RegisterTyreSale.Command{ Sale = sale}));
        }

        [HttpGet("submissionHistory")]
        public async Task<IActionResult> GetSubmissionHistory()
        {
            var productionHistory = await Mediator.Send(new ListAllProductionHistory.Query());
            var salesHistory = await Mediator.Send(new ListSalesHistory.Query());

            return Ok(new 
            {
                ProductionHistory = productionHistory.Value,
                SalesHistory = salesHistory.Value
            });
        }

        [HttpPut("updateProduction/{id}")]
        public async Task<IActionResult> UpdateProduction(Guid id, int shift, int quantityProduced, Guid tyreId)
        {
            var command = new UpdateProduction.Command
            {
                Id = id,
                Shift = shift,
                QuantityProduced = quantityProduced,
                TyreId = tyreId
            };
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("updateSale/{id}")]
        public async Task<IActionResult> UpdateSale(Guid id, Guid tyreId, Guid clientId, int quantitySold, double pricePerUnit, DateTime saleDate)
        {
            var command = new UpdateSale.Command
            {
                Id = id,
                TyreId = tyreId,
                ClientId = clientId,
                QuantitySold = quantitySold,
                PricePerUnit = pricePerUnit,
                SaleDate = saleDate
            };
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