import {Directive, HostListener, inject, Input} from '@angular/core';
import {AuthorizedAccessOnlyDirective} from '@shared/directives/authorized-access-only.directive';
import {IUser} from '@data/models';
import {UsersService} from '@data/services';

@Directive({
  selector: '[xtraCopyUser]',
  standalone: true,
  hostDirectives: [
    {
      directive: AuthorizedAccessOnlyDirective,
      inputs: ['roles: activeFor'],
    },
  ],
})
export class CopyUserDirective {
  @Input({required: true}) user!: IUser;

  private readonly usersService = inject(UsersService);

  @HostListener('click')
  copyUser(): void {
    this.usersService.copy(this.user);
  }
}
