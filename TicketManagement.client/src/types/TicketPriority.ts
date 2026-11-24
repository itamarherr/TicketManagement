export const TicketPriority = {
  Low: 0,
  Medium: 1,
  High: 2,
} as const;
export type TicketPriority = typeof TicketPriority[keyof typeof TicketPriority];
export const TicketPriorityLabels: Record<TicketPriority, string> = {
  [TicketPriority.Low]: "Low",
  [TicketPriority.Medium]: "Medium",
  [TicketPriority.High]: "High"
}