import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Skill } from '../../../shared/skills/skill.model';

@Component({
  selector: '[app-skills-filter]',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnChanges {
  @Input() skills: Skill[];
  @Output() onSkillSelected = new EventEmitter<{}[]>();
  filterSkillsForm: FormGroup;
  @Input() disable: boolean;

  constructor() { }

  ngOnChanges() {
    if (this.disable) {
      const skillsValues = (<FormArray>this.filterSkillsForm.get('skills')).value.map(item => {
        item.selected = false;
        return item;
      });
      this.filterSkillsForm.patchValue({ 'skills': skillsValues });
    }
  }

  ngOnInit() {
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
