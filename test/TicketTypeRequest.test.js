import TicketTypeRequest from '@src/pairtest/lib/TicketTypeRequest';


describe('TicketTypeRequest', () => {
  it('should instantiate correctly with valid type and number of tickets', () => {
    const request = new TicketTypeRequest('ADULT', 3);

    expect(request.getTicketType()).toBe('ADULT');
    expect(request.getNoOfTickets()).toBe(3);
  });

  it('should throw TypeError if type is invalid', () => {
    expect(() => {
      new TicketTypeRequest('INVALID', 3);
    }).toThrow(TypeError);

    expect(() => {
      new TicketTypeRequest('INVALID', 3);
    }).toThrow('type must be ADULT, CHILD, or INFANT');
  });

  it('should throw TypeError if noOfTickets is not an integer', () => {
    expect(() => {
      new TicketTypeRequest(TicketTypeRequest.ADULT, 'three');
    }).toThrow(TypeError);
  });

  it('should return correct number of tickets with getNoOfTickets', () => {
    const request = new TicketTypeRequest(TicketTypeRequest.CHILD, 2);

    expect(request.getNoOfTickets()).toBe(2);
  });

  it('should return correct ticket type with getTicketType', () => {
    const request = new TicketTypeRequest(TicketTypeRequest.INFANT, 1);

    expect(request.getTicketType()).toBe(TicketTypeRequest.INFANT);
  });
});
