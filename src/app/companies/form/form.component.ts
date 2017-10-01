import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Company } from '../company.model';
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
  public companyFormErrors: Object = { name: null, start_date: null };
  config = {
    format: 'DD.MM.YYYY',
    required: true
  };

  constructor(private store: Store<fromApp.AppState>,
              private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'start_date': new FormControl(null, []),
      'city': new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy() {

  }

  submit() {

  }

}
