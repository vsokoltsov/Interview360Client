import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  restorePasswordForm: FormGroup;
  restorePasswordErrors: Object = {};

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.restorePasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.restorePasswordErrors) {
          this.restorePasswordErrors = data.restorePasswordErrors;
        }
      }
    );
  }

  restorePassword() {
      this.authService.restorePassword(this.restorePasswordForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
