import { Action } from '@ngrx/store';

import { User } from '../../auth/user.model';

export const EMPLOYEES_LOADED = 'EMPLOYEES_LOADED';

export class EmployeesLoaded implements Action {
  readonly type = EMPLOYEES_LOADED;

  constructor(public payload: User[]) {}
}

export type EmployeesActions =
EmployeesLoaded;
