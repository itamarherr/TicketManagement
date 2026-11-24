using Microsoft.AspNetCore.Mvc;
using TicketManagement.Api.DTOs;
using TicketManagement.Api.enums;
using TicketManagement.Api.Services;
namespace TicketManagement.Api.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly TicketService _ticketService;

        public TicketsController(TicketService ticketService)
        {
            _ticketService = ticketService;
        }
        [HttpGet]
        public async Task<ActionResult> GetTickets(
            [FromQuery] TicketStatus? status = null,
            [FromQuery] TicketPriority? priority = null)
        {
            var tickets = await _ticketService.GetTicketsAsync (status, priority);
            return Ok (tickets);
        }
        [HttpPost]
        public async Task<ActionResult<TicketDto>> CreateTicket([FromBody] CreateTicketDto dto)
        {
            var ticket = await _ticketService.CreateTicketAsync (dto);
            return StatusCode (201, ticket);
        }

        [HttpPatch ("{id}/status")]
        public async Task<IActionResult> UpdateTicketStatus(int id, [FromBody] UpdateTicketStatusDto dto)
        {
            var result = await _ticketService.UpdateTicketStatusAsync (id, dto.Status);
            if (!result)
            {
                return NotFound ();
            }
            return NoContent ();
        }
        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var result = await _ticketService.DeleteTicketAsync (id);
            if (!result)
            {
                return NotFound ();
            }
            return NoContent ();
        }
    }

}
