import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {UserModel} from "../models/user.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UserModel> {
  protected collectionName: string = 'users';
}
