import TicketService from '@src/pairtest/TicketService';
import TicketValidator from '@src/pairtest/validators/TicketValidator';
import TicketPaymentService from '@src/thirdparty/paymentgateway/TicketPaymentService';
import SeatReservationService from '@src/thirdparty/seatbooking/SeatReservationService';
import InvalidPurchaseException from '@src/pairtest/lib/ErrorHandling/InvalidPurchaseException';
import ValidationException from '@src/pairtest/lib/ErrorHandling/ValidationException';
import { countTotalCost, calculateNumberOfSeats } from '@src/pairtest/helpers/TicketHelpers';
import Logger from "@src/pairtest/lib/Observability/Logger";

jest.mock('@src/pairtest/validators/TicketValidator');
jest.mock('@src/thirdparty/paymentgateway/TicketPaymentService');
jest.mock('@src/thirdparty/seatbooking/SeatReservationService');
jest.mock('@src/pairtest/helpers/TicketHelpers');

describe('TicketService', () => {
  let ticketService;
  let mockValidator;
  let mockPaymentService;
  let mockReservationService;

  beforeEach(() => {
    mockValidator = new TicketValidator();
    mockPaymentService = new TicketPaymentService();
    mockReservationService = new SeatReservationService();

    ticketService = new TicketService(mockValidator, mockPaymentService, mockReservationService);

    jest.spyOn(Logger, 'error').mockImplementation(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully purchase tickets when validation passes, seats are reserved, and payment is made', async () => {
    mockValidator.validateTicketPurchase = jest.fn();
    countTotalCost.mockReturnValue(100);
    calculateNumberOfSeats.mockReturnValue(5);
    mockPaymentService.makePayment = jest.fn();
    mockReservationService.reserveSeat = jest.fn();

    const result = await ticketService.purchaseTickets(123, {});

    expect(mockValidator.validateTicketPurchase).toHaveBeenCalled();
    expect(countTotalCost).toHaveBeenCalled();
    expect(calculateNumberOfSeats).toHaveBeenCalled();
    expect(mockReservationService.reserveSeat).toHaveBeenCalledWith(123, 5);
    expect(mockPaymentService.makePayment).toHaveBeenCalledWith(123, 100);
    expect(result).toBeTruthy();

    expect(Logger.error).not.toHaveBeenCalled();
  });

  it('should throw an error and not attempt payment or reservation when validation fails', async () => {
    mockValidator.validateTicketPurchase = jest.fn().mockImplementationOnce(() => {
      throw new ValidationException('Validation failed');
    });

    await expect(ticketService.purchaseTickets(123, {}))
      .rejects
      .toThrow(InvalidPurchaseException);

    expect(Logger.error).toHaveBeenCalledWith('Request validation failed:', 'Validation failed');
    expect(mockReservationService.reserveSeat).not.toHaveBeenCalled();
    expect(mockPaymentService.makePayment).not.toHaveBeenCalled();
  });

  it('should throw InvalidPurchaseException when an unexpected error occurs during seat reservation or payment', async () => {
    mockValidator.validateTicketPurchase = jest.fn();
    countTotalCost.mockReturnValue(100);
    calculateNumberOfSeats.mockReturnValue(5);

    mockReservationService.reserveSeat = jest.fn().mockImplementationOnce(() => {
      throw new Error('Seat reservation is not possible!');
    });

    await expect(ticketService.purchaseTickets(123, {})).rejects.toThrow(new InvalidPurchaseException('Seat reservation is not possible!'));
    expect(Logger.error).toHaveBeenCalledWith('An unexpected error occurred:', 'Seat reservation is not possible!');
    expect(mockPaymentService.makePayment).not.toHaveBeenCalled();
  });
});
