import { useEffect, useState } from "react";
import "./App.css";
import type { Ticket } from "./types/Ticket";
function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
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
    </div>
  );
}

export default App;
