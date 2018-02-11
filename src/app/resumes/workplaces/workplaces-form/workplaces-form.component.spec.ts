import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { WorkplacesFormComponent } from './workplaces-form.component';
import { PopupNotificationsService } from '../../../popup-notifications/popup-notifications.service';
import { Company } from '../../../companies/company.model';
import { User } from '../../../auth/user.model';
import { Resume } from '../../resume.model';
import { Workplace } from '../../workplace.model';
import { SkillsService } from '../../../shared/skills/skills.service';
import { Skill } from '../../../shared/skills/skill.model';
import { ResumesService } from '../../resumes.service';
import { CompaniesService } from '../../../companies/companies.service';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../auth/auth.service';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../../../auth/store/auth.actions';
import * as ResumesActions from '../../store/resumes.actions';
import { AutocompleteModule } from '../../../shared/autocomplete/autocomplete.module';

const user = new User(1);
const company = new Company(1, 'a');
const resume = new Resume(1, 'a', 'b');
const workplace = new Workplace(1, 'a', 'a', 'a', 'a', 'a');
workplace.company = company;

describe('WorkplacesFormComponent', () => {
  let component: WorkplacesFormComponent;
  let fixture: ComponentFixture<WorkplacesFormComponent>;
  let store: Store<fromApp.AppState>;
  let httpMock: HttpTestingController;
  let activatedRouter: ActivatedRoute;
  let resumesService: ResumesService;
  let location: Location;
  let skillsService: SkillsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WorkplacesFormComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        AutocompleteModule,
        DpDatePickerModule
      ],
      providers: [
        ApiService,
        AuthService,
        CookieService,
        ResumesService,
        SkillsService,
        PopupNotificationsService,
        CompaniesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplacesFormComponent);
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

  it('set workplaces to the component', () => {
    spyOn(component.workplacesForm, 'setControl').and.callThrough();
    resume.workplaces = [workplace];
    activatedRouter.params = Observable.of({ id: resume.id });
    store.dispatch(new ResumesActions.ReceiveResume(resume));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.workplacesForm.setControl).toHaveBeenCalled();
    });
  });

  it('submit form value and call the resumesService.saveForm', () => {
    spyOn(resumesService, 'saveForm').and.callThrough();
    component.submit();
    expect(resumesService.saveForm).toHaveBeenCalled();
  });

  it('call the location.back() after component.submit()', () => {
    spyOn(location, 'back').and.callThrough();
    component.submit();
    expect(location.back).toHaveBeenCalled();
  });
});
