import TicketTypeRequest from '../lib/TicketTypeRequest';
import ValidationException from '../lib/ErrorHandling/ValidationException';

import { countTicketByType } from '../helpers/TicketHelpers.js';
import { MAX_TICKET_NUMBER } from '@src/pairtest/constants';

export default class TicketValidator {

    validateTicketPurchase(ticketTypeRequests, accountId) {
        const infantAndChildRules = this.checkInfantAndChildRules(ticketTypeRequests);
        const maxTicketRules = this.checkMaxTickets(ticketTypeRequests);
        const accountValid = this.isValidAccount(accountId);

        if (!infantAndChildRules || !maxTicketRules || !accountValid) {
          throw new ValidationException('Validation failed!');
        }

        return true;
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
      const adultCount = countTicketByType(ticketTypeRequests, TicketTypeRequest.ADULT);
      const infantCount = countTicketByType(ticketTypeRequests, TicketTypeRequest.INFANT);

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
