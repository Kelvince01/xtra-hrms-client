/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

export interface IResponse<T> {
  error: boolean;
  message: string;
  data: T[];
}

export interface Response<T> {
  status_code: string;
  message: string;
  data: T[] | {result: string};
}
