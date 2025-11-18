interface PaymentProvider {
  initializePayment(): any;
  processCallback(): any;
  verifyTransaction(): any;
}