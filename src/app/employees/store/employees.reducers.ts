import { User } from '../../auth/user.model';
import * as EmployeesActions from './employees.actions';

export interface State {
  list: User[],
  formErrors: {}
};

export const initialState: State = {
  list: [],
  formErrors: null
};

export function employeesReducer(
  state=initialState, action: EmployeesActions.EmployeesActions) {
  switch(action.type) {
    case EmployeesActions.EMPLOYEES_LOADED:
      return {
        ...state,
        list: action.payload
      };
    case EmployeesActions.SUCCESS_EMPLOYEE_CREATED:
      return {
        ...state,
        list: [...action.payload, ...state.list]
      };
    case EmployeesActions.FAILED_EMPLOYEE_CREATED:
      return {
        ...state,
        formErrors: action.payload
      };
    default:
      return state;
  }
}
