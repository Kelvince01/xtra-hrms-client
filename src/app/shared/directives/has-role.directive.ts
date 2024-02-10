import {DestroyRef, Directive, Input, TemplateRef, inject, ViewContainerRef} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AuthService, UsersService} from '@data/services';
import {IRole} from '@models/accounts.model';

@Directive({
  selector: '[xtraHasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private readonly destroyRef = inject(DestroyRef);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly userService = inject(UsersService);
  private readonly authService = inject(AuthService);
  private readonly viewContainer = inject(ViewContainerRef);

  @Input('xtraHasRole') set roles(value: IRole[]) {
    this.userService
      .hasRole(value, this.authService.user())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((hasRole) => (hasRole ? this.addTemplate() : this.clearTemplate()));
  }

  private addTemplate(): void {
    this.clearTemplate();
    this.viewContainer.createEmbeddedView(this.templateRef!);
  }

  private clearTemplate(): void {
    this.viewContainer.clear();
  }
}

/*
<mat-list *hasRole="[UserRole.ADMIN, UserRole.MANAGER]" role="list">
      <mat-list-item role="listitem">Setting 1</mat-list-item>
      <mat-list-item role="listitem">Setting 2</mat-list-item>
    </mat-list>
 */
