import {Injectable} from '@angular/core';

@Injectable()
export class MockServerService {
  getData(): Promise<unknown> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = [];
        for (let i = 0; i < 7; i++) {
          mockData.push(Math.round(Math.random() * 900 + 700));
        }
        resolve(mockData);
      }, 500);
    });
  }
}
