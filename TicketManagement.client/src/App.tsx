import { useState } from 'react'
import './App.css'
import type { Ticket } from './types/Ticket';
function App() {
const [tickets, setTickets] = useState<Ticket[]>([]);

 return (
  <div>
    <h1>Ticket Management</h1>
  </div>
);
}

export default App
