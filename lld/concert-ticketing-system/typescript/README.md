# Concert Ticket Booking System (TypeScript)

## Problem Statement

Design and implement a Concert Ticket Booking System that allows users to book seats for concerts. The system should manage concert details, seat availability, and handle bookings with proper validation.

---

## Requirements

- **Concert Management:** The system manages concert details including name, date, venue, and available seats.
- **Seat Management:** The system tracks different types of seats (VIP, PREMIUM, REGULAR) and their availability.
- **Booking Management:** Users can book seats, and the system handles booking status (CONFIRMED, CANCELLED).
- **User Management:** The system maintains user information for bookings.
- **Validation:** The system prevents double bookings and handles seat availability checks.

---

## Core Entities

- **ConcertTicketBookingSystem:** Main class that manages concerts, bookings, and seat allocation.
- **Concert:** Represents a concert with its details and seat management.
- **Seat:** Represents a seat with its type, status, and booking information.
- **User:** Represents a user who can book tickets.
- **Booking:** Represents a booking with its status and associated details.
- **SeatType:** Enum for different seat categories (VIP, PREMIUM, REGULAR).
- **SeatStatus:** Enum for seat states (AVAILABLE, BOOKED, RESERVED).
- **BookingStatus:** Enum for booking states (PENDING, CONFIRMED, CANCELLED).

---

## Code Structure

- `enums/`: Contains enumeration definitions.
- `models/`: Contains data models (User, Seat, Concert, Booking).
- `exceptions/`: Contains custom exceptions.
- `ConcertTicketBookingSystem.ts`: Main service class (Singleton).
- `main.ts`: Demo application.

---

## Example Usage

```typescript
import { ConcertTicketBookingSystem } from "./ConcertTicketBookingSystem";

const bookingSystem = ConcertTicketBookingSystem.getInstance();

// Search concerts
const searchResults = bookingSystem.searchConcerts("Artist 1", "Venue 1", new Date());

// Book tickets
const booking = bookingSystem.bookTickets(user, concert, selectedSeats);

// Cancel booking
bookingSystem.cancelBooking(booking.getId());
```

## Running the Demo

To run the demo, ensure you have `ts-node` installed, or compile with `tsc`.

```bash
npx ts-node main.ts
```
