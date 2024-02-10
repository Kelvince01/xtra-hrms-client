import {Directive, inject, DestroyRef, Input, ElementRef, ChangeDetectorRef} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatMenuItem} from '@angular/material/menu';
import {AuthService, RolesService} from '@data/services';
import {MatSelect} from '@angular/material/select';
import {ReplaySubject} from 'rxjs';
import {IUser} from '@data/models';
import {IRole} from '@models/accounts.model';
import {observableToSubject} from '@shared/utils';
import {initialUserValue} from '@stores/auth';

@Directive({
  selector: '[xtraAuthorizedAccessOnly]',
  standalone: true,
})
export class AuthorizedAccessOnlyDirective {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly roleService = inject(RolesService);
  private readonly userService = inject(AuthService);

  private readonly elementRef = inject(ElementRef, {self: true});
  private readonly button = inject(MatButton, {self: true, optional: true});
  private readonly select = inject(MatSelect, {self: true, optional: true});
  private readonly menuItem = inject(MatMenuItem, {self: true, optional: true});

  @Input() set roles(value: IRole[]) {
    const currentUser$ = this.userService.user();
    this.roleService
      .hasRole(
        value,
        observableToSubject<IUser>(currentUser$, initialUserValue, new ReplaySubject<IUser>()),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((hasPermission) => {
        this.updateDisabledStatus(!hasPermission);
      });
  }

  private updateDisabledStatus(disabled: boolean): void {
    if (this.button) {
      this.button.disabled = disabled;
      this.changeDetectorRef.detectChanges();
    } else if (this.select) {
      this.select.disabled = disabled;
    } else if (this.menuItem) {
      this.menuItem.disabled = disabled;
    } else if (this.elementRef.nativeElement && 'disabled' in this.elementRef.nativeElement) {
      this.elementRef.nativeElement.disabled = disabled;
    }
  }
}

/*
    <input xtraAuthorizedAccessOnly [roles]="allowedRoles" type="text" />
 */
