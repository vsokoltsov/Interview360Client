import { Vacancy } from '../vacancy.model';
import * as VacanciesActions from './vacancies.actions';

export interface State {
  list: Vacancy[]
};

export const initialState: State = {
  list: []
};

export function vacanciesReducer(state=initialState,
        action: VacanciesActions.VacanciesActions) {
    switch(action.type) {
      case VacanciesActions.VACANCIES_LOADED:
        return {
          ...state,
          list: action.payload
        };
      default:
        return state;
    }
}
