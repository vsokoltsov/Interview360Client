import { Action } from '@ngrx/store';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FINISHED = 'REQUEST_FINISHED';

export class RequestStarted implements Action {
  readonly type = REQUEST_STARTED;
}

export class RequestFinished implements Action {
  readonly type = REQUEST_FINISHED;
}

export type LoaderActions = RequestStarted |
RequestFinished;
