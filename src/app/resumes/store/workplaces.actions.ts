import { Action } from '@ngrx/store';

import { Workplace } from '../workplace.model';

export const SUCCESS_CREATE_WORKPLACES = 'SUCCESS_CREATE_WORKPLACES';
export const FAILED_CREATE_WORKPLACES = 'FAILED_CREATE_WORKPLACES';
export const ADD_WORKPLACE = 'ADD_WORKPLACE';
export const REMOVE_WORKPLACE = 'REMOVE_WORKPLACE';

export class SuccessCreateWorkplaces implements Action {
  readonly type = SUCCESS_CREATE_WORKPLACES;

  constructor(public payload: Workplace[]) {}
}

export class FailedCreateWorkplaces implements Action {
  readonly type = FAILED_CREATE_WORKPLACES;

  constructor(public payload: {}) {}
}

export class AddWorkplace implements Action {
  readonly type = ADD_WORKPLACE;

  constructor(public payload: Workplace[]) {}
}

export class RemoveWorkplace implements Action {
  readonly type = REMOVE_WORKPLACE;

  constructor(public payload: Workplace) {}
}

export type WorkplacesActions = SuccessCreateWorkplaces |
FailedCreateWorkplaces |
AddWorkplace |
RemoveWorkplace;
