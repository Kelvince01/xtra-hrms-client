import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {UserModel} from '@data/models';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<UserModel> {
  protected collectionName: string = 'users';
}
