import { Action } from '@ngrx/store';

export const SUCCESS_SIGN_IN = 'SUCCESS_SIGN_IN';
export const FAILED_SIGN_IN = 'FAILED_SIGN_IN';

export class SuccessSignIn implements Action {
  readonly type = SUCCESS_SIGN_IN;

  constructor(public payload: string) {}
}

export class FailedSignIn implements Action {
  readonly type = FAILED_SIGN_IN;

  constructor(public payload: { errors: {} }) {}
}

export type AuthActions =
SuccessSignIn |
FailedSignIn;
