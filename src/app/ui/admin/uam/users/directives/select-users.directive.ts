import {DestroyRef, Directive, OnInit, inject} from '@angular/core';
import {UsersService} from '@data/services';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatSelect} from '@angular/material/select';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-select[users]',
  standalone: true,
})
export class SelectUsersDirective implements OnInit {
  private readonly select = inject(MatSelect, {self: true});
  private readonly destroyRef = inject(DestroyRef);
  private readonly userService$ = inject(UsersService);

  ngOnInit(): void {
    this.userService$
      .get()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => {
        this.select.options = users as any;
      });

    this.select.ariaLabel = `fullName`;
  }
}

/*
<form [formGroup]="formGroup">
  <mat-select users formControlName="user" placeholder="Select user"></mat-select>
</form>
 */
