import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {IPermission, IRole, IUser} from '@models/accounts.model';
import {BehaviorSubject, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<IUser> {
  protected collectionName: string = 'users';

  checkIfUsernameExists(value: string): Observable<any> {
    return of();
  }

  copy(user: IUser) {}

  hasRole = (roles: IRole[], currentUser$: Observable<IUser>) =>
    currentUser$.pipe(
      map((user) => {
        const userRoles: IRole[] = Array.isArray(roles) ? roles : [roles];
        return (
          userRoles.length === 0 ||
          user?.roles.some((r) => userRoles.map((r) => r.name).includes(r as string))
        );
      }),
    );

  setCurrentUser(iUser: IUser) {}
}

@Injectable({
  providedIn: 'root',
})
export class RolesService extends BaseService<IRole> {
  override collectionName = 'roles';

  hasRole = (roles: IRole[], currentUser$: BehaviorSubject<IUser>) =>
    currentUser$.pipe(
      map((user) => {
        const userRoles: IRole[] = Array.isArray(roles) ? roles : [roles];
        return (
          userRoles.length === 0 ||
          user?.roles.some((r) => userRoles.map((r) => r.name).includes(r as string))
        );
      }),
    );
}

@Injectable({
  providedIn: 'root',
})
export class PermissionsService extends BaseService<IPermission> {
  override collectionName = 'permissions';
}
