import { User } from '../../auth/user.model';
import * as ProfileActions from './profile.actions';

export interface State {
  profile: User;
  profileErrors: {};
  passwordChangeErrors: {};
}

export const initialState: State = {
  profile: null,
  profileErrors: null,
  passwordChangeErrors: null
};

export function profileReducer(state = initialState, action: ProfileActions.ProfileActions) {
    switch(action.type) {
      case ProfileActions.RECEIVE_PROFILE:
        return {
          ...state,
          profile: action.payload
        };
      case ProfileActions.SUCCESS_PROFILE_UPDATE:
        return {
          ...state,
          profile: action.payload
        };
      case ProfileActions.FAILED_PROFILE_UPDATE:
        return {
          ...state,
          profileErrors: action.payload
        };
      case ProfileActions.FAILED_PASSWORD_CHANGE:
        return {
          ...state,
          passwordChangeErrors: action.payload
        };
      default:
        return state;
    }
}
