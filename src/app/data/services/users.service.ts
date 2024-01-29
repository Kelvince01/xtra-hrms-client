import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {IPermission, IRole, IUser} from '@models/accounts.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<IUser> {
  protected collectionName: string = 'users';

  checkIfUsernameExists(value: string): Observable<any> {
    return of();
  }
}

@Injectable()
export class RolesService extends BaseService<IRole> {
  override collectionName = 'roles';
}

@Injectable()
export class PermissionsService extends BaseService<IPermission> {
  override collectionName = 'permissions';
}
