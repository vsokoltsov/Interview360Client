import { User } from '../../auth/user.model';
import * as EmployeesActions from './employees.actions';

export interface State {
  list: User[],
  detail: User,
  formErrors: {}
};

export const initialState: State = {
  list: [],
  detail: null,
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
    case EmployeesActions.EMPLOYEE_LOADED:
      return {
        ...state,
        detail: action.payload
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
    case EmployeesActions.SUCCESS_EMPLOYEE_UPDATED:
      const employee = state.list.find(item => item.id == action.payload.id);
      const index = state.list.findIndex(item => item.id == action.payload.id);
      const updatedEmployeeParams = {
        ...employee,
        ...action.payload
      };
      const updatedEmployee = Object.assign(new User(), updatedEmployeeParams);
      const employees = [...state.list];
      employees[index] = <User>updatedEmployee;
      return {
        ...state,
        list: employees,
        detail: action.payload,
        formErrors: null
      };
    case EmployeesActions.FAILED_EMPLOYEE_UPDATED:
      return {
        ...state,
        formErrors: action.payload
      };
    default:
      return state;
  }
}
