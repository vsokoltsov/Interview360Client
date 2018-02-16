import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Resume } from '../resume.model';
import { resumesReducer, initialState } from './resumes.reducers';
import * as ResumesActions from './resumes.actions';
import * as fromApp from '../../store/app.reducers';

const resume = new Resume(1, '1');
const updatedResume = new Resume(1, '2');

describe('ResumesReducers', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('run RESUMES_LIST action', () => {
    expect(
      resumesReducer(initialState, {
        type: ResumesActions.RESUMES_LIST, payload: [resume]
      })
    ).toEqual({ ...initialState, list: [resume] });
  });

  it('run RECEIVE_RESUME action',() => {
    expect(
      resumesReducer(initialState, {
        type: ResumesActions.RECEIVE_RESUME, payload: resume
      })
    ).toEqual({ ...initialState, detail: resume });
  });

  it('run SUCCESS_RESUME_CREATED action', () => {
    expect(
      resumesReducer(initialState, {
        type: ResumesActions.SUCCESS_RESUME_CREATED, payload: resume
      })
    ).toEqual({ ...initialState, detail: resume });
  });

  it('runs FAILED_RESUME_CREATED action', () => {
    const errors = { 'title': ['cannot be blank'] };

    expect(
      resumesReducer(initialState, {
        type: ResumesActions.FAILED_RESUME_CREATED, payload: errors
      })
    ).toEqual({ ...initialState, formErrors: errors });
  });

  it('runs SAVE_FORM action', () => {
    const form = { contact: {} };

    expect(
      resumesReducer(initialState, {
        type: ResumesActions.SAVE_FORM, payload: form
      })
    ).toEqual({ ...initialState, form: form });
  });

  it('run SUCCESS_RESUME_UPDATED action', () => {
    expect(
      resumesReducer(initialState, {
        type: ResumesActions.SUCCESS_RESUME_UPDATED, payload: updatedResume
      })
    ).toEqual({ ...initialState, detail: updatedResume, updated: true });
  });

  it('run FAILED_RESUME_UPDATED action', () => {
    const errors = { 'title': ['cannot be blank'] };

    expect(
      resumesReducer(initialState, {
        type: ResumesActions.FAILED_RESUME_UPDATED, payload: errors
      })
    ).toEqual({ ...initialState, formErrors: errors });
  });

  it('run DISABLE_UPDATE action', () => {
    initialState['updated'] = true;

    expect(
      resumesReducer(initialState, {
        type: ResumesActions.DISABLE_UPDATE
      })
    ).toEqual({ ...initialState, updated: false });
  });

  it('run REMOVE_RESUME action', () => {
    initialState['detail'] = resume;

    expect(
      resumesReducer(initialState, {
        type: ResumesActions.REMOVE_RESUME
      })
    ).toEqual({ ...initialState, detail: null });
  });
});
