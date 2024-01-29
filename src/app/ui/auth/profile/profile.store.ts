import {Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';

import {ComponentStore} from '@ngrx/component-store';
import {concatLatestFrom} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {pipe} from 'rxjs';
import {concatMap, map, tap} from 'rxjs/operators';
import {ProfileService} from './profile.service';
import {LocalStorageJwtService} from '@shared/services';
import {AuthStore} from '@stores/auth';
import {ngrxFormsQuery} from '@stores/forms';

@Injectable()
export class SettingsStoreService extends ComponentStore<Record<string, unknown>> {
  private readonly settingsService = inject(ProfileService);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);

  // EFFECTS
  readonly updateSettings = this.effect<void>(
    pipe(
      concatLatestFrom(() => [this.store.select(ngrxFormsQuery.selectData)]),
      concatMap(([, data]) =>
        this.settingsService.update(data).pipe(
          tap((result) => this.router.navigate(['profile', result.user.username])),
          tap((result) => this.localStorageJwtService.setItem(result.user!)),
          map(() => this.authStore.getUser()),
        ),
      ),
    ),
  );
}
