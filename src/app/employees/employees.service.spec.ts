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
    store.select('employees').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    employeesService.searchEmployees(company.id, 'test');
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/search/?q=test`);
    result.flush({ users: [response] });
    httpMock.verify();
  });

  it('loadEmployees(): success response', () => {
    store.select('employees').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    employeesService.loadEmployees(company.id);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/`);
    result.flush({ employees: [response]});
    httpMock.verify();
  });

  it('loadEmployee(): success response', () => {
    store.select('employees').subscribe(
      data => {
        if (data.detail) {
          expect(data.detail.id).toEqual(response.id);
        }
    });

    employeesService.receiveEmployee(company.id, user.id);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/${user.id}/`);
    result.flush(response);
    httpMock.verify();
  });

  it('createEmployee(): success response', () => {
    store.select('employees').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    employeesService.createEmployee(company.id, [response]);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/`);
    result.flush({employees: [response]});
    httpMock.verify();
  });

  it('createEmployee(): failed response', () => {
    store.select('employees').subscribe(
      data => {
        if (data.formErrors) {
          expect(data.formErrors).toEqual(errors.errors);
        }
    });

    employeesService.createEmployee(company.id, [response]);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/`);
    result.flush(errors, { status: 400, statusText: 'BAD_REQUEST' });
    httpMock.verify();
  });

  it('updateEmployee(): success response', () => {
    store.select('employees').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    employeesService.updateEmployee(company.id, user.id, response);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/${user.id}/`);
    result.flush({employee: response});
    httpMock.verify();
  });

  it('updateEmployee(): failed response', () => {
    store.select('employees').subscribe(
      data => {
        if (data.formErrors) {
          expect(data.formErrors).toEqual(errors.errors);
        }
    });

    employeesService.updateEmployee(company.id, user.id, response);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/${user.id}/`);
    result.flush(errors, { status: 400, statusText: 'BAD_REQUEST' });
    httpMock.verify();
  });

  it('deleteEmployee(): success response', () => {
    store.select('employees').subscribe(
      data => {
        if (data.employeeDeleted) {
          expect(data.employeeDeleted).toEqual(true);
        }
    });

    employeesService.deleteEmployee(company.id, user.id, user);
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/employees/${user.id}/`);
    result.flush(response);
    httpMock.verify();
  });
});
