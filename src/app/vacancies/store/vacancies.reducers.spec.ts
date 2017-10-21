import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Vacancy } from '../vacancy.model';
import { Company } from '../../companies/company.model';
import { vacanciesReducer, initialState } from './vacancies.reducers';
import * as VacanciesActions from './vacancies.actions';
import * as fromApp from '../../store/app.reducers';

const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

describe('VacanciesReducer', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('runs VACANCIES_LOADED  state', () => {
    expect(
      vacanciesReducer(initialState, {
        type: VacanciesActions.VACANCIES_LOADED, payload: [vacancy]
      })
    ).toEqual({ ...initialState, list: [vacancy] });
  });

  it('runs VACANCY_LOADED  state', () => {
    expect(
      vacanciesReducer(initialState, {
        type: VacanciesActions.VACANCY_LOADED, payload: vacancy
      })
    ).toEqual({ ...initialState, detail: vacancy });
  });
});
