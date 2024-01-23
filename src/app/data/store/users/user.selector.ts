import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {AppState} from "../index";
import {UserState} from "./user.state";
import {UserModel} from "../../models/user.model";

export const selectUsersFeature: MemoizedSelector<AppState, UserState> =
  createFeatureSelector<UserState>('users');

export const selectUsers: MemoizedSelector<AppState, UserModel[]> =
  createSelector(
    selectUsersFeature,
    ({ entities }: UserState): UserModel[] =>
      Object.values(entities) as UserModel[]
  );
