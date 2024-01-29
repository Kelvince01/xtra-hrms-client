/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class XmlService<T> {
  data: T[] = [];

  constructor() {}

  extractPointsPerPlayer(text: string): T[] {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const players = [].slice.call(xml.querySelector('players')!.children);

    return players.map((item: any) => {
      return {
        player: item.textContent,
        points: item.getAttribute('points'),
      } as any;
    });
  }
}
