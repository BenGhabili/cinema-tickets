import Logger from '@src/pairtest/lib/Observability/Logger';
import TicketValidator from '@src/pairtest/validators/TicketValidator';
import TicketPaymentService from '@src/thirdparty/paymentgateway/TicketPaymentService';
import SeatReservationService from '@src/thirdparty/seatbooking/SeatReservationService';
import InvalidPurchaseException from '@src/pairtest/lib/ErrorHandling/InvalidPurchaseException';
import ValidationException from "@src/pairtest/lib/ErrorHandling/ValidationException";

import { countTotalCost, calculateNumberOfSeats } from './helpers/TicketHelpers';

export default class TicketService {
  constructor(
    ticketValidator = new TicketValidator(),
    ticketPaymentService = new TicketPaymentService(),
    seatReservationService = new SeatReservationService()
  ) {
    this.ticketValidator = ticketValidator;
    this.ticketPaymentService = ticketPaymentService;
    this.seatReservationService = seatReservationService;
  }

  async purchaseTickets(accountId, ...ticketTypeRequests) {
    try {

      this.ticketValidator.validateTicketPurchase(ticketTypeRequests, accountId);

      const totalCost = countTotalCost(ticketTypeRequests);

      const totalSeats = calculateNumberOfSeats(ticketTypeRequests);

      await this.seatReservationService.reserveSeat(accountId, totalSeats);

      await this.ticketPaymentService.makePayment(accountId, totalCost);

      return true;

    } catch (error) {
      if (error instanceof ValidationException) {
        Logger.error('Request validation failed:', error.message);
      } else {
        Logger.error('An unexpected error occurred:', error.message);
      }

      throw new InvalidPurchaseException(error.message);
    }
  }
}
