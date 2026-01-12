import Seat from "./Seat";


class Aircraft {

    protected aircraftNumber: string;
    protected seats: Seat[];


    constructor( aircraftNumber: string , seats: Seat[] ) {
        this.aircraftNumber = aircraftNumber;
        this.seats = seats;
    }
}


export default Aircraft;