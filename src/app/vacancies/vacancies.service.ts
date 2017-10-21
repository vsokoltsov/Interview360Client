import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ApiService } from '../shared/api.service';
import { Vacancy } from './vacancy.model';
import * as fromApp from '../store/app.reducers';
import * as VacanciesActions from './store/vacancies.actions';

@Injectable()
export class VacanciesService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>) {}

  loadList(companyId: number) {
    this.apiService.get(`/companies/${companyId}/vacancies/`).subscribe(
      response => {
        this.store.dispatch(new VacanciesActions.VacanciesLoaded(response.body));
      }
    );
  }

  receiveVacancy(companyId: number, vacancyId: number) {

  }
}
