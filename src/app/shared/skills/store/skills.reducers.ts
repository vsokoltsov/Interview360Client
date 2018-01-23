import { Skill } from '../skill.model';

import * as SkillsActions from './skills.actions';

export interface State {
  list: Skill[]
};

export const initialState: State = {
  list: []
};

export function skillsReducer(
  state=initialState, action: SkillsActions.SkillsActions) {
  switch(action.type) {
    case SkillsActions.SKILLS_LOADED:
      return {
        ...state,
        list: action.payload
      };
    case SkillsActions.REMOVE_SKILLS:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
}
