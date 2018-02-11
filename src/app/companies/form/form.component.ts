import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

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
  companySubscription: Subscription;
  currentCompany: Company;
  owner: User;
  public companyFormErrors: Object = { name: null, start_date: null };
  config = {
    format: 'YYYY-MM-DD',
    required: true
  };
  imageUrl: string;


  constructor(private store: Store<fromApp.AppState>,
              private companiesService: CompaniesService,
              private activatedRoute: ActivatedRoute) { }

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

    this.companySubscription = this.store.select('companies').subscribe(
      (data) => {
        if (data.detail) {
          this.currentCompany = data.detail;
          if (this.currentCompany.attachment) {
              this.imageUrl = this.currentCompany.attachment.medium_url;
          }

          this.companyForm.patchValue({
            name: this.currentCompany.name,
            description: this.currentCompany.description,
            start_date: this.currentCompany.start_date,
            city: this.currentCompany.city,
            attachment: this.currentCompany.attachment
          });
        }

        if (data.updateErrors) {
          this.companyFormErrors = data.updateErrors;
        }
      }
    );

    this.activatedRoute.params.subscribe((params: Params) => {
        const companyId = params['id'];
        if (companyId) {
          this.companiesService.receiveCompany(companyId);
        }
        else {
          if (this.companyForm) {
            this.companyForm.patchValue({
              name: null,
              description: null,
              start_date: null,
              city: null,
              attachment: null
            });
          }
        }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.companySubscription.unsubscribe();
  }

  submit() {
    const params = this.companyForm.value;
    params.owner_id = this.owner.id;

    if (this.currentCompany) {
      this.companiesService.updateCompany(this.currentCompany.id, params);
    }
    else {
      this.companiesService.createCompany(params);
    }
  }

  imageUploaded($event) {
    this.imageUrl = $event.attachment.medium_url;
    this.companyForm.patchValue({
      attachment: $event.attachment
    });
  }

}
