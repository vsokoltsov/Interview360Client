import { Action } from '@ngrx/store';

import { Company } from '../company.model';

export const COMPANIES_LOADED = 'COMPANIES_LOADED';
export const COMPANY_LOADED = 'COMPANY_LOADED';
export const SUCCESS_COMPANY_CREATED = 'SUCCESS_COMPANY_CREATED';
export const FAILED_COMPANY_CREATED = 'FAILED_COMPANY_CREATED';
export const LEAVE_DETAIL_PAGE = 'LEAVE_DETAIL_PAGE';

export class CompaniesLoaded implements Action {
  readonly type = COMPANIES_LOADED;

  constructor(public payload: Company[]) {}
}

export class SuccessCompanyCreated implements Action {
  readonly type = SUCCESS_COMPANY_CREATED;

  constructor(public payload: { company: Company }) {}
}

export class FailedCompanyCreated implements Action {
  readonly type = FAILED_COMPANY_CREATED;

  constructor(public payload: {}) {}
}

export class CompanyLoaded implements Action {
  readonly type = COMPANY_LOADED;

  constructor(public payload: Company) {}
}

export class LeaveDetailPage implements Action {
  readonly type = LEAVE_DETAIL_PAGE;
}

export type CompaniesActions = CompaniesLoaded |
CompanyLoaded |
SuccessCompanyCreated |
FailedCompanyCreated |
LeaveDetailPage;
