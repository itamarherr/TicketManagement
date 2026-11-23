
using Microsoft.EntityFrameworkCore;
using TicketManagement.Api.Data;
using TicketManagement.Api.DTOs;
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
    public async Task<Ticket> CreateTicketAsync(CreateTicketDto dto)
    {
        var ticket = new Ticket
        {

            Title = dto.Title,
            Description = dto.Description,
            Priority = dto.Priority,
            Status = TicketStatus.Open,
            CreatedAt = DateTime.UtcNow
        };
        _context.Tickets.Add (ticket);
        await _context.SaveChangesAsync ();
        return ticket;
    }
    public async Task<bool> UpdateTicketStatusAsync(int id, TicketStatus status)
    {
        var ticket = await _context.Tickets.FindAsync (id);
        if (ticket == null)
        {
            return false;
        }
        ticket.Status = status;
        await _context.SaveChangesAsync ();
        return true;
    }

    public async Task<bool> DeleteTicketAsync(int id)
    {
        var ticket = await _context.Tickets.FindAsync (id);
        if (ticket == null)
        {
            return false;
        }
        _context.Tickets.Remove (ticket);
        await _context.SaveChangesAsync ();
        return true;
    }
}



