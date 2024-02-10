import {Directive, HostListener, inject, Input} from '@angular/core';
import {AuthorizedAccessOnlyDirective} from '@shared/directives/authorized-access-only.directive';
import {TooltipDirective} from '@shared/directives/tooltip.directive';
import {IUser} from '@data/models';
import {UsersService} from '@data/services';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

@Directive({
  selector: '[xtraDeleteUser]',
  standalone: true,
  hostDirectives: [
    {directive: TooltipDirective, inputs: ['message']},
    {
      directive: AuthorizedAccessOnlyDirective,
      inputs: ['roles: activeFor'],
    },
  ],
})
export class DeleteUserDirective {
  @Input({required: true}) user!: IUser;

  private readonly usersService = inject(UsersService);
  readonly #toastr = inject(ToastrService);

  @HostListener('click')
  deleteUser(): void {
    this.usersService.delete(this.user.id!);
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.value) {
          this.usersService.delete(this.user.id!).subscribe();

          this.#toastr.success('Object deleted successfully', 'Success');
          Swal.fire('Removed!', 'Object removed successfully.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Asset not deleted.)', 'error');
        }
      });
    } catch (error: any) {
      console.error(`Error deleting object ${this.user.username}`, error.error);
      this.#toastr.error(`Error when deleting asset ${error.error}`, 'Failed');
    }
  }
}
