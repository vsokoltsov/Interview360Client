import { Action } from '@ngrx/store';

import { Vacancy } from '../vacancy.model';

export const VACANCIES_LOADED = 'VACANCIES_LOADED';
export const VACANCY_LOADED = 'VACANCY_LOADED';
export const LEAVE_VACANCY_PAGE = 'LEAVE_VACANCY_PAGE';

export class VacanciesLoaded implements Action {
  readonly type = VACANCIES_LOADED;

  constructor(public payload: Vacancy[]) {}
}

export class VacancyLoaded implements Action {
  readonly type = VACANCY_LOADED;

  constructor(public payload: Vacancy) {}
}

export class LeaveVacancyPage implements Action {
  readonly type = LEAVE_VACANCY_PAGE;
}

export type VacanciesActions =
VacanciesLoaded |
VacancyLoaded |
LeaveVacancyPage;
