import { Vacancy } from '../vacancy.model';
import { Skill } from '../skill.model';
import * as VacanciesActions from './vacancies.actions';

export interface State {
  list: Vacancy[],
  skills: Skill[],
  detail: Vacancy,
  formErrors: {}
};

export const initialState: State = {
  list: [],
  skills: [],
  detail: null,
  formErrors: null
};

export function vacanciesReducer(state=initialState,
        action: VacanciesActions.VacanciesActions) {
    switch(action.type) {
      case VacanciesActions.VACANCIES_LOADED:
        return {
          ...state,
          list: action.payload
        };
      case VacanciesActions.VACANCY_LOADED:
        return {
          ...state,
          detail: action.payload
        };
      case VacanciesActions.LEAVE_VACANCY_PAGE:
        return {
          ...state,
          detail: null
        };
      case VacanciesActions.SKILLS_LOADED:
        return {
          ...state,
          skills: action.payload
        };
      case VacanciesActions.SUCCESS_CREATE_VACANCY:
        return {
          ...state,
          list: [...state.list, action.payload]
        };
      case VacanciesActions.FAILED_CREATE_VACANCY:
        return {
          ...state,
          formErrors: action.payload
        };
      default:
        return state;
    }
}
