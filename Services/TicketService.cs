
using Microsoft.EntityFrameworkCore;
using TicketManagement.Api.Data;
using TicketManagement.Api.enums;
using TicketManagement.Api.Models;

namespace TicketManagement.Api.Services;

public class TicketService
{
    private readonly AppDbContext _context;
    public TicketService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<Ticket>> GetTicketsAsync(
    TicketStatus? status = null,
    TicketPriority? priority = null)
    {
        var query = _context.Tickets.AsQueryable ();
        if (status.HasValue)
        {
            query = query.Where (t => t.Status == status.Value);
        }
        if (priority.HasValue)
        {
            query = query.Where (t => t.Priority == priority.Value);
        }
        return await query.ToListAsync ();
    }
}



