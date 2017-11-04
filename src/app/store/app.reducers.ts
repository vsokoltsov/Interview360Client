import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProfile from '../profile/store/profile.reducers';
import * as fromCompanies from '../companies/store/companies.reducers';
import * as fromVacancies from '../vacancies/store/vacancies.reducers';
import * as fromInterviews from '../interviews/store/interview.reducers';
import * as fromEmployees from '../employees/store/employees.reducers';

export interface AppState {
  auth: fromAuth.State,
  profile: fromProfile.State,
  companies: fromCompanies.State,
  vacancies: fromVacancies.State,
  interviews: fromInterviews.State,
  employees: fromEmployees.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  profile: fromProfile.profileReducer,
  companies: fromCompanies.companiesReducer,
  vacancies: fromVacancies.vacanciesReducer,
  interviews: fromInterviews.interviewsReducer,
  employees: fromEmployees.employeesReducer
};
