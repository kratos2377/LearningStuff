import { AuctionObserver } from "../observer/AuctionObserver";
import Auction from "./Auction";

 


 class User implements AuctionObserver{
    protected name: string;
    protected phone: number;
    protected email: string;


    constructor(name: string, email: string , phone: number) {
        this.email = email;
        this.name = name;
        this.phone = phone;
    }
     notifyObserverOnUpdate(auction: Auction, message: string): boolean {
         console.log("Got new update for auction with message: " + message)
         return true;
     }


    getUserName() {
        return this.name
    }
 }

 export default User