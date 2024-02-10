import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IUser} from '@data/models';

export interface UserState extends EntityState<IUser> {
  loading: [];
  user: IUser;
}

export const selectId = ({id}: IUser) => id!;

export const sortComparer = (a: IUser, b: IUser): number =>
  a.created_at!.toString().localeCompare(b.created_at!.toString());

export const adapter: EntityAdapter<IUser> = createEntityAdapter({selectId, sortComparer});

export const initialUserValue: IUser = {
  photoURL: undefined,
  password: '',
  roles: [],
  phone_no: '',
  email: '',
  username: '',
  bio: '',
  photo: '',
};

export const initialState: UserState = <UserState>(
  adapter.getInitialState({loading: [], user: initialUserValue})
);
