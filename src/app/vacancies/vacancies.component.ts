import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Vacancy } from './vacancy.model';
import { VacanciesService } from './vacancies.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  vacanciesSearchForm: FormGroup;
  vacancies: Vacancy[];
  subscription: Subscription;
  companyId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private vacanciesService: VacanciesService) { }

  ngOnInit() {
    this.vacanciesSearchForm = new FormGroup({
      'query': new FormControl(null)
    });
    this.vacanciesSearchForm.get('query').valueChanges.subscribe(
      data => {
        this.searchVacancies(data);
      }
    );
    this.activatedRoute.params.subscribe((params: Params) => {
        this.companyId = params['companyId'];
        this.vacanciesService.loadList(this.companyId);
    });

    this.subscription = this.store.select('vacancies').subscribe(
      data => {
        if (data.list.length > 0) {
          this.vacancies = data.list;
        }
      }
    );
  }

  searchVacancies(query: string) {
    this.vacanciesService.searchVacancies(this.companyId, query);
  }

}
