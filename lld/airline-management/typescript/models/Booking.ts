import { PaymentStatus } from "../enum/PaymentStatus";
import Passenger from "./Passenger";
import  Seat  from "./Seat";

 class Booking {

    protected id: string;
    protected payment_status: PaymentStatus;
    protected user: Passenger;
    protected seat_assigned: Seat;
    protected price: number;


    constructor(user: Passenger , price: number , seat: Seat) {
        this.user = user;
        this.price = price;
        this.seat_assigned = seat;
        this.id = user.getName() + "_" + seat.getSeatNumber();
        this.payment_status = PaymentStatus.PENDING
    }

    getBookingId() {
        return this.id
    }
}

export default Booking;