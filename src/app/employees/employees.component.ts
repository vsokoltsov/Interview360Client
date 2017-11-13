import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User }  from '../auth/user.model';
import { EmployeesService } from './employees.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employeesSearchForm: FormGroup;
  employees: User[];
  subscription: Subscription;
  companyId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private employeesService: EmployeesService) { }

  ngOnInit() {
    this.subscription = this.store.select('employees').subscribe(
      data => {
        if (data.list) {
          console.log(data.list);
          this.employees = data.list;
        }
      }
    );
    this.activatedRoute.params.subscribe((params: Params) => {
      this.companyId = params['companyId'];
      this.employeesService.loadEmployees(this.companyId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchSubmit() { }
}
