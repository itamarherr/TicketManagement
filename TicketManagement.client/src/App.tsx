import { useEffect, useState } from "react";
import "./App.css";
import type { Ticket } from "./types/Ticket";
function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    // Fetch tickets from the backend API
    fetch("https://localhost:7077/api/tickets")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tickets received:", data);
        setTickets(data);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://localhost:7077/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const createdTicket: Ticket = await response.json();

      setTickets((prev) => [...prev, createdTicket]);
      setTitle("");
      setDescription("");
      setPriority(0);
    } catch (error) {
      console.error("Error creating ticket:", error);
      setErrorMessage("Failed to create ticket. Please try again.");
    }
  };
  const handleStatusChange = async (ticketId: number, newStatus: number) => {
    setErrorMessage("");
    try {
      const response = await fetch(
        `https://localhost:7077/api/tickets/${ticketId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update ticket status");
      }
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      );

      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMessage("Failed to update ticket status. Please try again.");
    }
  };
  const handleDelete = async (ticketId: number) => {
    setErrorMessage("");
    try {
      const response = await fetch(
        `https://localhost:7077/api/tickets/${ticketId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete ticket");
      }

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId),
      );
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setErrorMessage("Failed to delete ticket. Please try again.");
    }
  };
  return (
    <div>
      <h1>Ticket Management</h1>
      <form onSubmit={handleSubmit}>
        <h2>Create Ticket</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value={0}>Low</option>
          <option value={1}>Medium</option>
          <option value={2}>High</option>
        </select>
        <button type="submit">Create</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="0">Open</option>
        <option value="1">In Progress</option>
        <option value="2">Closed</option>
      </select>
      <input
        type="text"
        placeholder="Search tickets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {tickets
          .filter(
            (ticket) =>
              (statusFilter === "all" ||
                ticket.status === Number(statusFilter)) &&
              ticket.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((ticket) => (
            <li key={ticket.id}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p>{ticket.priority}</p>
              <p>{ticket.status}</p>
              <select
                value={ticket.status}
                onChange={(e) =>
                  handleStatusChange(ticket.id, Number(e.target.value))
                }
              >
                <option value={0}>Open</option>
                <option value={1}>In Progress</option>
                <option value={2}>Closed</option>
              </select>
              <button onClick={() => handleDelete(ticket.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
