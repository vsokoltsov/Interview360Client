import { Action } from '@ngrx/store';

import { Skill } from '../skill.model';

export const SKILLS_LOADED = 'SKILLS_LOADED';

export class SkillsLoaded implements Action {
  readonly type = SKILLS_LOADED;

  constructor(public payload: Skill[]) {}
}

export type SkillsActions = SkillsLoaded;
