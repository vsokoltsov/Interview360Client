import { Company } from '../company.model';
import * as CompaniesActions from './companies.actions';

export interface State {
  list: Company[]
};

const initialState: State = {
  list: []
};


export function companiesReducer(state = initialState, action: CompaniesActions.CompaniesActions) {
  switch (action.type) {
    case CompaniesActions.COMPANIES_LOADED:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}
