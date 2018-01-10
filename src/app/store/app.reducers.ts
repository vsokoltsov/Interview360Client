import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProfile from '../profile/store/profile.reducers';
import * as fromCompanies from '../companies/store/companies.reducers';
import * as fromVacancies from '../vacancies/store/vacancies.reducers';
import * as fromInterviews from '../interviews/store/interview.reducers';
import * as fromEmployees from '../employees/store/employees.reducers';
import * as fromLoader from '../shared/loader/store/loaders.reducers';
import * as fromPopupNotifications from '../popup-notifications/store/popup-notifications.reducers';
import * as fromResumes from '../resumes/store/resumes.reducers';

export interface AppState {
  auth: fromAuth.State,
  profile: fromProfile.State,
  companies: fromCompanies.State,
  vacancies: fromVacancies.State,
  interviews: fromInterviews.State,
  employees: fromEmployees.State,
  loaders: fromLoader.State,
  popupNotifications: fromPopupNotifications.State,
  resumes: fromResumes.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  profile: fromProfile.profileReducer,
  companies: fromCompanies.companiesReducer,
  vacancies: fromVacancies.vacanciesReducer,
  interviews: fromInterviews.interviewsReducer,
  employees: fromEmployees.employeesReducer,
  loaders: fromLoader.loadersReducers,
  popupNotifications: fromPopupNotifications.popupNotificationReducer,
  resumes: fromResumes.resumesReducer
};
