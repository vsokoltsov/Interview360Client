import { Interview } from '../interview.model';
import * as InterviewActions from './interview.actions';

export interface State {
  list: Interview[],
  detail: Interview
};

export const initialState: State = {
  list: [],
  detail: null
};

export function interviewsReducer(state=initialState, action: InterviewActions.InterviewsActions) {
  switch(action.type) {
    case InterviewActions.INTERVIEWS_LOADED:
      return {
        ...state,
        list: action.payload
      };
    case InterviewActions.INTERVIEW_LOADED:
      return {
        ...state,
        detail: action.payload
      };
    default:
      return state;
  }
}
