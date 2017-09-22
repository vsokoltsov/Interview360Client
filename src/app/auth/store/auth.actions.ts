import { Action } from '@ngrx/store';

import { User } from '../user.model';
import * as ProfileActions from '../../profile/store/profile.actions';

export const CURRENT_USER_RECEIVED = 'CURRENT_USER_RECEIVED';
export const SUCCESS_RESTORE_PASSWORD = 'SUCCESS_RESTORE_PASSWORD';
export const FAILED_RESTORE_PASSWORD = 'FAILED_RESTORE_PASSWORD';
export const FAILED_SIGN_IN = 'FAILED_SIGN_IN';
export const FAILED_SIGN_UP = 'FAILED_SIGN_UP';
export const SUCCESS_RESET_PASSWORD = 'SUCCESS_RESET_PASSWORD';
export const FAILED_RESET_PASSWORD = 'FAILED_RESET_PASSWORD';
export const SIGN_OUT = 'SIGN_OUT';

export class CurrentUserReceived implements Action {
  readonly type = CURRENT_USER_RECEIVED;

  constructor(public payload: User) {}
}

export class FailedSignIn implements Action {
  readonly type = FAILED_SIGN_IN;

  constructor(public payload: { }) {}
}

export class FailedSignUp implements Action {
  readonly type = FAILED_SIGN_UP;

  constructor(public payload: {  }) {}
}

export class SuccessRestorePassword implements Action {
  readonly type = SUCCESS_RESTORE_PASSWORD;
}

export class FailedRestorePassword implements Action {
  readonly type = FAILED_RESTORE_PASSWORD;

  constructor(public payload: { }) {}
}

export class SuccessResetPassword implements Action {
  readonly type = SUCCESS_RESET_PASSWORD;
}

export class FailedResetPassword implements Action {
  readonly type = FAILED_RESET_PASSWORD;

  constructor(public payload: { }) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export type AuthActions =
CurrentUserReceived |
FailedSignIn |
FailedSignUp |
FailedRestorePassword |
SuccessResetPassword |
FailedResetPassword |
ProfileActions.SuccessProfileUpdate |
SignOut;
