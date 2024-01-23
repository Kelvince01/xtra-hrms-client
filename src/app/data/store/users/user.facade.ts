import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {UserModel} from "../../models/user.model";
import {addUser, deleteUser} from "./user.action";
import {selectUsers} from "./user.selector";

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store: Store = inject(Store);

  readonly users$: Observable<UserModel[]> = this.store.select(selectUsers);

  addUser(user: UserModel): void {
    this.store.dispatch(addUser({ user }));
  }

  deleteOne(id: number): void {
    this.store.dispatch(deleteUser({ id }));
  }

  update(userModel: UserModel) {

  }
}
