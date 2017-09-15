import { Action } from '@ngrx/store';

import { User } from '../user.model';

export const CURRENT_USER_RECEIVED = 'CURRENT_USER_RECEIVED';
export const FAILED_SIGN_IN = 'FAILED_SIGN_IN';
export const FAILED_SIGN_UP = 'FAILED_SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

export class CurrentUserReceived implements Action {
  readonly type = CURRENT_USER_RECEIVED;

  constructor(public payload: User) {}
}

export class FailedSignIn implements Action {
  readonly type = FAILED_SIGN_IN;

  constructor(public payload: { errors: {} }) {}
}


export class FailedSignUp implements Action {
  readonly type = FAILED_SIGN_UP;

  constructor(public payload: { errors: {} }) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export type AuthActions =
CurrentUserReceived |
FailedSignIn |
FailedSignUp |
SignOut;
