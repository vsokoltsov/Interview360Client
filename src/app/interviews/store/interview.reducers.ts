import { Interview } from '../interview.model';
import * as InterviewActions from './interview.actions';

export interface State {
  list: Interview[],
  detail: Interview,
  formErrors: {}
};

export const initialState: State = {
  list: [],
  detail: null,
  formErrors: null
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
    case InterviewActions.SUCCESS_CREATED_INTERVIEW:
      return {
        ...state,
        list: [...state.list, action.payload],
        formErrors: null
      };
    case InterviewActions.FAILED_CREATED_INTERVIEW:
      return {
        ...state,
        formErrors: action.payload
      };
    default:
      return state;
  }
}
