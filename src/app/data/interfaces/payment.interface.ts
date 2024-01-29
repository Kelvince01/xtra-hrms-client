export interface IPaymentProviderService {
  pay(transactionId: string, amount: number): void;
}

export interface IRefundablePaymentProviderService extends IPaymentProviderService {
  refund(transactionId: string, amount: number): void;
}
