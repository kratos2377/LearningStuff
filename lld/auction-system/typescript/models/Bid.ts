import User from "./User";



class Bid {
    protected user: User;
    protected bidPrice: number;
    

    constructor(user: User , price: number) {
        this.user = user;
        this.bidPrice = price;
    }

}


export default Bid