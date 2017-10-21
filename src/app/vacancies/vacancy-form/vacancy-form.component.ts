import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../../companies/company.model';
import { Vacancy } from '../vacancy.model';
import { User } from '../../auth/user.model';
import { VacanciesService } from '../vacancies.service';
import * as fromApp from '../../store/app.reducers';
import * as VacanyActions from '../store/vacancies.actions';

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss']
})
export class VacancyFormComponent implements OnInit, OnDestroy {
  vacancyForm: FormGroup;
  subscription: Subscription;
  public vacancyFormErrors: Object = { };

  constructor(private store: Store<fromApp.AppState>,) { }

  ngOnInit() {
    this.vacancyForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'salary': new FormControl(null, [Validators.required]),
      'skills': new FormArray([])
    });
  }

  ngOnDestroy() {

  }

}
