export class MasterCardStrategy implements PaymentGateway {
  initializePayment() {
    throw new Error('Method not implemented.');
  }
  verifyTransaction() {
    throw new Error('Method not implemented.');
  }

  processCallback(): any {
    throw new Error('Method not implemented.');
  }
}