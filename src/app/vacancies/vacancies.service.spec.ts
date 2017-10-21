import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { ApiService } from '../shared/api.service';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from './vacancy.model';
import { Company } from '../companies/company.model';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducers';

const response = {
  id: 1,
  title: 'a',
  description: 'c',
  salary: 120000
};
const errors = {
  errors: {
    title: ["Can't be blank"]
  }
};
const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

describe('VacanciesService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let vacanciesService: VacanciesService;
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        VacanciesService,
        ApiService,
        CookieService
      ]
    });

    vacanciesService = TestBed.get(VacanciesService);
    store = TestBed.get(Store);
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('call get() method on apiService', () => {
    spyOn(apiService, 'get').and.callThrough();

    vacanciesService.loadList(company.id);

    expect(apiService.get).toHaveBeenCalled();
  });

  it('loadList(): success response', () => {
    store.select('vacancies').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    vacanciesService.loadList(company.id);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/vacancies/`);
    result.flush([response]);
    httpMock.verify();
  });

  it('receiveVacancy(): success response', () => {
    store.select('vacancies').subscribe(
      data => {
        if (data.detail) {
          expect(data.detail.id).toEqual(response.id);
        }
    });

    vacanciesService.receiveVacancy(company.id, vacancy.id);
    let result = httpMock.expectOne(
      `${environment.baseUrl}/companies/${company.id}/vacancies/${vacancy.id}/`
    );
    result.flush(response);
    httpMock.verify();
  });

  it('createVacancy(): success response', () => {
    store.select('vacancies').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    vacanciesService.createVacancy(company.id, response);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/vacancies/`);
    result.flush({ vacancy: response });
    httpMock.verify();
  });

  it('createVacancy(): failed response', () => {
    store.select('vacancies').subscribe(
      data => {
        if (data.formErrors) {
          expect(data.formErrors).toEqual(errors.errors);
        }
    });

    vacanciesService.createVacancy(company.id, response);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/vacancies/`);
    result.flush(errors, { status: 400, statusText: 'BAD_REQUEST' });
    httpMock.verify();
  });
});
