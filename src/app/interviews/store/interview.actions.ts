import { Action } from '@ngrx/store';

import { Interview } from '../interview.model';

export const INTERVIEWS_LOADED = 'INTERVIEWS_LOADED';
export const INTERVIEW_LOADED = 'INTERVIEW_LOADED';
export const SUCCESS_CREATED_INTERVIEW = 'SUCCESS_CREATED_INTERVIEW';
export const FAILED_CREATED_INTERVIEW = 'FAILED_CREATED_INTERVIEW';

export class InterviewsLoaded implements Action {
  readonly type = INTERVIEWS_LOADED;

  constructor(public payload: Interview[]) {}
}

export class InterviewLoaded implements Action {
  readonly type = INTERVIEW_LOADED;

  constructor(public payload: Interview) {}
}

export class SuccessCreatedInterview implements Action {
  readonly type = SUCCESS_CREATED_INTERVIEW;

  constructor(public payload: Interview) {}
}

export class FailedCreatedInterview implements Action {
  readonly type = FAILED_CREATED_INTERVIEW;

  constructor(public payload: {}) {}
}

export type InterviewsActions =
InterviewsLoaded |
InterviewLoaded |
SuccessCreatedInterview |
FailedCreatedInterview;
