import { Action } from '@ngrx/store';

import { User } from '../user.model';

export const SUCCESS_SIGN_IN = 'SUCCESS_SIGN_IN';
export const FAILED_SIGN_IN = 'FAILED_SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export class SuccessSignIn implements Action {
  readonly type = SUCCESS_SIGN_IN;

  constructor(public payload: User) {}
}

export class FailedSignIn implements Action {
  readonly type = FAILED_SIGN_IN;

  constructor(public payload: { errors: {} }) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export type AuthActions =
SuccessSignIn |
FailedSignIn |
SignOut;
