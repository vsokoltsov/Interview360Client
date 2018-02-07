import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { ResumeFormComponent } from './resume-form.component';
import { PopupNotificationsService } from '../../popup-notifications/popup-notifications.service';
import { User } from '../../auth/user.model';
import { Resume } from '../resume.model';
import { ResumesService } from '../resumes.service';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/api.service';
import { SkillsService } from '../../shared/skills/skills.service';
import { Skill } from '../../shared/skills/skill.model';
import * as SkillsActions from '../../shared/skills/store/skills.actions';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as ResumesActions from '../store/resumes.actions';
import { AutocompleteModule } from '../../shared/autocomplete/autocomplete.module';

const skill = new Skill(1, '11');
const user = new User(1);
const resume = new Resume(1, 'a', 'b');

describe('ResumeFormComponent', () => {
  let component: ResumeFormComponent;
  let fixture: ComponentFixture<ResumeFormComponent>;
  let store: Store<fromApp.AppState>;
  let httpMock: HttpTestingController;
  let activatedRouter: ActivatedRoute;
  let resumesService: ResumesService;
  let location: Location;
  let skillsService: SkillsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResumeFormComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        AutocompleteModule
      ],
      providers: [
        ApiService,
        AuthService,
        CookieService,
        ResumesService,
        PopupNotificationsService,
        SkillsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    resumesService = TestBed.get(ResumesService);
    activatedRouter = TestBed.get(ActivatedRoute);
    skillsService = TestBed.get(SkillsService);
    location = TestBed.get(Location);
    spyOn(resumesService, 'getResume').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set the resume detail info', () => {
    activatedRouter.params = Observable.of({ id: resume.id });
    store.dispatch(new ResumesActions.ReceiveResume(resume));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.resume).toEqual(resume);
    });
  });

  it('call the patchValue on resumeForm', () => {
    spyOn(component.resumeForm, 'patchValue').and.callThrough();
    activatedRouter.params = Observable.of({ id: resume.id });
    store.dispatch(new ResumesActions.ReceiveResume(resume));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.resumeForm.patchValue).toHaveBeenCalled();
    });
  });

  it('set current user', () => {
    store.dispatch(new AuthActions.CurrentUserReceived(user));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.currentUser).toEqual(user);
    });
  });

  it('set skills after loading it', () => {
    store.dispatch(new SkillsActions.SkillsLoaded([skill]));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.values['skills']).toEqual([skill]);
    });
  });

  it('set value to form from the form store', () => {
    spyOn(component.resumeForm, 'patchValue').and.callThrough();
    const form = {
      title: 'aaa'
    };
    resumesService.saveForm(form);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.resumeForm.patchValue).toHaveBeenCalled();
    });
  });

  it('set workplaces data', () => {
    const workplaces = [{ id: 1 }];
    const form = {
      title: 'aaa',
      workplaces
    };
    resumesService.saveForm(form);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.workplacesList).toEqual(workplaces);
    });
  });

  it('set contact data', () => {
    const contact = { id: 1 };
    const form = {
      title: 'aaa',
      contact
    };
    resumesService.saveForm(form);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.contact).toEqual(contact);
    });
  });

  it('set selected skills value', () => {
    const selectedSkills = [new Skill(1)];
    const form = {
      title: 'aaa',
      selectedSkills
    };
    resumesService.saveForm(form);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.selectedSkills).toEqual(selectedSkills);
    });
  });

  it('set errors data', () => {
    const errors = { data: ['Can\'t be blank'] };
    store.dispatch(new ResumesActions.FailedResumeCreated(errors));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.resumeFormErrors).toEqual(errors);
    });
  });
});
