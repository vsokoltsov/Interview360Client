import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { User } from '../../auth/user.model';
import { employeesReducer, initialState } from './employees.reducers';
import * as fromApp from '../../store/app.reducers';
import * as EmployeesActions from './employees.actions';

const user = new User(1, 'wadawd', 'bbb');
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
  })
});
