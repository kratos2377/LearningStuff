import Auction from "../models/Auction";


export interface AuctionObserver {



    notifyObserverOnUpdate(auction: Auction , message: string): boolean ;
}

