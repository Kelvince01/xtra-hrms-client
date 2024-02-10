import {ChangeDetectionStrategy, Component, OnInit, TrackByFunction, inject} from '@angular/core';
import {UserFacade} from '@stores/users';
import {Observable, of} from 'rxjs';
import {UserCardComponent} from './user-card/user-card.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HasPermissionDirective} from '@shared/directives/has-permission.directive';
import {IUser} from '@data/models';

@Component({
  selector: 'xtra-user-list',
  standalone: true,
  imports: [UserCardComponent, AsyncPipe, RouterLink, HasPermissionDirective, NgIf, NgForOf],
  template: `
    <a *xtraHasPermission="'CreateUser'" routerLink="/uam/users/add">Create User</a>

    <ng-container *ngIf="users$ | async as users">
      <xtra-user-card
        *ngFor="let user of users; trackBy: trackById"
        [user]="user"
        (removeUser)="remove($event)"
        (editUser)="edit($event)"
      />
    </ng-container>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly userFacade: UserFacade = inject(UserFacade);

  users$: Observable<IUser[]> = of([]);

  trackById: TrackByFunction<IUser> = (index: number, {id}: IUser): number => Number(id);

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
