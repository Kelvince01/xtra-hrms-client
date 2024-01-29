import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  Router,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideServiceWorker} from '@angular/service-worker';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {environment} from '../environments/environment.development';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideBaseProviders, provideRecaptcha} from '@core/providers';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withJsonpSupport,
} from '@angular/common/http';
import {authInterceptor, spinnerInterceptor} from '@core/interceptors';
import {NgxSpinnerModule} from 'ngx-spinner';
import {getAnalytics, provideAnalytics, ScreenTrackingService} from '@angular/fire/analytics';
import {provideToastr} from 'ngx-toastr';
import {getPerformance, providePerformance} from '@angular/fire/performance';
import {provideRouterStore} from '@ngrx/router-store';
import {AppEffects, AppReducers} from '@data/store';
import {errorHandlingInterceptor} from '@core/interceptors';
import {API_URL} from '@data/services';
import {HttpLoaderFactory, provideTranslation} from '@core/services';
import {provideErrorTailorConfig} from '@ngneat/error-tailor';
import {mismatchErrorKey} from '@shared/utils';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {provideEcharts} from 'ngx-echarts';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import * as Sentry from '@sentry/angular-ivy';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';

// export function tokenGetter(): string {
//   return localStorage.getItem('xtra-hrms-token')!;
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([authInterceptor, spinnerInterceptor(), errorHandlingInterceptor]),
      withFetch(),
      withJsonpSupport(),
    ),
    ...provideBaseProviders(),
    provideClientHydration(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimations(),
    provideStore(AppReducers),
    provideEffects(AppEffects),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideTranslation(),
    provideRecaptcha(),
    importProvidersFrom([
      // JwtModule.forRoot({
      //   config: {
      //     tokenGetter,
      //     allowedDomains: [environment.BASE_API_URL],
      //     disallowedRoutes: [],
      //   },
      // }),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAnalytics(() => getAnalytics()),
      providePerformance(() => getPerformance()),
      NgxSpinnerModule.forRoot({type: 'ball-spin-clockwise-fade'}),
      MatDialogModule,
      MatNativeDateModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en-US',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    ScreenTrackingService,
    provideEcharts(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'This field is required',
          minlength: ({requiredLength}) => `Field must be ${requiredLength} characters`,
          pattern: 'Field must one uppercase, one lowercase, one number, and one special character',
          [mismatchErrorKey]: 'Passwords must match',
        },
      },
    }),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    {provide: API_URL, useValue: environment.BASE_API_URL},
  ],
};
