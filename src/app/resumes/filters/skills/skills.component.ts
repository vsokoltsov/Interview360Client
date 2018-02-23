import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Skill } from '../../../shared/skills/skill.model';

@Component({
  selector: '[app-skills-filter]',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() skills: Skill[];
  @Output() onSkillSelected = new EventEmitter<{}[]>();
  filterSkillsForm: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log(this.skills);
    this.filterSkillsForm = new FormGroup({
      'skills': new FormArray([])
    });
    this.skills.forEach(item => {
      const control = new FormGroup({
        'id': new FormControl(item.id),
        'name': new FormControl(item.name),
        'selected': new FormControl(false),
      });
      (<FormArray>this.filterSkillsForm.get('skills')).push(control);
    });
  }

  getSkills(form) {
    return form.get('skills').controls;
  }

  selectSkill() {
    const skills = this.filterSkillsForm.value.skills;
    this.onSkillSelected.emit(skills);
  }

}
