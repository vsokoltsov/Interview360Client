import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../../company.model';
import { Vacancy } from '../../../vacancies/vacancy.model';
import * as fromApp from '../../../store/app.reducers';
import * as CompanyActions from '../../store/companies.actions';

@Component({
  selector: 'app-vacancies-tab',
  templateUrl: './vacancies-tab.component.html',
  styleUrls: ['./vacancies-tab.component.scss']
})
export class VacanciesTabComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  company: Company;
  vacancies: Vacancy[];
  companyId: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('companies').subscribe(
      data => {
        if (data.detail) {
          // console.log(data.detail);
          this.company = data.detail;
          this.companyId = this.company.id;
          this.vacancies = data.detail.vacancies;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
