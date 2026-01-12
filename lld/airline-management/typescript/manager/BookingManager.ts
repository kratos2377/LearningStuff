import Booking from "../models/Booking";


class BookingManager {
    private static instance: BookingManager;
    private bookings: Booking[];
    private bookingCounter: number;
    private bookingMap: Record<string,Booking>;

    constructor() {
        this.bookingCounter = 0;
        this.bookingMap ={};
        this.bookings = []
    }


    getInstance() {
        if(!BookingManager.instance) {
            this.instance = new BookingManager()
        }

        return BookingManager.instance;
    }

    addBooking(booking: Booking) {
        this.bookings.push(booking)
        this.bookingMap[booking.getBookingId()] = booking
        this.bookingCounter++;
    }


}