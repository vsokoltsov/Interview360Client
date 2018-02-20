import { Resume } from '../resume.model';

import * as ResumesActions from './resumes.actions';
import * as WorkplacesActions from './workplaces.actions';

export interface State {
  form: any,
  list: Resume[],
  detail: Resume,
  formErrors: {},
  updated: boolean,
  filters: {}
};

export const initialState: State = {
  form: {},
  list: [],
  detail: null,
  formErrors: null,
  updated: false,
  filters: null
};

export function resumesReducer(state = initialState,
  action: ResumesActions.ResumesActions | WorkplacesActions.WorkplacesActions) {
    switch(action.type) {
      case ResumesActions.RESUMES_LIST:
        return {
          ...state,
          list: action.payload
        };
      case ResumesActions.RECEIVE_RESUME:
        return {
          ...state,
          detail: action.payload
        }
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
          form: {
            ...state.form,
            ...action.payload
          }
        };
      case ResumesActions.SUCCESS_RESUME_UPDATED:
        return {
          ...state,
          detail: action.payload,
          updated: true
        };
      case ResumesActions.FAILED_RESUME_UPDATED:
        return {
          ...state,
          formErrors: action.payload
        };
      case ResumesActions.DISABLE_UPDATE:
        return {
          ...state,
          updated: false
        };
      case ResumesActions.REMOVE_RESUME:
        return {
          ...state,
          detail: null
        };
      case ResumesActions.RECEIVE_FILTERS:
        return {
          ...state,
          filters: action.payload
        };
      default:
        return state;
    }
  }
