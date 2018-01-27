import { Action } from '@ngrx/store';

import { Resume } from '../resume.model';

export const RESUMES_LIST = 'RESUMES_LIST';
export const SUCCESS_RESUME_CREATED = 'SUCCESS_RESUME_CREATED';
export const FAILED_RESUME_CREATED = 'FAILED_RESUME_CREATED';
export const SAVE_FORM = 'SAVE_FORM';
export const RECEIVE_RESUME = 'RECEIVE_RESUME';

export class SuccessResumeCreated implements Action {
  readonly type = SUCCESS_RESUME_CREATED;

  constructor(public payload: Resume) {}
}

export class FailedResumeCreated implements Action {
  readonly type = FAILED_RESUME_CREATED;

  constructor(public payload: {}) {}
}

export class ResumesList implements Action {
  readonly type = RESUMES_LIST;

  constructor(public payload: Resume[]) {}
}

export class ReceiveResume implements Action {
  readonly type = RECEIVE_RESUME;

  constructor(public payload: Resume) {  }
}

export class SaveForm implements Action {
  readonly type = SAVE_FORM;

  constructor(public payload: {}) {}
}

export type ResumesActions = SuccessResumeCreated |
FailedResumeCreated |
ResumesList |
ReceiveResume |
SaveForm;
