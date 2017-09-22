import { Action } from '@ngrx/store';

import { User } from '../../auth/user.model';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const SUCCESS_PROFILE_UPDATE = 'SUCCESS_PROFILE_UPDATE';
export const FAILED_PROFILE_UPDATE = 'FAILED_PROFILE_UPDATE';
export const SUCCESS_PASSWORD_CHANGE = 'SUCCESS_PASSWORD_CHANGE';
export const FAILED_PASSWORD_CHANGE = 'FAILED_PASSWORD_CHANGE';

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

export class SuccessPasswordChange implements Action {
  readonly type = SUCCESS_PASSWORD_CHANGE;

  constructor(public payload: { }) {}
}

export class FailedPasswordChange implements Action {
  readonly type = FAILED_PASSWORD_CHANGE;

  constructor(public payload: { }) {}
}

export type ProfileActions =
ReceiveProfile |
SuccessProfileUpdate |
FailedProfileUpdate |
SuccessPasswordChange |
FailedPasswordChange;
