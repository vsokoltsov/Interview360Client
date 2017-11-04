import { User } from '../../auth/user.model';
import * as EmployeesActions from './employees.actions';

export interface State {
  list: User[]
};

export const initialState: State = {
  list: []
};

export function employeesReducer(
  state=initialState, action: EmployeesActions.EmployeesActions) {
  switch(action.type) {
    case EmployeesActions.EMPLOYEES_LOADED:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}
