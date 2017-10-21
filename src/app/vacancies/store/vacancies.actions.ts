import { Action } from '@ngrx/store';

import { Vacancy } from '../vacancy.model';
import { Skill } from '../skill.model';

export const VACANCIES_LOADED = 'VACANCIES_LOADED';
export const VACANCY_LOADED = 'VACANCY_LOADED';
export const LEAVE_VACANCY_PAGE = 'LEAVE_VACANCY_PAGE';
export const SKILLS_LOADED = 'SKILLS_LOADED';
export const SUCCESS_CREATE_VACANCY = 'SUCCESS_CREATE_VACANCY';
export const FAILED_CREATE_VACANCY = 'FAILED_CREATE_VACANCY';

export class VacanciesLoaded implements Action {
  readonly type = VACANCIES_LOADED;

  constructor(public payload: Vacancy[]) {}
}

export class SkillsLoaded implements Action {
  readonly type = SKILLS_LOADED;

  constructor(public payload: Skill[]) {}
}

export class VacancyLoaded implements Action {
  readonly type = VACANCY_LOADED;

  constructor(public payload: Vacancy) {}
}

export class LeaveVacancyPage implements Action {
  readonly type = LEAVE_VACANCY_PAGE;
}

export class SuccessCreateVacancy implements Action {
  readonly type = SUCCESS_CREATE_VACANCY;

  constructor(public payload: Vacancy) {}
}

export class FailedCreateVacancy implements Action {
  readonly type = FAILED_CREATE_VACANCY;

  constructor(public payload: {}) {}
}

export type VacanciesActions =
VacanciesLoaded |
VacancyLoaded |
SkillsLoaded |
LeaveVacancyPage |
SuccessCreateVacancy |
FailedCreateVacancy;
