

class Seat {
        seat_number: string;
    is_window: boolean;
    is_available: boolean;
    is_reserved: boolean;


    constructor(seat_number: string, is_window: boolean , is_available: boolean , is_reserved: boolean) {
        this.seat_number = seat_number;
        this.is_window = is_window;
        this.is_available = is_available;
        this.is_reserved = is_reserved;
    }

     reserveSeat = () =>  {
        this.is_reserved = true;
    }

    unreserveSeat = () => {
        this.is_reserved = false;
    }

    changeAvailabilityStatus = () => {
        this.is_available = !this.is_available;
    }

    getSeatNumber = () => {
        return this.seat_number;
    }
}


export default Seat;