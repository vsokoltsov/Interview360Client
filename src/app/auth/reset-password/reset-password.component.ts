import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  resetPasswordForm: FormGroup;
  resetPasswordErrors: Object = {
    password: null,
    password_confirmation: null
  };
  token: string;

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'password_confirmation': new FormControl(null, [
        Validators.required, this.matchingPassword.bind(this)
      ])
    });
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.resetPasswordErrors) {
          this.resetPasswordErrors = data.resetPasswordErrors;
        }
      }
    );
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.token = params['token'];
    });
  }

  resetPassword() {
    const form = this.resetPasswordForm.value;
    form['token'] = this.token;
    this.authService.resetPassword(form);
  }

  matchingPassword(control: FormControl): {[s: string]: boolean } {
    const passwordConfirmation = control.value;
    if (this.resetPasswordForm) {
      const password = this.resetPasswordForm.get('password').value;
      if (password !== passwordConfirmation) {
        return {
          notMatching: true
        };
      }
    }
    return null;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
