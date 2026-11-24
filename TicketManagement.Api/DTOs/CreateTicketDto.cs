using System.ComponentModel.DataAnnotations;
using TicketManagement.Api.enums;

namespace TicketManagement.Api.DTOs
{
    public class CreateTicketDto
    {
        [Required]
        [MaxLength (30)]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MaxLength (200)]
        public string Description { get; set; } = string.Empty;
        [EnumDataType (typeof (TicketPriority))]
        public TicketPriority Priority { get; set; }
    }
}
