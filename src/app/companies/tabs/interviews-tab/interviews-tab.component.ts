import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../../company.model';
import { Interview } from '../../../interviews/interview.model';
import * as fromApp from '../../../store/app.reducers';
import * as CompanyActions from '../../store/companies.actions';

@Component({
  selector: 'app-interviews-tab',
  templateUrl: './interviews-tab.component.html',
  styleUrls: ['./interviews-tab.component.scss']
})
export class InterviewsTabComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  company: Company;
  interviews: Interview[];
  companyId: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('companies').subscribe(
      data => {
        if (data.detail) {
          this.company = data.detail;
          this.companyId = this.company.id;
          this.interviews = data.detail.interviews;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
