import { Flight } from "../models/Flight";



class FlightManager {
    private static instance: FlightManager;
    private flights: Flight[];
    private flightCounter: number;
    private flightMap: Record<string,Flight>;

    constructor() {
        this.flightCounter = 0;
        this.flightMap ={};
        this.flights = []
    }


    getInstance() {
        if(!FlightManager.instance) {
            this.instance = new FlightManager()
        }

        return FlightManager.instance;
    }


    addNewFlight(flight: Flight) {
        this.flights.push(flight)
        this.flightMap[flight.id] = flight;
        this.flightCounter++;
    }

    removeFlight(flight: Flight) {
        //this.flightMap[flight.id] = null
    }



    
}