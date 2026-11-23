using System.ComponentModel.DataAnnotations;
using TicketManagement.Api.enums;

namespace TicketManagement.Api.DTOs
{
    public class CreateTicketDto
    {
        [Required]
        [MaxLength (20)]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MaxLength (200)]
        public string Description { get; set; } = string.Empty;

        public TicketPriority Priority { get; set; }
    }
}
