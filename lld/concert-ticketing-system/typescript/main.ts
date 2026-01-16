import { ConcertTicketBookingSystem } from "./ConcertTicketBookingSystem";
import { Concert } from "./models/Concert";
import { Seat } from "./models/Seat";
import { User } from "./models/User";
import { SeatType } from "./enums/SeatType";
import { SeatStatus } from "./enums/SeatStatus";
import { Booking } from "./models/Booking";

function generateSeats(numberOfSeats: number): Seat[] {
    const seats: Seat[] = [];
    for (let i = 1; i <= numberOfSeats; i++) {
        const seatNumber = "S" + i;
        const seatType = (i <= 10) ? SeatType.VIP : (i <= 30) ? SeatType.PREMIUM : SeatType.REGULAR;
        const price = (seatType === SeatType.VIP) ? 100.0 : (seatType === SeatType.PREMIUM) ? 75.0 : 50.0;
        seats.push(new Seat(seatNumber, seatNumber, seatType, price));
    }
    return seats;
}

function selectSeats(concert: Concert, numberOfSeats: number): Seat[] {
    return concert.getSeats()
        .filter(seat => seat.getStatus() === SeatStatus.AVAILABLE)
        .slice(0, numberOfSeats);
}

function run() {
    // Create concert ticket booking system instance
    const bookingSystem = ConcertTicketBookingSystem.getInstance();

    // Date setup (using same date object to ensure equality)
    const date1 = new Date();
    date1.setDate(date1.getDate() + 30);
    date1.setMilliseconds(0); // Clear ms to be safe

    const date2 = new Date();
    date2.setDate(date2.getDate() + 60);
    date2.setMilliseconds(0);

    // Create concerts
    const concert1Seats = generateSeats(100);
    const concert1 = new Concert("C001", "Artist 1", "Venue 1", date1, concert1Seats);
    bookingSystem.addConcert(concert1);

    const concert2Seats = generateSeats(50);
    const concert2 = new Concert("C002", "Artist 2", "Venue 2", date2, concert2Seats);
    bookingSystem.addConcert(concert2);

    // Create users
    const user1 = new User("U001", "John Doe", "john@example.com");
    const user2 = new User("U002", "Jane Smith", "jane@example.com");

    // Search concerts
    const searchResults = bookingSystem.searchConcerts("Artist 1", "Venue 1", date1);
    console.log("Search Results:");
    searchResults.forEach(concert => {
        console.log(`Concert: ${concert.getArtist()} at ${concert.getVenue()}`);
    });

    // Book tickets
    const selectedSeats1 = selectSeats(concert1, 3);
    const booking1 = bookingSystem.bookTickets(user1, concert1, selectedSeats1);

    const selectedSeats2 = selectSeats(concert2, 2);
    const booking2 = bookingSystem.bookTickets(user2, concert2, selectedSeats2);

    // Cancel booking
    bookingSystem.cancelBooking(booking1.getId());

    // Book tickets again
    const selectedSeats3 = selectSeats(concert1, 2);
    const booking3 = bookingSystem.bookTickets(user2, concert1, selectedSeats3);
}

try {
    run();
} catch (e: any) {
    console.error("Error:", e.message);
}
