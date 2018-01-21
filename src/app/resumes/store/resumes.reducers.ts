import { Resume } from '../resume.model';

import * as ResumesActions from './resumes.actions';

export interface State {
  list: Resume[],
  detail: Resume,
  formErrors: {}
};

export const initialState: State = {
  list: [],
  detail: null,
  formErrors: null
};

export function resumesReducer(state = initialState,
  action: ResumesActions.ResumesActions) {
    switch(action.type) {
      case ResumesActions.RESUMES_LIST:
        return {
          ...state,
          list: action.payload
        };
      case ResumesActions.SUCCESS_RESUME_CREATED:
        return {
          ...state,
          detail: action.payload
        };
      case ResumesActions.FAILED_RESUME_CREATED:
        return {
          ...state,
          formErrors: action.payload
        };
      default:
        return state;
    }
  }
