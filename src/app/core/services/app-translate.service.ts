import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@Injectable({providedIn: 'root'})
export class AppTranslateService extends TranslateService {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

/**
 * Provides a class to handle translations
 * @description this is a factory function
 * @see AppTranslateService
 */
export const provideTranslation = () => {
  return {
    provide: TranslateService,
    useClass: AppTranslateService,
  };
};
