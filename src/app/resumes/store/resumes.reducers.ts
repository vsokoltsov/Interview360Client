import { Resume } from '../resume.model';

import * as ResumesActions from './resumes.actions';
import * as WorkplacesActions from './workplaces.actions';

export interface State {
  form: any,
  list: Resume[],
  detail: Resume,
  formErrors: {}
};

export const initialState: State = {
  form: {},
  list: [],
  detail: null,
  formErrors: null
};

export function resumesReducer(state = initialState,
  action: ResumesActions.ResumesActions | WorkplacesActions.WorkplacesActions) {
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
      case ResumesActions.SAVE_FORM:
        return {
          ...state,
          form: action.payload
        };
      case WorkplacesActions.ADD_WORKPLACE:
        return {
          ...state,
          form: {
            ...state.form,
            workplaces: action.payload
          }
        };
      default:
        return state;
    }
  }
