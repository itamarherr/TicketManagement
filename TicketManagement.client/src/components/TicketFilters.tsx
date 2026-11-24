import { TicketStatus } from "../types/TicketStatus";

interface TicketFiltersProps {
  statusFilter: TicketStatus | "all";
  searchTerm: string;
  onStatusChange: (status: TicketStatus | "all") => void;
  onSearchChange: (searchTerm: string) => void;
}

function TicketFilters({
  statusFilter,
  searchTerm,
  onStatusChange,
  onSearchChange,
}: TicketFiltersProps) {
  return (
    <div>
      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(
            e.target.value === "all"
              ? "all"
              : (Number(e.target.value) as TicketStatus),
          )
        }
      >
        <option value="all">All</option>
        <option value={TicketStatus.Open}>Open</option>
        <option value={TicketStatus.InProgress}>In Progress</option>
        <option value={TicketStatus.Closed}>Closed</option>
      </select>

      <input
        type="text"
        placeholder="Search tickets..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default TicketFilters;