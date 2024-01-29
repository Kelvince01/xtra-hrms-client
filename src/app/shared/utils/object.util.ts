/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

export function groupBy(xs: any, key: any): any {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x.points);
    return rv;
  }, {});
}
