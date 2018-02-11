import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';


import { Skill } from '../skill.model';
import { skillsReducer, initialState } from './skills.reducers';
import * as SkillsActions from './skills.actions';
import * as fromApp from '../../../store/app.reducers';

const skill = new Skill(1);

describe('SkillsReducer', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('runs SKILLS_LOADED action', () => {
    expect(
      skillsReducer(initialState, {
        type: SkillsActions.SKILLS_LOADED, payload: [skill]
      })
    ).toEqual({...initialState, list: [skill]})
  });

  it('runs REMOVE_SKILLS action', () => {
    expect(
      skillsReducer(initialState, {
        type: SkillsActions.REMOVE_SKILLS
      })
    ).toEqual({...initialState, list: []})
  });
});
