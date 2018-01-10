import { Action } from '@ngrx/store';

import { Resume } from '../resume.model';

export const SUCCESS_RESUME_CREATED = 'SUCCESS_RESUME_CREATED';
export const FAILED_RESUME_CREATED = 'FAILED_RESUME_CREATED';

export class SuccessResumeCreated implements Action {
  readonly type = SUCCESS_RESUME_CREATED;

  constructor(public payload: Resume) {}
}

export class FailedResumeCreated implements Action {
  readonly type = FAILED_RESUME_CREATED;

  constructor(public payload: {}) {}
}

export type ResumesActions = SuccessResumeCreated |
FailedResumeCreated;
