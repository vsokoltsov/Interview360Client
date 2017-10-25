import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Interview } from '../interview.model';
import { interviewsReducer, initialState } from './interview.reducers';
import * as InterviewActions from './interview.actions';
import * as fromApp from '../../store/app.reducers';

const interview = new Interview(1, 1, 1);

describe('CompaniesReducers', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('runs INTERVIEWS_LOADED state', () => {
    expect(
      interviewsReducer(initialState, {
        type: InterviewActions.INTERVIEWS_LOADED, payload: [interview]
      })
    ).toEqual({ ...initialState, list: [interview] });
  });

  it('runs INTERVIEW_LOADED state', () => {
    expect(
      interviewsReducer(initialState, {
        type: InterviewActions.INTERVIEW_LOADED, payload: interview
      })
    ).toEqual({ ...initialState, detail: interview });
  });

});
