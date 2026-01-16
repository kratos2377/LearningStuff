import { Concert } from "./models/Concert";
import { Booking } from "./models/Booking";
import { User } from "./models/User";
import { Seat } from "./models/Seat";
import { SeatStatus } from "./enums/SeatStatus";
import { SeatNotAvailableException } from "./exceptions/SeatNotAvailableException";

export class ConcertTicketBookingSystem {
    private static instance: ConcertTicketBookingSystem;
    private concerts: Map<string, Concert>;
    private bookings: Map<string, Booking>;

    private constructor() {
        this.concerts = new Map<string, Concert>();
        this.bookings = new Map<string, Booking>();
    }

    public static getInstance(): ConcertTicketBookingSystem {
        if (!ConcertTicketBookingSystem.instance) {
            ConcertTicketBookingSystem.instance = new ConcertTicketBookingSystem();
        }
        return ConcertTicketBookingSystem.instance;
    }

    public addConcert(concert: Concert): void {
        this.concerts.set(concert.getId(), concert);
    }

    public getConcert(concertId: string): Concert | undefined {
        return this.concerts.get(concertId);
    }

    public searchConcerts(artist: string, venue: string, dateTime: Date): Concert[] {
        return Array.from(this.concerts.values()).filter(concert =>
            concert.getArtist().toLowerCase() === artist.toLowerCase() &&
            concert.getVenue().toLowerCase() === venue.toLowerCase() &&
            concert.getDateTime().getTime() === dateTime.getTime()
        );
    }

    public bookTickets(user: User, concert: Concert, seats: Seat[]): Booking {
        // Check seat availability and book seats
        // Note: In a single-threaded environment like Node.js, this block is effectively synchronized 
        // as long as there are no await calls within the critical section.

        for (const seat of seats) {
            if (seat.getStatus() !== SeatStatus.AVAILABLE) {
                throw new SeatNotAvailableException(`Seat ${seat.getSeatNumber()} is not available.`);
            }
        }

        seats.forEach(seat => seat.book());

        // Create booking
        const bookingId = this.generateBookingId();
        const booking = new Booking(bookingId, user, concert, seats);
        this.bookings.set(bookingId, booking);

        // Process payment
        this.processPayment(booking);

        // Confirm booking
        booking.confirmBooking();

        console.log(`Booking ${booking.getId()} - ${booking.getSeats().length} seats booked`);

        return booking;
    }

    public cancelBooking(bookingId: string): void {
        const booking = this.bookings.get(bookingId);
        if (booking) {
            booking.cancelBooking();
            this.bookings.delete(bookingId);
        }
    }

    private processPayment(booking: Booking): void {
        // Process payment for the booking
        // Mock implementation
    }

    private generateBookingId(): string {
        return "BKG" + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}
