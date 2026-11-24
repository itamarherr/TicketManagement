import type { Ticket } from "../types/Ticket";
import type { TicketStatus } from "../types/TicketStatus";
import TicketItem from "./TicketItem";

interface TicketListProps {
  tickets: Ticket[];
  isLoading: boolean;
  onStatusChange: (ticketId: number, status: TicketStatus) => Promise<void>;
  onDelete: (ticketId: number) => Promise<void>;
}

function TicketList({
  tickets,
  isLoading,
  onStatusChange,
  onDelete,
}: TicketListProps) {
  if (isLoading) {
    return <p>Loading tickets...</p>;
  }

  return (
    <ul>
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TicketList;
