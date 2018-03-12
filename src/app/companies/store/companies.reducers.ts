import { Company } from '../company.model';
import { Order } from '../../shared/filters/order.model';
import { SelectItems } from '../../shared/filters/select.item.model';

import * as CompaniesActions from './companies.actions';

export interface State {
  list: Company[],
  detail: Company,
  companyFormErrors: {},
  updateErrors: {},
  companyDeleted: boolean,
  filters: { order: Order[], roles: SelectItems[] }
};

export const initialState: State = {
  list: [],
  detail: null,
  companyFormErrors: null,
  updateErrors: null,
  companyDeleted: false,
  filters: null
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
      const updatedCompanyParams = {
        ...company,
        ...action.payload
      };
      const updatedCompany = Object.assign(new Company(), updatedCompanyParams);
      const companies = [...state.list];
      companies[index] = <Company>updatedCompany;
      return {
        ...state,
        list: companies,
        detail: action.payload,
        updateErrors: null
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
    case CompaniesActions.RECEIVE_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case CompaniesActions.DISABLE_FILTERS:
      return {
        ...state,
        filters: null
      }
    default:
      return state;
  }
}
