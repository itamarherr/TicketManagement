import type { Ticket } from "../types/Ticket";
import { TicketStatus, TicketStatusLabels } from "../types/TicketStatus";
import { TicketPriorityLabels } from "../types/TicketPriority";

interface TicketItemProps {
  ticket: Ticket;
  onStatusChange: (ticketId: number, status: TicketStatus) => Promise<void>;
  onDelete: (ticketId: number) => Promise<void>;
}

function TicketItem({ ticket, onStatusChange, onDelete }: TicketItemProps) {
  return (
    <li>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>{TicketPriorityLabels[ticket.priority]}</p>
      <p>{TicketStatusLabels[ticket.status]}</p>

      <select
        value={ticket.status}
        onChange={(e) =>
          onStatusChange(ticket.id, Number(e.target.value) as TicketStatus)
        }
      >
        <option value={TicketStatus.Open}>Open</option>
        <option value={TicketStatus.InProgress}>In Progress</option>
        <option value={TicketStatus.Closed}>Closed</option>
      </select>

      <button onClick={() => onDelete(ticket.id)}>Delete</button>
    </li>
  );
}

export default TicketItem;
