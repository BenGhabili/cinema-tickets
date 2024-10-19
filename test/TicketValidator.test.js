import TicketValidator from '@src/pairtest/validators/TicketValidator';
import TicketTypeRequest from '@src/pairtest/lib/TicketTypeRequest';
import ValidationException from '@src/pairtest/lib/ErrorHandling/ValidationException';

const validTicketRequests = [
  new TicketTypeRequest(TicketTypeRequest.ADULT, 2),
  new TicketTypeRequest(TicketTypeRequest.CHILD, 3),
  new TicketTypeRequest(TicketTypeRequest.INFANT, 1)
];

describe('TicketValidator', () => {
  let ticketValidator;

  beforeEach(() => {
    ticketValidator = new TicketValidator();
  });
  describe('checkMaxTickets', () => {
    it('should return true if ticket is less than max tickets', () => {
        const checkMaxTicketsValid = ticketValidator.checkMaxTickets(validTicketRequests);

        expect(checkMaxTicketsValid).toBeTruthy();
    });

    it('should return true if ticket is equal to max tickets', () => {
      const anotherValidTicketRequests = [
        new TicketTypeRequest(TicketTypeRequest.ADULT, 21),
        ...validTicketRequests.slice(1)
      ];
      const checkMaxTicketsValid = ticketValidator.checkMaxTickets(anotherValidTicketRequests);

      expect(checkMaxTicketsValid).toBeTruthy();
    });

    it('should return false if total numbers of tickets is more than max allowed number', () => {
      const invalidTicketRequests = [
        new TicketTypeRequest(TicketTypeRequest.ADULT, 26),
        ...validTicketRequests.slice(1)
      ];

      expect(ticketValidator.checkMaxTickets(invalidTicketRequests)).toBeFalsy();
    });

    it('should throw error if invalid object is passed in the ticketTypeRequests array', () => {
      const invalidRequest = { type: TicketTypeRequest.ADULT, noOfTickets: 2 };

      expect(() => {
        ticketValidator.checkMaxTickets([invalidRequest, ...validTicketRequests]);
      }).toThrow(TypeError);
    });

  });

  describe('checkInfantAndChildRules', () => {
    it('should return true if the rules apply', () => {
      const result = ticketValidator.checkInfantAndChildRules(validTicketRequests);

      expect(result).toBeTruthy();
    });

    it('should return false if numbers of infants greater than adults', () => {
      const invalidRequests = [
        ...validTicketRequests.slice(0, 2),
        new TicketTypeRequest(TicketTypeRequest.INFANT, 3)
      ];

      const result = ticketValidator.checkInfantAndChildRules(invalidRequests);

      expect(result).toBeFalsy();
    });

    it('should return false if we have child or infant in the request without accompanying adult', () => {
      const invalidRequests = [...validTicketRequests.slice(1)];

      const result = ticketValidator.checkInfantAndChildRules(invalidRequests);

      expect(result).toBeFalsy();
    });
  });

  describe('isValidAccount', () => {
    it('should return true if account is a valid account', () => {
      const result = ticketValidator.isValidAccount(123);

      expect(result).toBeTruthy();
    });

    it('should return false if account is not a valid account', () => {
      const result = ticketValidator.isValidAccount(-123);

      expect(result).toBeFalsy();
    });
  });

  describe('validateTicketPurchase', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns true if all of the conditions are met', () => {
      jest.spyOn(ticketValidator, 'checkMaxTickets').mockReturnValue(true);
      jest.spyOn(ticketValidator, 'checkInfantAndChildRules').mockReturnValue(true);
      jest.spyOn(ticketValidator, 'isValidAccount').mockReturnValue(true);

      const result = ticketValidator.validateTicketPurchase([], 123);

      expect(result).toBeTruthy();
    });

    it('throws an exception if any of the conditions fails', () => {
      jest.spyOn(ticketValidator, 'checkMaxTickets').mockReturnValue(false);
      jest.spyOn(ticketValidator, 'checkInfantAndChildRules').mockReturnValue(true);
      jest.spyOn(ticketValidator, 'isValidAccount').mockReturnValue(true);

      expect(() => {
        ticketValidator.validateTicketPurchase([], 123);
      }).toThrow(ValidationException);
    });
  });
});
