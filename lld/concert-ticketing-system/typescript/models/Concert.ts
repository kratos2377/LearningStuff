import { Seat } from "./Seat";

export class Concert {
    private id: string;
    private artist: string;
    private venue: string;
    private dateTime: Date;
    private seats: Seat[];

    constructor(id: string, artist: string, venue: string, dateTime: Date, seats: Seat[]) {
        this.id = id;
        this.artist = artist;
        this.venue = venue;
        this.dateTime = dateTime;
        this.seats = seats;
    }

    public getId(): string {
        return this.id;
    }

    public getArtist(): string {
        return this.artist;
    }

    public getVenue(): string {
        return this.venue;
    }

    public getDateTime(): Date {
        return this.dateTime;
    }

    public getSeats(): Seat[] {
        return this.seats;
    }
}
