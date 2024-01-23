import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../data/services/api.service';
import {UserModel, UserResponse} from "../../../data/models/user.model";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly apiService = inject(ApiService);

  update(user: UserModel): Observable<UserResponse> {
    return this.apiService.put<UserResponse, UserResponse>('/user', { user });
  }
}
