import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProfile from '../profile/store/profile.reducers';
import * as fromCompanies from '../companies/store/companies.reducers';

export interface AppState {
  auth: fromAuth.State,
  profile: fromProfile.State,
  companies: fromCompanies.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  profile: fromProfile.profileReducer,
  companies: fromCompanies.companiesReducer
};
