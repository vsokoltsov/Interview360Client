import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { Interview } from './interview.model';
import { Vacancy } from '../vacancies/vacancy.model';
import { Company } from '../companies/company.model';
import { environment } from '../../environments/environment';
import { InterviewsService } from './interviews.service';
import { ApiService } from '../shared/api.service';
import * as fromApp from '../store/app.reducers';

const response = {
  id: 1,
  vacancy: {
    id: 1
  },
  company: {
    id: 2
  }
};
const errors = {
  errors: {
    title: ["Can't be blank"]
  }
};

const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const interview = new Interview(1, vacancy.id, company.id, new Date())

describe('InterviewsService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let interviewsService: InterviewsService;
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        InterviewsService,
        ApiService,
        CookieService
      ]
    });

    interviewsService = TestBed.get(InterviewsService);
    store = TestBed.get(Store);
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('loadList(): success response', () => {
    store.select('vacancies').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    interviewsService.loadList(company.id);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/interviews/`);
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

    interviewsService.receiveInterview(company.id, vacancy.id);
    let result = httpMock.expectOne(
      `${environment.baseUrl}/companies/${company.id}/interviews/${vacancy.id}/`
    );
    result.flush(response);
    httpMock.verify();
  });
});
