import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '@data/models';
import {UsersService} from '@data/services';

@Injectable({providedIn: 'root'})
export class ProfileService {
  private readonly userService = inject(UsersService);

  update(user: IUser): Observable<IUser> {
    return this.userService.update(user);
  }
}
