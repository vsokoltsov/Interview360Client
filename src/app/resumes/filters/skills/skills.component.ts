import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Skill } from '../../../shared/skills/skill.model';

@Component({
  selector: 'app-skills-filter',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() skills: Skill[];
  @Output() onSkillSelected = new EventEmitter<Skill>();

  constructor() { }

  ngOnInit() {
  }

  selectSkill() {

  }

}
