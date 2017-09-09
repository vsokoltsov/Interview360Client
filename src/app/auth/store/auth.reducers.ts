import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  currentUser: User;
  signInErrors: {};
}

const initialState: State = {
  token: null,
  currentUser: null,
  signInErrors: {}
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch(action.type) {
    case AuthActions.SUCCESS_SIGN_IN:
      console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload
      };
    case AuthActions.FAILED_SIGN_IN:
      return {
        ...state,
        signInErrors: action.payload
      };
    default: return state;
  }
}
