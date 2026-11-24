export const TicketStatus = {
  Open: 0,
  InProgress: 1,
  Closed: 2,
} as const;

export type TicketStatus = typeof TicketStatus[keyof typeof TicketStatus];

export const TicketStatusLabels: Record<TicketStatus, string> = {
  [TicketStatus.Open]: "Open",
  [TicketStatus.InProgress]: "In Progress",
  [TicketStatus.Closed]: "Closed"
};
