export class MobileMoneyGateway implements PaymentGateway {
  initializePayment() {
    console.log("Initializing Payment Gateway");
  }
  processCallback() {
    throw new Error('Method not implemented.');
  }
  verifyTransaction() {
    console.log("Initializing Visa Gateway");
  }
}