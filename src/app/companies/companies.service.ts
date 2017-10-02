import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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

  createCompany(params: {}) {
    this.apiService.post('/companies/', params).subscribe(
      response => {
        this.store.dispatch(new CompaniesActions.SuccessCompanyCreated(response.body));
      },
      failed => {
        this.store.dispatch(new CompaniesActions.FailedCompanyCreated(failed.error.errors));
      }
    )
  }
}
