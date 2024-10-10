using Application.Tyres;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TyreController : BaseApiController
    {
        [HttpGet("GetTyres")]
        public async Task<IActionResult> GetTyres()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTyre(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        // [HttpPost]
        // public async Task<IActionResult> CreateActivity(Activity activity)
        // {
        //     await Mediator.Send(new Create.Command {Activity = activity});

        //     return Ok();
        // }

        // [HttpPut("{Id}")]
        // public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        // {
        //     activity.Id = id;
        //     await Mediator.Send(new Edit.Command {Activity = activity});

        //     return Ok();
        // }

        // [HttpDelete("{Id}")]
        // public async Task<IActionResult> DeleteActivity(Guid id)
        // {
        //     await Mediator.Send(new Delete.Command {Id = id});
            
        //     return Ok();
        // }
    }
}