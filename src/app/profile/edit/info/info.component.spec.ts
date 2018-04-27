import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComponent } from './info.component';
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
import { ProfileService } from './../../profile.service'
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { UploaderComponent } from '../../../shared/uploader/uploader.component';
import { UploaderModule } from '../../../shared/uploader/uploader.module';
import { LoaderModule } from '../../../shared/loader/loader.module';

const user = new User(1, 'example@mail.com', 'a', 'b');

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let profileService: ProfileService;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InfoComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule,
        FileUploadModule,
        UploaderModule
      ],
      providers: [
        CookieService,
        ApiService,
        ProfileService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    profileService = TestBed.get(ProfileService);
    store = TestBed.get(Store);
    store.dispatch(new ProfileActions.ReceiveProfile(user));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('get user from the store.profile slot', () => {
    expect(component.user).toEqual(user);
  });

  it('calls updateProfile() method', () => {
    spyOn(profileService, 'updateProfile').and.callThrough();

    component.updateProfile();
    expect(profileService.updateProfile).toHaveBeenCalled();
  });
});
