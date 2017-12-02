import { Component, OnInit } from '@angular/core';
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
export class InviteComponent implements OnInit {
  inviteForm: FormGroup;
  subscription: Subscription;
  token: string;
  companyId: number;
  public inviteFormErrors: Object = { };

  constructor(private store: Store<fromApp.AppState>,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.inviteForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'password_confirmation': new FormControl(null, [
        Validators.required, this.matchingPassword.bind(this)
      ])
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.token = params['token'];
        this.companyId = params['company_id'];
        console.log(params);
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

  }

}
