export const countTicketType = (ticketTypeRequests, type) => ticketTypeRequests.reduce(
  (count, request) => count + (request.getTicketType() === type ? request.getNoOfTickets() : 0),
  0
);
