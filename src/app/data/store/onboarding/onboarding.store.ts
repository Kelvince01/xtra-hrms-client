import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {OnboardingStageState, onboardingStageInitialState} from './onboarding.state';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {OnboardingStagesService} from '@data/services';
import {Router} from '@angular/router';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import Swal from 'sweetalert2';
import {exhaustMap, pipe} from 'rxjs';
import {concatLatestFrom} from '@ngrx/effects';
import {formsActions, ngrxFormsQuery} from '../forms';
import {tapResponse} from '@ngrx/component-store';

export const OnboardingStageStore = signalStore(
  {providedIn: 'root'},
  withState<OnboardingStageState>(onboardingStageInitialState),
  withMethods(
    (
      store,
      reduxStore = inject(Store),
      onboardingStageService = inject(OnboardingStagesService),
      router = inject(Router),
    ) => ({
      createOnboardingStage: rxMethod<void>(
        pipe(
          concatLatestFrom(() => reduxStore.select(ngrxFormsQuery.selectData)),
          exhaustMap(([, data]) =>
            onboardingStageService.create(data).pipe(
              tapResponse({
                next: (onboardingStage) => {
                  patchState(store, {onboardingStage});
                  Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: `Onboarding Stage created!`,
                    customClass: {
                      confirmButton: 'sweetAlertButton',
                    },
                  });
                  router.navigateByUrl('/onboarding/stages');
                },
                error: ({error}) =>
                  reduxStore.dispatch(formsActions.setErrors({errors: error.errors})),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);
