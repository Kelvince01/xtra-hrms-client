/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

export interface IPaymentTransaction {
  id?: number;
  phone_number?: string;
  amount?: number;
  isFinished?: boolean;
  isSuccessFull?: boolean;
  trans_id?: string;
  order_id?: string;
  checkoutRequestID?: string;
  date_modified?: Date;
  date_created?: Date;
}
