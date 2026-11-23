using System.ComponentModel.DataAnnotations;
using TicketManagement.Api.enums;

namespace TicketManagement.Api.DTOs
{
    public class UpdateTicketStatusDto
    {
        [EnumDataType (typeof (TicketStatus))]
        public TicketStatus Status { get; set; }
    }
}
