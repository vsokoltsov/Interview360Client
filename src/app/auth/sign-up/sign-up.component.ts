import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  signUpForm: FormGroup;
  signUpErrors: Object = {};
  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'password_confirmation': new FormControl(null, [Validators.required, this.matchingPassword.bind(this)])
    });
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.signUpErrors) {
          this.signUpErrors = data.signUpErrors;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signUp() {
    this.authService.signUp(this.signUpForm.value);
  }

  matchingPassword(control: FormControl): {[s: string]: boolean } {
    const passwordConfirmation = control.value;
    if (this.signUpForm) {
      const password = this.signUpForm.get('password').value;
      if (password !== passwordConfirmation) {
        return {
          notMatching: true
        };
      }
    }
    return null;

  }

}
