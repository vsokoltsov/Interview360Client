import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UploaderComponent } from './uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { User } from '../../auth/user.model';
import { reducers } from '../../store/app.reducers';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { ApiService } from '../api.service';
import { environment } from '../../../environments/environment';

const user = new User(1, 'example@mail.com', 'a', 'b');
const responseData = {attachment: {
  id: 1,
  url: '123'
}};

describe('UploaderComponent', () => {
  let store: Store<fromApp.AppState>;
  let de: DebugElement;
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploaderComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        RouterTestingModule,
        FileUploadModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ]
    });

    fixture = TestBed.createComponent(UploaderComponent);
    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    spyOn(component, 'onSuccessUpload').and.callThrough();
    fixture.detectChanges();
    de = fixture.debugElement;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
