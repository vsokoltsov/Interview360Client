import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../../companies/company.model';
import { Vacancy } from '../../vacancies/vacancy.model';
import { Interview } from '../interview.model';
import { InterviewsService } from '../interviews.service';
import * as fromApp from '../../store/app.reducers';
import * as InterviewsActions from '../store/interview.actions';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.scss']
})
export class InterviewDetailComponent implements OnInit, OnDestroy {
  company: Company;
  interview: Interview;
  companyId: number;
  interviewId: number;
  subscription: Subscription;

  constructor(
    private interviewsService: InterviewsService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadInterview();
    });
    this.subscription = this.store.select('interviews').subscribe(
      data => {
        if (data.detail) {
          this.interview = data.detail;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadInterview() {
    const params = this.activatedRoute.snapshot;
    const parentParans = params.parent.params;
    this.companyId = parentParans['companyId'];
    this.interviewId = params.params['id'];
    this.interviewsService.receiveInterview(this.companyId, this.interviewId);
  }

}
