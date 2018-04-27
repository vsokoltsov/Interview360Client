import { Component, OnInit, OnDestroy, DoCheck, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators'

import { Company } from '../company.model';
import { Place } from '../place.model';
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
  places = [];
  specialties = [];
  typeahead = new EventEmitter<string>();
  specialtiesTypehead = new EventEmitter<string>();
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
    this.searchCities();
    this.searchSpecialties();
    this.companyForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'start_date': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'specialties': new FormControl(null, []),
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
          this.companyForm.reset();
          this.companyForm.setValue({
            name: this.currentCompany.name,
            description: this.currentCompany.description,
            start_date: this.currentCompany.start_date,
            city: {
              city: this.currentCompany.city,
              country: this.currentCompany.country,
              full_name:`${this.currentCompany.city}, ${this.currentCompany.country}`
            },
            attachment: this.currentCompany.attachment,
            specialties: this.currentCompany.specialties
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
              attachment: null,
              specialties: null
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
    let specialties = [];
    const form = this.companyForm.value;
    const place = form.city;
    if (form.specialties) {
      form.specialties
    }
    if (form.specialties) {
      specialties = form.specialties.map(item => item.id);
    }
    if (place && place.full_name) {
        delete place.full_name;
    }
    delete form.place;
    delete form.specialties;
    const params = {
      ...form, ...place, specialties };
    const attachment = params.attachment;
    params.owner_id = this.owner.id;
    if (attachment) {
      params.attachment = { id: attachment.id };
    }

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

  private searchCities() {
    this.typeahead.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.companiesService.getCities(term))
    ).subscribe(response => {
      this.places = response.body.cities.map(item => {
        item['full_name'] = `${item.city}, ${item.country}`;
        return item;
      });
    });
  }

  private searchSpecialties() {
    this.specialtiesTypehead.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.companiesService.getSpecialties(term))
    ).subscribe(response => {
      this.specialties = response.body.specialties;
    });
  }
}
