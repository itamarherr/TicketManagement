import type { Ticket } from "../types/Ticket";
import { TicketStatus } from "../types/TicketStatus";
import { TicketPriorityLabels } from "../types/TicketPriority";

interface TicketItemProps {
  ticket: Ticket;
  onStatusChange: (ticketId: number, status: TicketStatus) => Promise<void>;
  onDelete: (ticketId: number) => Promise<void>;
}

function TicketItem({ ticket, onStatusChange, onDelete }: TicketItemProps) {
  return (
    <li className="ticket-card">
      <div className="ticket-header">
        <h3>{ticket.title}</h3>

        <span className="ticket-priority">
          {TicketPriorityLabels[ticket.priority]} priority
        </span>
      </div>

      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-actions">
        <div>
          <label>Status: </label>

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
        </div>

        <button className="delete-button" onClick={() => onDelete(ticket.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TicketItem;
