import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  currentUser: {};
  signInErrors: {};
}

const initialState: State = {
  token: null,
  currentUser: {},
  signInErrors: {}
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch(action.type) {
    case AuthActions.SUCCESS_SIGN_IN:
      console.log(action.payload);
      return {
        ...state,
        token: action.payload
      };
    case AuthActions.FAILED_SIGN_IN:
      return {
        ...state,
        signInErrors: action.payload
      };
    default: return state;
  }
}
