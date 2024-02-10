/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Injectable} from '@angular/core';
import {userIsOnMobileDevice} from '@services/common/check-is-mobile.util';

export type Platform = 'Desktop' | 'Mobile' | 'Web';

@Injectable({
  providedIn: 'root',
})
export class PlatformInformationService {
  get isMobile(): boolean {
    return userIsOnMobileDevice;
  }

  get isElectron(): boolean {
    return window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
  }

  get isWeb(): boolean {
    return !this.isMobile && !this.isElectron;
  }

  get platform(): Platform {
    if (this.isElectron) {
      return 'Desktop';
    } else if (this.isMobile) {
      return 'Mobile';
    }

    return 'Web';
  }
}
