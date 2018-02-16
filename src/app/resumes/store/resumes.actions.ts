import { Action } from '@ngrx/store';

import { Resume } from '../resume.model';

export const RESUMES_LIST = 'RESUMES_LIST';
export const SUCCESS_RESUME_CREATED = 'SUCCESS_RESUME_CREATED';
export const FAILED_RESUME_CREATED = 'FAILED_RESUME_CREATED';
export const SAVE_FORM = 'SAVE_FORM';
export const RECEIVE_RESUME = 'RECEIVE_RESUME';
export const SUCCESS_RESUME_UPDATED = 'SUCCESS_RESUME_UPDATED';
export const FAILED_RESUME_UPDATED = 'FAILED_RESUME_UPDATED';
export const DISABLE_UPDATE = 'DISABLE_UPDATE';
export const REMOVE_RESUME = 'REMOVE_RESUME';

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

export class SuccessResumeUpdate implements Action {
  readonly type = SUCCESS_RESUME_UPDATED;

  constructor(public payload: Resume) {}
}

export class FailedResumeUpdate implements Action {
  readonly type = FAILED_RESUME_UPDATED;

  constructor(public payload: {}) {}
}

export class DisableResumeUpdated implements Action {
  readonly type = DISABLE_UPDATE;
}

export class RemoveResume implements Action {
  readonly type = REMOVE_RESUME;
}

export type ResumesActions = SuccessResumeCreated |
FailedResumeCreated |
ResumesList |
ReceiveResume |
SaveForm |
SuccessResumeUpdate |
FailedResumeUpdate |
DisableResumeUpdated |
RemoveResume;
