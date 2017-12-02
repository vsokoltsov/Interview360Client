import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {
  inviteForm: FormGroup;
  subscription: Subscription;
  token: string;
  companyId: number;
  public inviteFormErrors: Object = { };

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.inviteForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'password_confirmation': new FormControl(null, [
        Validators.required, this.matchingPassword.bind(this)
      ])
    });
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.successSubmitInvite) {
          this.store.dispatch(new AuthActions.DisableSuccessInvite());
          this.router.navigate(['/auth', 'sign-in']);
        }
      }
    );
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.token = params['token'];
        this.companyId = params['company_id'];
    });
  }

  matchingPassword(control: FormControl): {[s: string]: boolean } {
    const passwordConfirmation = control.value;
    if (this.inviteForm) {
      const password = this.inviteForm.get('password').value;
      if (password !== passwordConfirmation) {
        return {
          notMatching: true
        };
      }
    }
    return null;

  }

  submitInvite() {
    const params = this.inviteForm.value;
    params['token'] = this.token;
    params['company_pk'] = this.companyId;
    this.authService.inviteSubmit(this.companyId, params);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
