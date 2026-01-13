import { AuctionStatus } from "../enum/AuctionStatus";
import { AuctionObserver } from "../observer/AuctionObserver";
import Bid from "./Bid";
import User from "./User";



class Auction {
    protected itemName: string;
    protected bids: Bid[];
    protected bidStartPrice: number;
    protected highestBid: number;
    protected highestBidder: User | null;
    protected bidStartTime: EpochTimeStamp;
    protected bidEndTime: EpochTimeStamp;
    protected auctionStatus: AuctionStatus;
    protected seller: User;
    protected observers: Set<AuctionObserver>;

    constructor(itemName: string , bidStartPrice: number , seller: User) {
        this.itemName = itemName;
        this.bids = [];
        this.bidStartPrice = bidStartPrice;
        this.highestBid = bidStartPrice;
        this.highestBidder = null;
        this.bidStartTime = 0;
        this.bidEndTime = 0;
        this.auctionStatus = AuctionStatus.STARTED;
        this.seller = seller;
        this.observers = new Set()
    }

    notifyAllObservers(message: string): boolean {

        this.observers.forEach((observer) => {
            observer.notifyObserverOnUpdate(this , message)
        })

        return true;

    }


    changeAuctionStatus(status: AuctionStatus) { 
        if(this.auctionStatus === AuctionStatus.CLOSED) {
            throw new Error("Auction is closed status canot be changed now")
        }



        this.auctionStatus = status;
    }

    placeBid(user: User , price: number , bid: Bid) {

        this.bids.push(bid)

        this.setNewBidPrice(price , user , bid)
        this.observers.add(user)
    }

    setNewBidPrice(price: number , user: User , bid: Bid) {
           if(this.auctionStatus === AuctionStatus.CLOSED) {
            throw new Error("Auction is closed.")
        }
        if(price <= this.highestBid) {
            throw new Error("New Price should be greater than current highest bid price")
        }

        this.highestBid = price;
        this.highestBidder = user;
    }


    sellItemAndCloseAuction() {
        this.auctionStatus = AuctionStatus.CLOSED;
       if(this.highestBidder === null) {
        console.log("No one bought the item. Auction closed")
        return
       }


        console.log(`Item successfully sold to user: ${this.highestBidder.getUserName()}`)
    }


    

    
}

export default Auction