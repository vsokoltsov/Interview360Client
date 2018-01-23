import { Action } from '@ngrx/store';

import { Skill } from '../skill.model';

export const SKILLS_LOADED = 'SKILLS_LOADED';
export const REMOVE_SKILLS = 'REMOVE_SKILLS';

export class SkillsLoaded implements Action {
  readonly type = SKILLS_LOADED;

  constructor(public payload: Skill[]) {}
}

export class RemoveSkills implements Action {
  readonly type = REMOVE_SKILLS;
}

export type SkillsActions = SkillsLoaded | RemoveSkills;
