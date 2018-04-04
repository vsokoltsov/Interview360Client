import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Company } from './company.model';
import { User } from '../auth/user.model';
import { ApiService } from '../shared/api.service';
import { PopupNotificationsService } from '../popup-notifications/popup-notifications.service';
import * as fromApp from '../store/app.reducers';
import * as CompaniesActions from './store/companies.actions';
import * as LoaderActions from '../shared/loader/store/loaders.actions';

@Injectable()
export class CompaniesService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>,
              private popupNotificationsService: PopupNotificationsService) {}

  loadList(params: any = null) {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.get('/companies/', params).subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new CompaniesActions.CompaniesLoaded(response.body));
      }
    );
  }

  receiveCompany(id: number) {
    this.store.dispatch(new LoaderActions.RequestStarted())
    this.apiService.get(`/companies/${id}/`)
    .subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new CompaniesActions.CompanyLoaded(response.body));
      }
    )
  }

  createCompany(params: {}) {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.post('/companies/', params).subscribe(
      response => {
        this.popupNotificationsService.info('successCompanyCreated');
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new CompaniesActions.SuccessCompanyCreated(response.body));
      },
      failed => {
        this.popupNotificationsService.alert('failedCompanyCreated');
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new CompaniesActions.FailedCompanyCreated(failed.error.errors));
      }
    );
  }

  updateCompany(id:number, params: {}) {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.put(`/companies/${id}/`, params).subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.popupNotificationsService.info('successCompanyUpdate');
        this.store.dispatch(new CompaniesActions.SuccessUpdate(response.body.company));
      },
      failed => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.popupNotificationsService.alert('failedCompanyUpdate');
        this.store.dispatch(new CompaniesActions.FailedUpdate(failed.error.errors));
      }
    );
  }

  deleteCompany(id: number, company: Company) {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.destroy(`/companies/${id}/`).subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.popupNotificationsService.info('successCompanyDelete');
        this.store.dispatch(new CompaniesActions.DeleteCompany(company));
      }
    );
  }

  searchCompanies(query: string) {
    const params = new HttpParams().set('q', query);
    this.apiService.get(`/companies/search/`, params).subscribe(
      response => {
        this.store.dispatch(new CompaniesActions.CompaniesLoaded(response.body.companies));
      }
    )
  }

  receiveFilters() {
    this.apiService.get(`/companies/filters/`).subscribe(
      response => {
        this.store.dispatch(new CompaniesActions.ReceiveFilters(response.body.filters));
      }
    )
  }

  getCities(name: string) {
    const params = new HttpParams().set('name', name);
    this.apiService.get(`/companies/filters/`, params)
  }
}
