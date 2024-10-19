import TicketTypeRequest from '../lib/TicketTypeRequest';
import ValidationException from '../lib/ErrorHandling/ValidationException';

import { countTicketType } from '../helpers/TicketHelpers.js';

const MAX_TICKET_NUMBER = 25;

export default class TicketValidator {

    validateTicketPurchase(ticketTypeRequests) {
        this.checkInfantAndChildRules(ticketTypeRequests);
        this.checkMaxTickets(ticketTypeRequests);
    }

    checkMaxTickets(ticketTypeRequests) {
        const total = ticketTypeRequests.reduce((sum, request) => {
            if (!(request instanceof TicketTypeRequest)) {
                throw new TypeError('Invalid ticket request object');
            }

            return sum + request.getNoOfTickets();
        }, 0);

        return total <= MAX_TICKET_NUMBER;
    }

    checkInfantAndChildRules(ticketTypeRequests) {
      const adultCount = countTicketType(ticketTypeRequests, TicketTypeRequest.ADULT);
      const infantCount = countTicketType(ticketTypeRequests, TicketTypeRequest.INFANT);

      const hasChildOrInfant = ticketTypeRequests.some(
        (request) => request.getTicketType() === TicketTypeRequest.CHILD || request.getTicketType() === TicketTypeRequest.INFANT
      );

      if (infantCount > adultCount || (hasChildOrInfant && adultCount === 0)) {
        return false;
      }

      return true;
    }

    isValidAccount(accountId) {
      return accountId > 0;
    }
}
