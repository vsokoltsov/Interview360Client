import { Vacancy } from '../vacancy.model';
import { Skill } from '../skill.model';
import * as VacanciesActions from './vacancies.actions';

export interface State {
  list: Vacancy[],
  skills: Skill[],
  detail: Vacancy,
  formErrors: {},
  vacancyDeleted: boolean
};

export const initialState: State = {
  list: [],
  skills: [],
  detail: null,
  formErrors: null,
  vacancyDeleted: false
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
      case VacanciesActions.SUCCESS_VACANCY_UPDATE:
        const vacancy = state.list.find(item => item.id == action.payload.id);
        const index = state.list.findIndex(item => item.id == action.payload.id);
        const updatedVacancyParams = {
          ...vacancy,
          ...action.payload
        };
        const updatedVacancy = Object.assign(new Vacancy(), updatedVacancyParams);
        const vacancies = [...state.list];
        vacancies[index] = <Vacancy>updatedVacancy;
        return {
          ...state,
          list: vacancies,
          detail: action.payload,
          formErrors: null
        };
      case VacanciesActions.FAILED_VACANCY_UPDATE:
        return {
          ...state,
          formErrors: action.payload
        };
      case VacanciesActions.DELETE_VACANCY:
        const deleteIndex = state.list.findIndex(item => item.id == action.payload.id);
        const oldVacancies = [...state.list];

        oldVacancies.splice(deleteIndex, 1);
        return {
          ...state,
          list: oldVacancies,
          vacancyDeleted: true
        };
      case VacanciesActions.DISABLE_VACANCY_DELETE:
        return {
          ...state,
          vacancyDeleted: false
        };
      default:
        return state;
    }
}
