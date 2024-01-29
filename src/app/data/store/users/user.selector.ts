import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from '../index';
import {UserState} from './user.state';
import {IUser} from '@data/models';

export const selectUsersFeature: MemoizedSelector<AppState, UserState> =
  createFeatureSelector<UserState>('users');

export const selectUsers: MemoizedSelector<AppState, IUser[]> = createSelector(
  selectUsersFeature,
  ({entities}: UserState): IUser[] => Object.values(entities) as IUser[],
);
