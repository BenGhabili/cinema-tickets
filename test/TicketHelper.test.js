import TicketTypeRequest from '@src/pairtest/lib/TicketTypeRequest';
import { countTotalCost, countTicketByType, calculateNumberOfSeats } from '@src/pairtest/helpers/TicketHelpers';

const sampleTicketRequests = [
  new TicketTypeRequest(TicketTypeRequest.ADULT, 2),
  new TicketTypeRequest(TicketTypeRequest.CHILD, 3),
  new TicketTypeRequest(TicketTypeRequest.INFANT, 1)
];

describe('TicketHelper', () => {

  describe('countTotalCost', () => {
      it('returns a correct total cost of tickets', () => {
        const result = countTotalCost(sampleTicketRequests);

        expect(result).toEqual(95);
      });
  });

  describe('countTicketByType', () => {
    it('returns a correct ticketType', () => {
      const result = countTicketByType(sampleTicketRequests, TicketTypeRequest.CHILD);

      expect(result).toEqual(3);
    });
  });

  describe('calculateNumberOfSeats', () => {
    it('returns a correct number of seats', () => {
      const result = calculateNumberOfSeats(sampleTicketRequests);

      expect(result).toEqual(5);
    });
  });
});
