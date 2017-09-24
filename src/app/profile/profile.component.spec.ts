import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DebugElement }    from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from '../auth/user.model';
import { reducers } from '../store/app.reducers';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import { ApiService } from '../shared/api.service';
import { ProfileService } from './profile.service'
import { environment } from '../../environments/environment';

const user = new User(1, 'example@mail.com', 'a', 'b');
const responseData = {current_user: {
  id: 1,
  email: 'example@mail.com',
  first_name: 'a',
  last_name: 'b'
}};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let profileService: ProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        CookieService,
        ApiService,
        ProfileService,
        AuthService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    store = TestBed.get(Store);
    profileService = TestBed.get(ProfileService);
    spyOn(profileService, 'receiveProfile').and.callThrough();
    component = fixture.componentInstance;
    fixture.detectChanges();

    const action = new AuthActions.CurrentUserReceived(user);
    store.dispatch(action);
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should call profileService.receiveProfile() method', () => {
    expect(profileService.receiveProfile).toHaveBeenCalled();
  });
});
