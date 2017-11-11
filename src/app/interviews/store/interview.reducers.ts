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
        detail: (<Interview>action.payload)
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
    case InterviewActions.SUCCESS_UPDATED_INTERVIEW:
      const interview = state.list.find(item => item.id == action.payload.id);
      const index = state.list.findIndex(item => item.id == action.payload.id);
      const updatedInterviewParams = {
        ...interview,
        ...action.payload
      };
      const updatedInterview = Object.assign(new Interview(), updatedInterviewParams);
      const interviews = [...state.list];
      interviews[index] = updatedInterview;
      return {
        ...state,
        list: interviews,
        detail: action.payload,
        formErrors: null
      };
    case InterviewActions.FAILED_UPDATED_INTERVIEW:
    return {
      ...state,
      updateErrors: action.payload
    };
    default:
      return state;
  }
}
