import { Action } from '@ngrx/store';

import { Vacancy } from '../vacancy.model';

export const VACANCIES_LOADED = 'VACANCIES_LOADED';

export class VacanciesLoaded implements Action {
  readonly type = VACANCIES_LOADED;

  constructor(public payload: Vacancy[]) {}
}

export type VacanciesActions = VacanciesLoaded;
