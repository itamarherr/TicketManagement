import type { Ticket } from "../types/Ticket";
import type { TicketPriority } from "../types/TicketPriority";
import type { TicketStatus } from "../types/TicketStatus";

const API_URL = "https://localhost:7077/api/tickets";

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

export async function createTicket(
  title: string,
  description: string,
  priority: TicketPriority,
): Promise<Ticket> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, priority }),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  return response.json();
}

export async function updateTicketStatus(
  ticketId: number,
  status: TicketStatus,
): Promise<void> {
  const response = await fetch(`${API_URL}/${ticketId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update ticket status");
  }
}

export async function deleteTicket(ticketId: number): Promise<void> {
  const response = await fetch(`${API_URL}/${ticketId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete ticket");
  }
}