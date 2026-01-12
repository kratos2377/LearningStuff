import { PaymentStatus } from "../enum/PaymentStatus";


class Payment {

    protected paymentId: string;
    protected paymentMethod: string;
    protected status: PaymentStatus;
    protected price: number;

    constructor(paymentId: string , paymentMethod: string , price: number) {
        this.paymentId = paymentId;
        this.paymentMethod = paymentMethod;
        this.status = PaymentStatus.PENDING;
        this.price = price;
    }

    processPayment() {
        this.status = PaymentStatus.COMPLETED
    }

}

export default Payment;