import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Company } from '../company.model';
import { User } from '../../auth/user.model';
import { CompaniesService } from '../companies.service';
import * as fromApp from '../../store/app.reducers';
import * as CompanyActions from '../store/companies.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  company: Company;
  subscription: Subscription;

  constructor(
    private companyService: CompaniesService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        const companyId = params['id'];
        this.companyService.receiveCompany(companyId);
    });

    this.subscription = this.store.select('companies').subscribe(
      data => {
        if (data.detail) {
          this.company = data.detail;
        }

        if (data.companyDeleted) {
          this.store.dispatch(new CompanyActions.DisableCompanyDeleted());
          this.router.navigate(['/companies']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new CompanyActions.LeaveDetailPage());
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.company.id, this.company);
  }
}
