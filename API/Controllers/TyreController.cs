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

    }
}