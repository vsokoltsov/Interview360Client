import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Company } from './company.model';
import { Order } from '../shared/filters/order.model';
import { SelectItem } from '../shared/filters/select.item.model';
import { CompaniesService } from './companies.service';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companiesSearchForm: FormGroup;
  companiesFilterForm: FormGroup;
  companies: Company[];
  subscription: Subscription;
  ordersFilter: Order[];
  rolesFilter: SelectItem[];
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
    this.companiesFilterForm = new FormGroup({
      'role': new FormControl(null),
      'order': new FormControl(null)
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

  submitFilter() {
    const params = this.companiesFilterForm.value;
    this.companiesService.loadList(params);
  }

  onOrderSelected(event: string) {
    this.companiesFilterForm.get('order').setValue(event);
  }

  onSelected(event: { key: number }) {
    this.companiesFilterForm.get('role').setValue(event.key);
  }
}
