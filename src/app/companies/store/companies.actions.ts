import { Action } from '@ngrx/store';

import { Company } from '../company.model';

export const COMPANIES_LOADED = 'COMPANIES_LOADED';

export class CompaniesLoaded implements Action {
  readonly type = COMPANIES_LOADED;

  constructor(public payload: Company[]) {}
}

export type CompaniesActions = CompaniesLoaded;
