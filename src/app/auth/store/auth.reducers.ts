import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  currentUser: User;
  signInErrors: {};
  signUpErrors: {};
  restorePasswordErrors: {};
}

const initialState: State = {
  token: null,
  currentUser: null,
  signInErrors: null,
  signUpErrors: null,
  restorePasswordErrors: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
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
    default: return state;
  }
}
