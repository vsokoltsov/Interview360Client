import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from '../resume.model';
import { User } from '../../auth/user.model';
import { Skill } from '../../vacancies/skill.model';
import * as fromApp from '../../store/app.reducers';
import * as ResumesActions from '../store/resumes.actions';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {
  resumeForm: FormGroup;
  resumeFormErrors: {} = {};

  constructor(private store: Store<fromApp.AppState>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resumeForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'skills': new FormArray([])
    });
  }

  submit() {

  }

  addSkill(skill: Skill) {
    let skills = this.resumeForm.value.skills.map(item => item.id);
    if (!skills.includes(skill.id)) {
        this.setSkillToForm(skill);
    }
  }

  deleteSkill(skill: Skill) {
    const idx = this.resumeForm.value.skills.findIndex(
      item => item.id == skill.id
    );
    if (idx !== -1) {
      (<FormArray>this.resumeForm.get('skills')).removeAt(idx);
    }
  }

  private setSkills(detail: Resume) {
    if (detail.skills) {
      const skillsArr = detail.skills.map(item => {
        return new FormControl(item, Validators.required);
      });
      this.resumeForm.setControl('skills', new FormArray(skillsArr));
    }
  }

  private setSkillToForm(skill: Skill) {
    const control = new FormControl(skill, Validators.required);
    (<FormArray>this.resumeForm.get('skills')).push(control);
  }
}
