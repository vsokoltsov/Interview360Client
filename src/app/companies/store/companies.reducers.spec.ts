import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Company } from '../company.model';
import { companiesReducer, initialState } from './companies.reducers';
import * as CompaniesActions from './companies.actions';
import * as fromApp from '../../store/app.reducers';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const updatedCompany = new Company(1, 'd', 'fd', '2017-08-19', 'a');

describe('CompaniesReducers', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('runs COMPANIES_LOADED state', () => {
    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.COMPANIES_LOADED, payload: [company]
      })
    ).toEqual({ ...initialState, list: [company] });
  });

  it('runs COMPANY_LOADED state', () => {
    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.COMPANY_LOADED, payload: company
      })
    ).toEqual({ ...initialState, detail: company });
  });

  it('runs SUCCESS_COMPANY_CREATED state', () => {
    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.SUCCESS_COMPANY_CREATED, payload: { company }
      })
    ).toEqual({ ...initialState, list: [company] });
  });

  it('runs FAILED_COMPANY_CREATED state', () => {
    const errors = { errors: { email: [] } };

    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.FAILED_COMPANY_CREATED, payload: errors
      })
    ).toEqual({ ...initialState, companyFormErrors: errors });
  });

  it('runs LEAVE_DETAIL_PAGE state', () => {
    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.LEAVE_DETAIL_PAGE
      })
    ).toEqual({ ...initialState, detail: null });
  });

  it('runs SUCCESS_UPDATE state', () => {
    initialState.list = [company];

    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.SUCCESS_UPDATE, payload: updatedCompany
      })
    ).toEqual({
      ...initialState,
      list: [updatedCompany],
      detail: updatedCompany,
      updateErrors: null
    });
  });

  it('runs FAILED_UPDATE state', () => {
    const errors = { errors: { email: [] } };
    initialState.list = [company];

    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.FAILED_UPDATE, payload: errors
      })
    ).toEqual({
      ...initialState,
      updateErrors: errors
    });
  });

  it('runs DELETE_COMPANY state', () => {
    initialState.list = [company];

    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.DELETE_COMPANY, payload: company
      })
    ).toEqual({
      ...initialState,
      list: [],
      companyDeleted: true
    });
  });

  it('runs DISABLE_COMPANY_DELETED state', () => {
    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.DISABLE_COMPANY_DELETED
      })
    ).toEqual({
      ...initialState,
      companyDeleted: false
    });
  });
});
