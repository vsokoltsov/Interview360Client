import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from '../resume.model';
import { User } from '../../auth/user.model';
import { Skill } from '../../shared/skills/skill.model';
import { SkillsService } from '../../shared/skills/skills.service';
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
  skillsSubscription: Subscription;
  searchedSkills: Skill[];
  selectedSkills: Skill[] = [];
  popupsShowing: {} = {};
  values: {} = {};
  public currentPopupId: string;

  constructor(private store: Store<fromApp.AppState>,
              private activatedRoute: ActivatedRoute,
              private skillsService: SkillsService) { }

  ngOnInit() {
    this.resumeForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'skills': new FormControl(null)
    });
    this.skillsSubscription = this.store.select('skills').subscribe(
      data => {
        if (data.list.length > 0) { this.popupsShowing['skills'] = true; }
        // if (data.list.length > 0) {

        this.values['skills'] = data.list;
        // }
      }
    );
  }

  submit() {
    const params = this.resumeForm.value;
    params['skills'] = this.selectedSkills.map(item => item.id);
    console.log(params);
  }

  selectSkill(skill: Skill) {
    const ids = <Object[]>this.selectedSkills.map(item => item.id);
    if (!ids.includes(skill.id)) {
      this.selectedSkills.push(skill);
    }
    this.popupsShowing['skills'] = false;
  }

  searchSkills(event: any) {
    this.skillsService.searchSkills(event.target.value);
  }

  addSkill(skill: Skill) {
    let skills = this.resumeForm.value.skills.map(item => item.id);
    if (!skills.includes(skill.id)) {
        this.setSkillToForm(skill);
    }
  }

  deleteSkill(skill: Skill) {
    const idx = this.selectedSkills.findIndex(
      item => item.id == skill.id
    );
    if (idx !== -1) {
      this.selectedSkills.splice(idx, 1);
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
