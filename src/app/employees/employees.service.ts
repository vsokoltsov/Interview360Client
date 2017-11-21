import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';


import { User } from '../auth/user.model';
import { ApiService } from '../shared/api.service';

import * as fromApp from '../store/app.reducers';
import * as EmployeesActions from './store/employees.actions';

@Injectable()
export class EmployeesService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>) {}

  loadEmployees(companyId: number) {
    this.apiService.get(`/companies/${companyId}/employees/`).subscribe(
      response => {
        this.store.dispatch(new EmployeesActions.EmployeesLoaded(response.body.employees));
      }
    )
  }

  receiveEmployee(companyId: number, employeeId: number) {
    this.apiService.get(`/companies/${companyId}/employees/${employeeId}/`).subscribe(
      response => {

        this.store.dispatch(new EmployeesActions.ReceiveEmployee(response.body));
      }
    )
  }

  searchEmployees(companyId: number, query: string) {
    const params = new HttpParams().set('q', query);
    this.apiService.get(`/companies/${companyId}/employees/search/`, params).subscribe(
      (response: HttpResponse<{users: User[]}>) => {
        this.store.dispatch(new EmployeesActions.EmployeesLoaded(response.body.users));
      }
    )
  }

  createEmployee(companyId: number, params: {}) {
    this.apiService.post(`/companies/${companyId}/employees/`, params).subscribe(
      response => {
        this.store.dispatch(new EmployeesActions.SuccessEmployeeCreated(response.body.employees));
      },
      errors => {
        this.store.dispatch(new EmployeesActions.FailedEmployeeCreated(errors.body.errors));
      }
    )
  }

  updateEmployee(companyId: number, employeeId: number, params: {}) {
    this.apiService.put(`/companies/${companyId}/employees/${employeeId}/`, params).subscribe(
      response => {
        this.store.dispatch(new EmployeesActions.SuccessEmployeeUpdated(response.body.employees));
      },
      errors => {
        this.store.dispatch(new EmployeesActions.FailedEmployeeUpdated(errors.body.errors));
      }
    )
  }
}
