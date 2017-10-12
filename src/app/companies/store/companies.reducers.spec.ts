import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Company } from '../company.model';
import { companiesReducer, initialState } from './companies.reducers';
import * as CompaniesActions from './companies.actions';
import * as fromApp from '../../store/app.reducers';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');


describe('CompaniesReducers', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('runs COMPANIES_LOADED callback', () => {
    expect(
      companiesReducer(initialState, {
        type: CompaniesActions.COMPANIES_LOADED, payload: [company]
      })
    ).toEqual({ ...initialState, list: [company] });
  });
});
