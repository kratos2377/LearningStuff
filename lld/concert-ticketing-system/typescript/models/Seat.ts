import { SeatType } from "../enums/SeatType";
import { SeatStatus } from "../enums/SeatStatus";
import { SeatNotAvailableException } from "../exceptions/SeatNotAvailableException";

export class Seat {
    private id: string;
    private seatNumber: string;
    private seatType: SeatType;
    private price: number;
    private status: SeatStatus;

    constructor(id: string, seatNumber: string, seatType: SeatType, price: number) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.price = price;
        this.status = SeatStatus.AVAILABLE;
    }

    public book(): void {
        if (this.status === SeatStatus.AVAILABLE) {
            this.status = SeatStatus.BOOKED;
        } else {
            throw new SeatNotAvailableException(`Seat ${this.seatNumber} is already booked or reserved.`);
        }
    }

    public release(): void {
        if (this.status === SeatStatus.BOOKED) {
            this.status = SeatStatus.AVAILABLE;
        }
    }

    public getPrice(): number {
        return this.price;
    }

    public getId(): string {
        return this.id;
    }

    public getSeatNumber(): string {
        return this.seatNumber;
    }

    public getSeatType(): SeatType {
        return this.seatType;
    }

    public getStatus(): SeatStatus {
        return this.status;
    }
}