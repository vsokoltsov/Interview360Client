import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Company } from './company.model';
import { User } from '../auth/user.model';
import { ApiService } from '../shared/api.service';
import * as fromApp from '../store/app.reducers';
import * as CompaniesActions from './store/companies.actions';

@Injectable()
export class CompaniesService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>) {}

  loadList() {
    this.apiService.get('/companies/').subscribe(
      response => {
        this.store.dispatch(new CompaniesActions.CompaniesLoaded(response.body));
      }
    )
  }

  receiveCompany(id: number) {
    this.apiService.get(`/companies/${id}/`)
    .subscribe(
      response => {
        this.store.dispatch(new CompaniesActions.CompanyLoaded(response.body));
      }
    )
  }

  createCompany(params: {}) {
    this.apiService.post('/companies/', params).subscribe(
      response => {
        this.store.dispatch(new CompaniesActions.SuccessCompanyCreated(response.body));
      },
      failed => {
        this.store.dispatch(new CompaniesActions.FailedCompanyCreated(failed.error.errors));
      }
    );
  }

  updateCompany(id:number, params: {}) {
    this.apiService.put(`/companies/${id}/`, params).subscribe(
      response => {
        this.store.dispatch(new CompaniesActions.SuccessUpdate(response.body.company));
      },
      failed => {
        this.store.dispatch(new CompaniesActions.FailedUpdate(failed.error.errors));
      }
    );
  }

  deleteCompany(id: number, company: Company) {
    this.apiService.destroy(`/companies/${id}/`).subscribe(
      response => {
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
}
