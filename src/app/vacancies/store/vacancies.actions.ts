import { Action } from '@ngrx/store';

import { Vacancy } from '../vacancy.model';

export const VACANCIES_LOADED = 'VACANCIES_LOADED';
export const VACANCY_LOADED = 'VACANCY_LOADED';

export class VacanciesLoaded implements Action {
  readonly type = VACANCIES_LOADED;

  constructor(public payload: Vacancy[]) {}
}

export class VacancyLoaded implements Action {
  readonly type = VACANCY_LOADED;

  constructor(public payload: Vacancy) {}
}

export type VacanciesActions =
VacanciesLoaded |
VacancyLoaded;
