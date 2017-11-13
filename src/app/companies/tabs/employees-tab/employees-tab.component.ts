import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User } from '../../../auth/user.model';
import { Company } from '../../company.model';
import * as fromApp from '../../../store/app.reducers';
import * as CompanyActions from '../../store/companies.actions';

@Component({
  selector: 'app-employees-tab',
  templateUrl: './employees-tab.component.html',
  styleUrls: ['./employees-tab.component.scss']
})
export class EmployeesTabComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  company: Company;
  companyId: number;
  employees: User[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('companies').subscribe(
      data => {
        if (data.detail) {
          this.company = data.detail;
          this.companyId = this.company.id;
          this.employees = data.detail.employees;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
