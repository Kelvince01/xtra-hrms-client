import { Injectable } from '@angular/core';
import { IPermission, IRole, IUser } from '@models/accounts.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { BaseService } from './base.service';

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
      map(user => {
        const userRoles: IRole[] = Array.isArray(roles) ? roles : [roles];
        return (
          userRoles.length === 0 ||
          user?.roles.some(r => userRoles.map(r => r.name).includes(r as string))
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
      map(user => {
        const userRoles: IRole[] = Array.isArray(roles) ? roles : [roles];
        return (
          userRoles.length === 0 ||
          user?.roles.some(r => userRoles.map(r => r.name).includes(r as string))
        );
      }),
    );
}

export type Permissions =
  | 'ViewEmployees'
  | 'EditEmployeeGeneralDetails'
  | 'EditEmployeePrivateDetails'
  | 'DeleteEmployee'
  | 'CreateEmployee';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService extends BaseService<IPermission> {
  override collectionName = 'permissions';

  private readonly permissions$ = new BehaviorSubject<Partial<Record<Permissions, boolean>>>({
    ViewEmployees: true,
  });

  hasPermission(permission: Permissions) {
    return this.permissions$.pipe(map(permissions => permissions[permission] ?? false));
  }

  hasPermissions(permissions: Permissions[]) {
    return this.permissions$.pipe(
      map(existingPermissions =>
        permissions.every(permission => existingPermissions[permission] ?? false),
      ),
    );
  }

  setPermissions(permissions: Partial<Record<Permissions, boolean>>) {
    this.permissions$.next({ ...this.permissions$.getValue(), ...permissions });
  }

  revokePermission(permission: Permissions) {
    this.permissions$.next({ ...this.permissions$.getValue(), [permission]: false });
  }
}
