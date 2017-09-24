import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProfile from '../profile/store/profile.reducers';

export interface AppState {
  auth: fromAuth.State,
  profile: fromProfile.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  profile: fromProfile.profileReducer
};
