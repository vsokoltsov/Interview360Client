import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../../companies/company.model';
import { Vacancy } from '../vacancy.model';
import { User } from '../../auth/user.model';
import { Skill } from '../skill.model';
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
  skills: Skill[];
  public vacancyFormErrors: Object = { };

  constructor(private store: Store<fromApp.AppState>,
              private vacanciesService: VacanciesService) { }

  ngOnInit() {
    this.vacanciesService.loadSkills();
    this.vacancyForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'salary': new FormControl(null, [Validators.required]),
      'skills': new FormArray([])
    });

    this.subscription = this.store.select('vacancies').subscribe(
      data => {
        if (data.skills.length > 0) {
          this.skills = data.skills;
        }
      }
    );
  }

  addSkill(skill: Skill) {
    let skills = this.vacancyForm.value.skills.map(item => item.id);
    if (!skills.includes(skill.id)) {
        const control = new FormControl(skill, Validators.required);
        (<FormArray>this.vacancyForm.get('skills')).push(control);
    }
  }

  deleteSkill(skill: Skill) {
    const idx = this.vacancyForm.value.skills.findIndex(
      item => item.id == skill.id
    );
    if (idx !== -1) {
      (<FormArray>this.vacancyForm.get('skills')).removeAt(idx);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
