import { Action } from '@ngrx/store';

import { Workplace } from '../workplace.model';

export const SUCCESS_CREATE_WORKPLACES = 'SUCCESS_CREATE_WORKPLACES';
export const FAILED_CREATE_WORKPLACES = 'FAILED_CREATE_WORKPLACES';

export class SuccessCreateWorkplaces implements Action {
  readonly type = SUCCESS_CREATE_WORKPLACES;

  constructor(public payload: Workplace[]) {}
}

export class FailedCreateWorkplaces implements Action {
  readonly type = FAILED_CREATE_WORKPLACES;

  constructor(public payload: {}) {}
}

export type WorkplacesActions = SuccessCreateWorkplaces |
FailedCreateWorkplaces;
