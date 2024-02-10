import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  forwardRef,
  inject,
  DestroyRef,
} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UsersService} from '@data/services';
import {Subject} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'xtra-select-user',
  standalone: true,
  imports: [MatSelect, ReactiveFormsModule, AsyncPipe],
  template: `
    <mat-select
      [formControl]="formControl"
      [value]="(users$ | async)!"
      [aria-label]="optionLabel"
    ></mat-select>
  `,
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectUserComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectUserComponent implements ControlValueAccessor {
  @Input({required: true}) formControl!: FormControl;
  @Input() optionLabel = 'fullName';
  @Input() placeholder = 'Select user';

  @ViewChild('select')
  set select(next: ControlValueAccessor) {
    this.value$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      next.writeValue(value);
    });

    this.disabled$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      next.setDisabledState!(value);
    });
    next.registerOnChange(this.onChange);
    next.registerOnTouched(this.onTouch);
  }

  private readonly destroyRef = inject(DestroyRef);
  private readonly userService$ = inject(UsersService);

  private onChange: any;
  private onTouch: any;
  private value$ = new Subject<number>();
  private disabled$ = new Subject<boolean>();

  users$ = this.userService$.get();

  writeValue(obj: any): void {
    this.value$.next(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled$.next(isDisabled);
  }
}
