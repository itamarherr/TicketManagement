import { useEffect, useState } from "react";
import "./App.css";
import type { Ticket } from "./types/Ticket";
import type { TicketStatus } from "./types/TicketStatus";
import type { TicketPriority } from "./types/TicketPriority";
import TicketForm from "./components/TicketForm";
import TicketFilters from "./components/TicketFilters";
import TicketList from "./components/TicketList";
import {
  getTickets,
  createTicket,
  updateTicketStatus,
  deleteTicket,
} from "./services/ticketService";
function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getTickets()
      .then((data) => {
        setTickets(data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        setErrorMessage("Failed to fetch tickets. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const handleSubmit = async (
    title: string,
    description: string,
    priority: TicketPriority,
  ): Promise<boolean> => {
    setErrorMessage("");

    try {
      const createdTicket = await createTicket(title, description, priority);

      setTickets((prev) => [...prev, createdTicket]);

      return true;
    } catch (error) {
      console.error("Error creating ticket:", error);
      setErrorMessage("Failed to create ticket. Please try again.");

      return false;
    }
  };
  const handleStatusChange = async (
    ticketId: number,
    newStatus: TicketStatus,
  ) => {
    setErrorMessage("");

    try {
      await updateTicketStatus(ticketId, newStatus);

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMessage("Failed to update ticket status. Please try again.");
    }
  };
  const handleDelete = async (ticketId: number) => {
    setErrorMessage("");

    try {
      await deleteTicket(ticketId);

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId),
      );
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setErrorMessage("Failed to delete ticket. Please try again.");
    }
  };
  const filteredTickets = tickets.filter(
    (ticket) =>
      (statusFilter === "all" || ticket.status === statusFilter) &&
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="app-container">
      <h1>Ticket Management</h1>

      <TicketForm onCreate={handleSubmit} />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <TicketFilters
        statusFilter={statusFilter}
        searchTerm={searchTerm}
        onStatusChange={setStatusFilter}
        onSearchChange={setSearchTerm}
      />

      <TicketList
        tickets={filteredTickets}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
