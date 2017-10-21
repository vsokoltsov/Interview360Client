import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../../companies/company.model';
import { Vacancy } from '../vacancy.model';
import { VacanciesService } from '../vacancies.service';
import * as fromApp from '../../store/app.reducers';
import * as VacanciesActions from '../store/vacancies.actions';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.scss']
})
export class VacancyDetailComponent implements OnInit, OnDestroy {
  company: Company;
  vacancy: Vacancy;
  vacancyId: number;
  companyId: number;
  subscription: Subscription;

  constructor(
    private vacanciesService: VacanciesService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadVacancy();
    });
    this.subscription = this.store.select('vacancies').subscribe(
      data => {
        if (data.detail) {
          this.vacancy = data.detail;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new VacanciesActions.LeaveVacancyPage());
  }

  private loadVacancy() {
    const params = this.activatedRoute.snapshot;
    const parentParans = params.parent.params;
    this.companyId = parentParans['companyId'];
    this.vacancyId = params.params['id'];
    this.vacanciesService.receiveVacancy(this.companyId, this.vacancyId);
  }

}
