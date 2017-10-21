import { Vacancy } from '../vacancy.model';
import * as VacanciesActions from './vacancies.actions';

export interface State {
  list: Vacancy[],
  detail: Vacancy
};

export const initialState: State = {
  list: [],
  detail: null
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
      default:
        return state;
    }
}
