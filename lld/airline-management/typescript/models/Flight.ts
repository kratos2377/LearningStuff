import { Staff } from "./Staff";

export interface Flight {
    id: string,
    flight_number: string,
    flight_time: string,
    flight_source: string,
    flight_dest: string,
    assigned_staff: Staff[]
}