import Payment from "../models/payment";


class PaymentProcessor {
    private static instance: PaymentProcessor;

    constructor() {}
    
    

    getInstance() {
        if(!PaymentProcessor.instance) {
            this.instance = new PaymentProcessor()
        }

        return PaymentProcessor.instance;
    }


    processPayment(payment: Payment) {
        payment.processPayment()
    }
}