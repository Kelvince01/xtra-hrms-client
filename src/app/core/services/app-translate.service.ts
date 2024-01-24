import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AppTranslateService extends TranslateService {}

/**
 * Provides a class to handle translations
 * @description this is a factory function
 * @see AppTranslateService
 */
export const provideTranslation = () => {
  return {
    provide: TranslateService,
    useClass: AppTranslateService
  };
};
