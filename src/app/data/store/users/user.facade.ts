import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {addUser, deleteUser, updateUser} from './user.action';
import {selectUsers} from './user.selector';
import {IUser} from '@data/models';

@Injectable({providedIn: 'root'})
export class UserFacade {
  private readonly store: Store = inject(Store);

  readonly users$: Observable<IUser[]> = this.store.select(selectUsers);

  addUser(user: IUser): void {
    this.store.dispatch(addUser({user}));
  }

  deleteOne(id: number): void {
    this.store.dispatch(deleteUser({id}));
  }

  update(user: IUser) {
    this.store.dispatch(updateUser({user: user}));
  }
}
