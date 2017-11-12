import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { User } from '../auth/user.model';
import { Vacancy } from '../vacancies/vacancy.model';
import { Company } from '../companies/company.model';
import { environment } from '../../environments/environment';
import { EmployeesService } from './employees.service';
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
const responseList = [
  { id: 1 },
  { id: 2 }
];
const errors = {
  errors: {
    title: ["Can't be blank"]
  }
};
const user = new User(1, 'wadawd', 'bbb');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

describe('EmployeesService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let employeesService: EmployeesService;
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EmployeesService,
        ApiService,
        CookieService
      ]
    });

    employeesService = TestBed.get(EmployeesService);
    store = TestBed.get(Store);
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('searchEmployees(): success response', () => {
    store.select('vacancies').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    employeesService.searchEmployees(company.id, 'test');
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/search/?q=test`);
    result.flush([response]);
    httpMock.verify();
  });

});
