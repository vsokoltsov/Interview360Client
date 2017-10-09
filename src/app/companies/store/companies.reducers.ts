import { Company } from '../company.model';
import * as CompaniesActions from './companies.actions';

export interface State {
  list: Company[],
  detail: Company,
  companyFormErrors: {},
  updateErrors: {},
  companyDeleted: boolean
};

const initialState: State = {
  list: [],
  detail: null,
  companyFormErrors: null,
  updateErrors: null,
  companyDeleted: false
};

export function companiesReducer(state = initialState, action: CompaniesActions.CompaniesActions) {
  switch (action.type) {
    case CompaniesActions.COMPANIES_LOADED:
      return {
        ...state,
        list: action.payload
      };
    case CompaniesActions.COMPANY_LOADED:
      return {
        ...state,
        detail: action.payload
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
    case CompaniesActions.LEAVE_DETAIL_PAGE:
      return {
        ...state,
        detail: null
      };
    case CompaniesActions.SUCCESS_UPDATE:
      const company = state.list.find(item => item.id == action.payload.id);
      const index = state.list.findIndex(item => item.id == action.payload.id);
      const updatedCompany = {
        ...company,
        ...action.payload
      };
      const companies = [...state.list];
      companies[index] = updatedCompany;
      return {
        ...state,
        list: companies,
        detail: action.payload,
        updateErrors: action.payload
      };
    case CompaniesActions.FAILED_UPDATE:
      return {
        ...state,
        updateErrors: action.payload
      };
    case CompaniesActions.DELETE_COMPANY:
      const deleteIndex = state.list.findIndex(item => item.id == action.payload.id);
      const oldCompanies = [...state.list];

      oldCompanies.splice(deleteIndex, 1);
      return {
        ...state,
        list: oldCompanies,
        companyDeleted: true
      };
    case CompaniesActions.DISABLE_COMPANY_DELETED:
      return {
        ...state,
        companyDeleted: false
      };
    default:
      return state;
  }
}
