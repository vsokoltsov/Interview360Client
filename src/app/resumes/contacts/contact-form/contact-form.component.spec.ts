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

import { ContactFormComponent } from './contact-form.component';
import { PopupNotificationsService } from '../../../popup-notifications/popup-notifications.service';
import { User } from '../../../auth/user.model';
import { Contact } from '../../contact.model';
import { Resume } from '../../resume.model';
import { ResumesService } from '../../resumes.service';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../auth/auth.service';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../../../auth/store/auth.actions';
import * as ResumesActions from '../../store/resumes.actions';
import * as ContactActions from '../../store/contact.actions';

const user = new User(1);
const resume = new Resume(1, 'a', 'b');
const contact = new Contact(1);
resume.contact = contact;

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let store: Store<fromApp.AppState>;
  let httpMock: HttpTestingController;
  let activatedRouter: ActivatedRoute;
  let resumesService: ResumesService;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactFormComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        AuthService,
        CookieService,
        ResumesService,
        PopupNotificationsService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ id: resume.id })
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    resumesService = TestBed.get(ResumesService);
    location = TestBed.get(Location);
    spyOn(resumesService, 'getResume').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set the resume detail info', () => {
    store.dispatch(new ResumesActions.ReceiveResume(resume));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.resume).toEqual(resume);
    });
  });

  it('set the contact information', () => {
    spyOn(component.contactForm, 'patchValue').and.callThrough();
    store.dispatch(new ResumesActions.ReceiveResume(resume));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.contactForm.patchValue).toHaveBeenCalled();
    });
  });

  it('call receiving of the detail resume information', () => {
    fixture.detectChanges();
    expect(resumesService.getResume).toHaveBeenCalled();
  });

  it('set default email value of the current user\'s ', () => {
    store.dispatch(new AuthActions.CurrentUserReceived(user));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.contactForm.value['email']).toEqual(user.email);
    });
  });

  it('calls resumesService.saveForm on form submit', () => {
    spyOn(resumesService, 'saveForm').and.callThrough();
    component.submit();
    expect(resumesService.saveForm).toHaveBeenCalled();
  });

  it('calls the location.back() on cancel button click', () => {
    spyOn(location, 'back').and.callThrough();
    component.returnBack();
    expect(location.back).toHaveBeenCalled();
  });
});
