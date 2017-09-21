import { Action } from '@ngrx/store';

import { User } from '../../auth/user.model';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const SUCCESS_PROFILE_UPDATE = 'SUCCESS_PROFILE_UPDATE';
export const FAILED_PROFILE_UPDATE = 'FAILED_PROFILE_UPDATE';

export class ReceiveProfile implements Action {
  readonly type = RECEIVE_PROFILE;

  constructor(public payload: User) {}
}

export class SuccessProfileUpdate implements Action {
  readonly type = SUCCESS_PROFILE_UPDATE;

  constructor(public payload: User) {}
}

export class FailedProfileUpdate implements Action {
  readonly type = FAILED_PROFILE_UPDATE;

  constructor(public payload: { }) {}
}

export type ProfileActions =
ReceiveProfile |
SuccessProfileUpdate |
FailedProfileUpdate;
