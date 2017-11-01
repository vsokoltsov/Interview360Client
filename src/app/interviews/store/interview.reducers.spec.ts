import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Interview } from '../interview.model';
import { interviewsReducer, initialState } from './interview.reducers';
import * as InterviewActions from './interview.actions';
import * as fromApp from '../../store/app.reducers';

const interview = new Interview(1, 1, 1);
const successInterviewResponse = {
  id: '1'
};
const errorResponse = {
  errors: {
    name: 'AA'
  }
};

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

  it('runs SUCCESS_CREATED_INTERVIEW state', () => {
    expect(
      interviewsReducer(initialState, {
        type: InterviewActions.SUCCESS_CREATED_INTERVIEW, payload: interview
      })
    ).toEqual({ ...initialState, list: [interview] });
  });

  it('runs FAILED_CREATED_INTERVIEW state', () => {
    expect(
      interviewsReducer(initialState, {
        type: InterviewActions.FAILED_CREATED_INTERVIEW, payload: errorResponse.errors
      })
    ).toEqual({ ...initialState, formErrors: errorResponse.errors });
  });
});
