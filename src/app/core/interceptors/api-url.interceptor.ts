/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function addApiUrl(req: HttpRequest<any>, next: HttpHandlerFn) {
  const url = req.url;
  const newUrl = 'http://localhost:8000/api/v1/' + url;
  const newReq = req.clone({ url: newUrl });
  return next(newReq);
}
