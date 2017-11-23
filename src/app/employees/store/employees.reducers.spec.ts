import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { User } from '../../auth/user.model';
import { employeesReducer, initialState } from './employees.reducers';
import * as fromApp from '../../store/app.reducers';
import * as EmployeesActions from './employees.actions';

const user = new User(1, 'wadawd', 'bbb');
const errors = { email: ['Can\'t be blank'] };
describe('EmployeesReducers', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('runs EMPLOYEES_LOADED state', () => {
    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.EMPLOYEES_LOADED, payload: [user]
      })
    ).toEqual({ ...initialState, list: [user] });
  });

  it('runs EMPLOYEE_LOADED state', () => {
    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.EMPLOYEE_LOADED, payload: user
      })
    ).toEqual({ ...initialState, detail: user });
  });

  it('runs SUCCESS_EMPLOYEE_CREATED state', () => {
    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.SUCCESS_EMPLOYEE_CREATED, payload: [user]
      })
    ).toEqual({ ...initialState, list: [user] });
  });

  it('runs FAILED_EMPLOYEE_CREATED state', () => {
    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.FAILED_EMPLOYEE_CREATED, payload: errors
      })
    ).toEqual({ ...initialState, formErrors: errors });
  });

  it ('runs SUCCESS_EMPLOYEE_UPDATED state', () => {
    initialState.list = [user];
    const newUser = new User(1, 'b', 'c');

    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.SUCCESS_EMPLOYEE_UPDATED, payload: newUser
      })
    ).toEqual({
      ...initialState,
      list: [newUser],
      detail: newUser,
      formErrors: null
    });
  });

  it ('runs FAILED_EMPLOYEE_UPDATED state', () => {
    initialState.list = [user];
    const newUser = new User(1, 'b', 'c');

    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.FAILED_EMPLOYEE_UPDATED, payload: errors
      })
    ).toEqual({ ...initialState, formErrors: errors });
  });

  it('runs DELETE_EMPLOYEE state', () => {
    initialState.list = [user];

    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.DELETE_EMPLOYEE, payload: user
      })
    ).toEqual({
      ...initialState,
      list: [],
      employeeDeleted: true
    });
  });

  it('runs DISABLE_DELETE_EMPLOYEE state', () => {
    initialState.employeeDeleted = true;

    expect(
      employeesReducer(initialState, {
        type: EmployeesActions.DISABLE_DELETE_EMPLOYEE
      })
    ).toEqual({ ...initialState, employeeDeleted: false });
  });
});
