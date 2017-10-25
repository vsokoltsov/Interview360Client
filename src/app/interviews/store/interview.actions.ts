import { Action } from '@ngrx/store';

import { Interview } from '../interview.model';

export const INTERVIEWS_LOADED = 'INTERVIEWS_LOADED';
export const INTERVIEW_LOADED = 'INTERVIEW_LOADED';

export class InterviewsLoaded implements Action {
  readonly type = INTERVIEWS_LOADED;

  constructor(public payload: Interview[]) {}
}

export class InterviewLoaded implements Action {
  readonly type = INTERVIEW_LOADED;

  constructor(public payload: Interview) {}
}

export type InterviewsActions =
InterviewsLoaded |
InterviewLoaded;
