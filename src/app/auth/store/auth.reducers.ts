import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import * as ProfileActions from '../../profile/store/profile.actions';

export interface State {
  token: string;
  currentUser: User;
  signInErrors: {};
  signUpErrors: {};
  restorePasswordErrors: {};
  resetPasswordErrors: {};
  inviteErrors: {};
  successSubmitInvite: boolean;
}

export const initialState: State = {
  token: null,
  currentUser: null,
  signInErrors: null,
  signUpErrors: null,
  restorePasswordErrors: null,
  resetPasswordErrors: null,
  inviteErrors: null,
  successSubmitInvite: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions)  {
  switch(action.type) {
    case AuthActions.CURRENT_USER_RECEIVED:
      return {
        ...state,
        currentUser: action.payload
      };
    case AuthActions.FAILED_SIGN_IN:
      return {
        ...state,
        signInErrors: action.payload
      };
    case AuthActions.FAILED_SIGN_UP:
      return {
        ...state,
        signUpErrors: action.payload
      };
    case AuthActions.SIGN_OUT:
      return {
        ...state,
        currentUser: null
      };
    case AuthActions.FAILED_RESTORE_PASSWORD:
      return {
        ...state,
        restorePasswordErrors: action.payload
      };
    case AuthActions.FAILED_RESET_PASSWORD:
      return {
        ...state,
        resetPasswordErrors: action.payload
      };
    case ProfileActions.SUCCESS_PROFILE_UPDATE:
      return {
        ...state,
        currentUser: action.payload
      };
    case AuthActions.SUCCESS_INVITE_SUBMIT:
      return {
        ...state,
        inviteErrors: null,
        successSubmitInvite: true
      };
    case AuthActions.FAILED_INVITE_SUBMIT:
      return {
        ...state,
        inviteErrors: action.payload,
        successSubmitInvite: false
      };
    case AuthActions.DISABLE_SUCCESS_INVITE:
      return {
        ...state,
        successSubmitInvite: false
      };
    default: return state;
  }
}
