import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Vacancy } from '../vacancy.model';
import { Company } from '../../companies/company.model';
import { Skill } from '../skill.model';
import { vacanciesReducer, initialState } from './vacancies.reducers';
import * as VacanciesActions from './vacancies.actions';
import * as fromApp from '../../store/app.reducers';

const vacancy = new Vacancy(1, 'b', 'c');
const updatedVacancy = new Vacancy(1, 'B', 'C');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const skill = new Skill(1);

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

  it('runs SKILLS_LOADED state', () => {
    expect(
      vacanciesReducer(initialState, {
        type: VacanciesActions.SKILLS_LOADED, payload: [skill]
      })
    ).toEqual({ ...initialState, skills: [skill] });
  });

  it('runs SUCCESS_VACANCY_UPDATE state', () => {
    initialState.list = [vacancy];

    expect(
      vacanciesReducer(initialState, {
        type: VacanciesActions.SUCCESS_VACANCY_UPDATE, payload: updatedVacancy
      })
    ).toEqual({
      ...initialState,
      list: [updatedVacancy],
      detail: updatedVacancy,
      formErrors: null
    });
  });

  it('runs FAILED_VACANCY_DELETE state', () => {
    const errors = { errors: { title: [] } };
    initialState.list = [vacancy];

    expect(
      vacanciesReducer(initialState, {
        type: VacanciesActions.FAILED_VACANCY_UPDATE, payload: errors
      })
    ).toEqual({
      ...initialState,
      formErrors: errors
    });
  });

  it('runs DELETE_VACANCY state', () => {
    initialState.list = [vacancy];

    expect(
      vacanciesReducer(initialState, {
        type: VacanciesActions.DELETE_VACANCY, payload: vacancy
      })
    ).toEqual({
      ...initialState,
      list: [],
      vacancyDeleted: true
    });
  });

  it('runs DISABLE_VACANCY_DELETE state', () => {
    expect(
      vacanciesReducer(initialState, {
        type: VacanciesActions.DISABLE_VACANCY_DELETE
      })
    ).toEqual({
      ...initialState,
      vacancyDeleted: false
    });
  });
});
