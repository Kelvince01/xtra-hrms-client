import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import {provideRouter, withComponentInputBinding, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import { environment } from '../environments/environment.development';
import {provideFirebaseApp, initializeApp} from "@angular/fire/app";
import { provideBaseProviders } from './core/providers';
import {provideHttpClient, withFetch, withInterceptors, withJsonpSupport} from '@angular/common/http';
import {spinnerInterceptor} from "./core/interceptors/spinner.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {getAnalytics, provideAnalytics, ScreenTrackingService } from "@angular/fire/analytics";
import {provideToastr} from "ngx-toastr";
import {getPerformance, providePerformance} from "@angular/fire/performance";
import { provideRouterStore } from '@ngrx/router-store';
import {AppEffects, AppReducers} from "./data/store";
import { errorHandlingInterceptor } from './core/interceptors/error-handling.interceptor';
import {API_URL} from "./data/services/api-url.token";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      ),
    provideHttpClient(
      withInterceptors([spinnerInterceptor(), errorHandlingInterceptor]),
      withFetch(),
      withJsonpSupport()
    ),
    ...provideBaseProviders(),
    provideClientHydration(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
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
        traceLimit: 75 // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    importProvidersFrom([
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAnalytics(() => getAnalytics()),
        providePerformance(() => getPerformance()),
        NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise-fade' })
    ]),
    ScreenTrackingService,
    provideToastr({
        timeOut: 10000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true
    }),
    { provide: API_URL, useValue: environment.BASE_API_URL },
]
};
