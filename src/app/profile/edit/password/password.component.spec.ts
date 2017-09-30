import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement }    from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from '../../../auth/user.model';
import { reducers } from '../../../store/app.reducers';
import { AuthService } from '../../../auth/auth.service';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../../../auth/store/auth.actions';
import * as ProfileActions from '../../store/profile.actions';
import { ApiService } from '../../../shared/api.service';
import { ProfileService } from './../../profile.service';

const user = new User(1, 'example@mail.com', 'a', 'b');

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let profileService: ProfileService;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        CookieService,
        ApiService,
        ProfileService
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PasswordComponent);
    store = TestBed.get(Store);
    profileService = TestBed.get(ProfileService);
    store.dispatch(new ProfileActions.ReceiveProfile(user));
    fixture.detectChanges();

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('get user from the store.profile slot', () => {
    expect(component.user).toEqual(user);
  });

  it('calls changePassword() method', () => {
    spyOn(profileService, 'changePassword').and.callThrough();

    component.changePassword();
    expect(profileService.changePassword).toHaveBeenCalled();
  });
});
