import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
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

  searchVacancies(companyId: number, query: string) {
    const params = new HttpParams().set('q', query);
    this.apiService.get(`/companies/${companyId}/vacancies/search/`, params).subscribe(
      response => {
        this.store.dispatch(new VacanciesActions.VacanciesLoaded(response.body.vacancies));
      }
    )
  }

  loadSkills() {
    this.apiService.get(`/skills/`).subscribe(
      response => {
        this.store.dispatch(new VacanciesActions.SkillsLoaded(response.body));
      }
    );
  }

  receiveVacancy(companyId: number, vacancyId: number) {
    this.apiService.get(`/companies/${companyId}/vacancies/${vacancyId}/`).subscribe(
      response => {
        this.store.dispatch(new VacanciesActions.VacancyLoaded(response.body));
      }
    );
  }

  createVacancy(companyId: number, params: {}) {
    this.apiService.post(`/companies/${companyId}/vacancies/`, params).subscribe(
      response => {
        this.store.dispatch(new VacanciesActions.SuccessCreateVacancy(response.body.vacancy));
      },
      failed => {
        this.store.dispatch(new VacanciesActions.FailedCreateVacancy(failed.error.errors));
      }
    );
  }

  updateVacancy(companyId: number, vacancyId: number, params: {}) {
    this.apiService.put(`/companies/${companyId}/vacancies/${vacancyId}/`, params).subscribe(
      response => {
        this.store.dispatch(new VacanciesActions.SuccessVacancyUpdate(response.body.vacancy));
      },
      failed => {
        this.store.dispatch(new VacanciesActions.FailedVacancyUpdate(failed.error.errors));
      }
    );
  }

  deleteVacancy(companyId: number, vacancyId: number, vacancy: Vacancy) {
    this.apiService.destroy(`/companies/${companyId}/vacancies/${vacancyId}/`).subscribe(
      response => {
        this.store.dispatch(new VacanciesActions.DeleteVacancy(vacancy));
      }
    );
  }
}
