import type { TicketPriority } from './TicketPriority';
import type { TicketStatus } from './TicketStatus';
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: TicketPriority;
    status:  TicketStatus;
    createdAt: string;
}