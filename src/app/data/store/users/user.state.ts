import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {UserModel} from "../../models/user.model";

export interface UserState extends EntityState<UserModel> {
  loading: [];
}

export const selectId = ({ id }: UserModel) => id!;

export const sortComparer = (a: UserModel, b: UserModel): number =>
  a.created_at!.toString().localeCompare(b.created_at!.toString());

export const adapter: EntityAdapter<UserModel> = createEntityAdapter(
  { selectId, sortComparer }
);

export const initialState: UserState = <UserState>adapter.getInitialState(
  { loading: [] }
);
