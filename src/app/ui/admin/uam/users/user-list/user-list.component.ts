import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '@data/models';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { UserFacade } from '@stores/users';
import { Observable, of } from 'rxjs';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'xtra-user-list',
  standalone: true,
  imports: [UserCardComponent, AsyncPipe, RouterLink, HasPermissionDirective],
  template: `
    <a *xtraHasPermission="'CreateUser'" routerLink="/uam/users/add">Create User</a>

    @if (users$ | async; as users) {
      @for (user of users; track trackById($index, user)) {
        <xtra-user-card [user]="user" (removeUser)="remove($event)" (editUser)="edit($event)" />
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly userFacade: UserFacade = inject(UserFacade);

  users$: Observable<IUser[]> = of([]);

  trackById: TrackByFunction<IUser> = (index: number, { id }: IUser): number => Number(id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveUser(event?: any): void {
    const userModel: IUser = {
      photo: undefined,
      photoURL: undefined,
      roles: [],
      permissions: [],
      password: '',
      phone_no: '',
      id: 0,
      created_at: new Date(),
      email: '',
    };
    this.userFacade.addUser(userModel);
  }

  remove(id: number) {
    // send removal request to data managing service
    this.userFacade.deleteOne(id);
  }

  edit(message: IUser) {
    // sen edit request to data managing service
    this.userFacade.update(message);
  }

  ngOnInit(): void {
    this.saveUser();
    this.users$ = this.userFacade.users$;
  }
}
