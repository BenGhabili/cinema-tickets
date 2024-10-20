# Cinema Ticket Service

This project implements a **Cinema Ticket Service** in Node.js. The service is responsible for handling ticket purchases, payments, and seat reservations according to business rules.

## Features
- Validates ticket purchase requests (adult, child, and infant tickets).
- Ensures compliance with business rules (e.g., infants must be accompanied by adults).
- Calculates total costs and allocates seat reservations.
- Handles external payment and seat reservation services.
- Extensible with custom logger and validation helpers.

## Getting Started

### Prerequisites
- **Node.js** (v20 or later)
- **npm** or **yarn**

### Setup
1. Clone the repository:
```bash
git clone https://github.com/BenGhabili/cinema-tickets.git
cd cinema-tickets
```

2. Install dependencies:

*Optional* - If you are using `nvm` to manage node versions:
```bash
nvm use
```

```bash
npm install
```

## Running the Application
There is no actual run script for this service since it's a coding exercise. However, you can test the code via the provided unit tests.

## Running Tests
Run all tests using Jest:

```bash
npm run test
```

## Business Rules
- There are 3 types of tickets: ADULT, CHILD, and INFANT.
- Infants do not pay for tickets and do not get allocated seats (they sit on an adult's lap).
- Child and infant tickets cannot be purchased without at least one adult ticket.
- A maximum of 25 tickets can be purchased at a time.
- External services handle payment and seat reservations.


## Classes Overview
- `TicketService`: Main service for handling ticket purchases, payments, and seat reservations.
- `TicketValidator`: Validates ticket requests against the business rules.
- `TicketPaymentService`: Handles payment processing (external service).
- `SeatReservationService`: Reserves seats for the ticket purchases (external service).
- `Logger`: Static logger for error and info logging.

## Testing
Unit tests are written using Jest. The tests cover all important scenarios such as:

- Valid ticket purchases.
- Validation failures (e.g., invalid ticket type or quantity).
- Error handling and logging.

## Future Improvements
- Implement more comprehensive business logic around payment and seat reservations.
- Add API endpoints to expose the service via REST.
- Integrate real logging using tools like Winston.

## Contact
For questions, please reach out to sghabili@gmail.com
