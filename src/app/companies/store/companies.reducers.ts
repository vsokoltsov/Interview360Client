import { Company } from '../company.model';
import * as CompaniesActions from './companies.actions';

export interface State {
  list: Company[],
  companyFormErrors: {}
};

const initialState: State = {
  list: [],
  companyFormErrors: null
};


export function companiesReducer(state = initialState, action: CompaniesActions.CompaniesActions) {
  switch (action.type) {
    case CompaniesActions.COMPANIES_LOADED:
      return {
        ...state,
        list: action.payload
      };
    case CompaniesActions.SUCCESS_COMPANY_CREATED:
      return {
        ...state,
        list: [...state.list, action.payload.company]
      };
    case CompaniesActions.FAILED_COMPANY_CREATED:
      return {
        ...state,
        companyFormErrors: action.payload
      };
    default:
      return state;
  }
}
