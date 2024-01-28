import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ngrxFormsQuery} from '@stores/forms';
import {formsActions} from '@stores/forms';

@Component({
  selector: 'xtra-list-errors',
  standalone: true,
  template: `
    @if (errors.length! > 0) {
      <ul class="error-messages">
        @for (error of errors; track error) {
          <li data-e2e-id="error">
            {{ error }}
          </li>
        }
      </ul>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  errors: string[] = [];

  ngOnInit() {
    this.store
      .select(ngrxFormsQuery.selectErrors)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        this.errors = Object.keys(e || {}).map((key) => `${key} ${e[key]}`);
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.initializeErrors());
  }
}
