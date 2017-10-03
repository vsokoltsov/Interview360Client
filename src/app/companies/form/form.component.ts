import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Company } from '../company.model';
import { User } from '../../auth/user.model';
import { CompaniesService } from '../companies.service';
import * as fromApp from '../../store/app.reducers';
import * as CompanyActions from '../store/companies.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  companyForm: FormGroup;
  subscription: Subscription;
  owner: User;
  public companyFormErrors: Object = { name: null, start_date: null };
  config = {
    format: 'YYYY-MM-DD',
    required: true
  };
  imageUrl: string;


  constructor(private store: Store<fromApp.AppState>,
              private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'start_date': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'attachment': new FormControl(null, [])
    });
    this.subscription = this.store.select('auth').subscribe(
      (data) => {
        if (data.currentUser) {
          this.owner = data.currentUser;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submit() {
    const params = this.companyForm.value;
    params.owner_id = this.owner.id;
    this.companiesService.createCompany(params);
  }

  imageUploaded($event) {
    this.imageUrl = $event.attachment.medium_url;
    this.companyForm.patchValue({
      attachment: $event.attachment
    });
  }

}
