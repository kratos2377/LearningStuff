import { User } from "./User";
import { Concert } from "./Concert";
import { Seat } from "./Seat";
import { BookingStatus } from "../enums/BookingStatus";

export class Booking {
    private id: string;
    private user: User;
    private concert: Concert;
    private seats: Seat[];
    private totalPrice: number;
    private status: BookingStatus;

    constructor(id: string, user: User, concert: Concert, seats: Seat[]) {
        this.id = id;
        this.user = user;
        this.concert = concert;
        this.seats = seats;
        this.totalPrice = this.calculateTotalPrice();
        this.status = BookingStatus.PENDING;
    }

    private calculateTotalPrice(): number {
        return this.seats.reduce((sum, seat) => sum + seat.getPrice(), 0);
    }

    public confirmBooking(): void {
        if (this.status === BookingStatus.PENDING) {
            this.status = BookingStatus.CONFIRMED;
            // Send booking confirmation to the user
        }
    }

    public cancelBooking(): void {
        if (this.status === BookingStatus.CONFIRMED) {
            this.status = BookingStatus.CANCELLED;
            this.seats.forEach(seat => seat.release());
            console.log(`Booking ${this.id} cancelled`);
            // Send booking cancellation notification to the user
        }
    }

    public getId(): string {
        return this.id;
    }

    public getUser(): User {
        return this.user;
    }

    public getConcert(): Concert {
        return this.concert;
    }

    public getSeats(): Seat[] {
        return this.seats;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public getStatus(): BookingStatus {
        return this.status;
    }
}
