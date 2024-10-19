import TicketTypeRequest from '@src/pairtest/lib/TicketTypeRequest';
import { TICKET_PRICE } from '@src/pairtest/constants';

export const countTicketByType = (ticketTypeRequests, type) => ticketTypeRequests.reduce(
  (count, request) => count + (request.getTicketType() === type ? request.getNoOfTickets() : 0),
  0
);

const getTicketPrice = (type) => {
  let ticketPrice = 0;
  switch (type) {
    case type = TicketTypeRequest.CHILD:
      ticketPrice = TICKET_PRICE.CHILD;
      break;
    case type = TicketTypeRequest.INFANT:
      ticketPrice = TICKET_PRICE.INFANT;
      break;
    default:
      ticketPrice = TICKET_PRICE.ADULT;
  }
  return ticketPrice;
};

export const countTotalCost = (ticketTypeRequests) => ticketTypeRequests.reduce((sum, request) =>
    sum + getTicketPrice(request.getTicketType()) * request.getNoOfTickets() , 0);


export const calculateNumberOfSeats = (ticketTypeRequests) => ticketTypeRequests.reduce((sum, request) => {
  const type = request.getTicketType();

  if (type === TicketTypeRequest.ADULT || type === TicketTypeRequest.CHILD ) {
    return sum + request.getNoOfTickets();
  }

  return sum;
}, 0);
