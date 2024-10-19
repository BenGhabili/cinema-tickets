import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/ErrorHandling/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  // Calculations

  // Calculate the correct amount
  // Calculate the correct numbers of seats

  // Actions

  // Make seat booking request
  // Make payment request


  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
  }
}
