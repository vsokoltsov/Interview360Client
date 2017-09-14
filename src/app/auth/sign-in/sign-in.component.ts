import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  subscription: Subscription;
  signInErrors: Object = {};
  failed: boolean;

  constructor(private store: Store<fromApp.AppState>,
              private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
    console.log(this.signInForm);
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.signInErrors) {
          this.failed = true;
          this.signInErrors = data.signInErrors;
          this.signInForm.setErrors({ 'email': true});
        }
      }
    );
  }


  signIn() {
    this.authService.signIn(this.signInForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
