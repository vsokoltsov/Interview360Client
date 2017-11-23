import { Action } from '@ngrx/store';

import { User } from '../../auth/user.model';

export const EMPLOYEES_LOADED = 'EMPLOYEES_LOADED';
export const SUCCESS_EMPLOYEE_CREATED = 'SUCCESS_EMPLOYEE_CREATED';
export const FAILED_EMPLOYEE_CREATED = 'FAILED_EMPLOYEE_CREATED';
export const EMPLOYEE_LOADED = 'EMPLOYEE_LOADED';
export const SUCCESS_EMPLOYEE_UPDATED = 'SUCCESS_EMPLOYEE_UPDATED';
export const FAILED_EMPLOYEE_UPDATED = 'FAILED_EMPLOYEE_UPDATED';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const DISABLE_DELETE_EMPLOYEE = 'DISABLE_DELETE_EMPLOYEE';

export class EmployeesLoaded implements Action {
  readonly type = EMPLOYEES_LOADED;

  constructor(public payload: User[]) {}
}

export class ReceiveEmployee implements Action {
  readonly type = EMPLOYEE_LOADED;

  constructor(public payload: User) {}
}

export class SuccessEmployeeCreated implements Action {
  readonly type = SUCCESS_EMPLOYEE_CREATED;

  constructor(public payload: User[]) {  }
}

export class FailedEmployeeCreated implements Action {
  readonly type = FAILED_EMPLOYEE_CREATED;

  constructor(public payload: {}) { }
}

export class SuccessEmployeeUpdated implements Action {
  readonly type = SUCCESS_EMPLOYEE_UPDATED;

  constructor(public payload: User) {  }
}

export class FailedEmployeeUpdated implements Action {
  readonly type = FAILED_EMPLOYEE_UPDATED;

  constructor(public payload: {}) { }
}

export class DeleteEmployee implements Action {
  readonly type = DELETE_EMPLOYEE;

  constructor(public payload: User) { }
}

export class DisableDeleteEmployee implements Action {
  readonly type = DISABLE_DELETE_EMPLOYEE;
}

export type EmployeesActions =
EmployeesLoaded |
ReceiveEmployee |
SuccessEmployeeCreated |
FailedEmployeeCreated |
SuccessEmployeeUpdated |
FailedEmployeeUpdated |
DeleteEmployee |
DisableDeleteEmployee;
