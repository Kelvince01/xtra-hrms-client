import {Injectable} from "@angular/core";
import { Store } from "@ngrx/store";
import {selectError, selectIsLoading, selectToken} from "./auth.selector";
import {login} from "./auth.action";

@Injectable()
export class AuthFacade {
  email = '';
  password = '';
  token = '';
  error = '';
  isLoading = false;

  constructor(private store: Store) {
    // this.store.select(selectToken).pipe(token => (this.token = token));
    this.store.select(selectError).subscribe(error => (this.error = error));
    this.store.select(selectIsLoading).subscribe(isLoading => (this.isLoading = isLoading));
  }

  logIn() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
