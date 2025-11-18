interface PaymentGateway {
  initializePayment(): void;
  processCallback(): void;
  verifyTransaction(): void;
}