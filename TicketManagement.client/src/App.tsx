import { useEffect, useState } from "react";
import "./App.css";
import type { Ticket } from "./types/Ticket";
function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
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

  return (
    <div>
      <h1>Ticket Management</h1>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="0">Open</option>
        <option value="1">In Progress</option>
        <option value="2">Closed</option>
      </select>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>{ticket.priority}</p>
            <p>{ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
