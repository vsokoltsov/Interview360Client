import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  infoForm: FormGroup;
  subscription: Subscription;
  infoFormErrors = {};

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.infoForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required])
    });

    this.subscription = this.store.select('auth').subscribe(
      data => {
        if(data.currentUser) {
            this.infoForm.patchValue({
              email: data.currentUser.email,
              first_name: data.currentUser.firstName,
              last_name: data.currentUser.lastName
            });
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateProfile() {

  }
}
