import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Company } from './company.model';
import { Order } from '../shared/filters/order.model';
import { Role } from '../shared/filters/role.model';
import { CompaniesService } from './companies.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companiesSearchForm: FormGroup;
  companies: Company[];
  subscription: Subscription;
  ordersFilter: Order[];
  rolesFilter: Role[];
  resetOrder: boolean;
  selectedOrder: string;

  constructor(private companiesService: CompaniesService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.companiesService.loadList();
    this.companiesService.receiveFilters();
    this.companiesSearchForm = new FormGroup({
      'query': new FormControl(null)
    });
    this.companiesSearchForm.get('query').valueChanges.subscribe(
      data => {
        this.searchCompanies(data);
      }
    );
    this.subscription = this.store.select('companies').subscribe(
      data => {
        if(data.list) {
          this.companies = data.list;
        }

        if (data.filters) {
          this.ordersFilter = data.filters.order;
          this.rolesFilter = data.filters.roles;
        }
      }
    );
  }

  searchCompanies(query: string) {
    this.companiesService.searchCompanies(query)
  }

  submitSearch() {
    const query = this.companiesSearchForm.get('query').value;
    this.companiesService.searchCompanies(query);
  }

  onOrderSelected(event: string) {
    console.log(event);
  }

}
