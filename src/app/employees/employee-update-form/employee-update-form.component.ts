import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User } from '../../auth/user.model';
import { Company } from '../../companies/company.model';
import { getRole } from '../../shared/roles';
import { EmployeesService } from '../employees.service';
import * as fromApp from '../../store/app.reducers';
import * as EmployeesActions from '../store/employees.actions';

@Component({
  selector: 'app-employee-update-form',
  templateUrl: './employee-update-form.component.html',
  styleUrls: ['./employee-update-form.component.scss']
})
export class EmployeeUpdateFormComponent implements OnInit, OnDestroy {
  employeeForm: FormGroup;
  subscription: Subscription;
  employeeFormErrors = { email: null };
  userImageUrl: string;
  companyId: number;
  userId: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required]),
      'attachment': new FormControl(null, [])
    });
    this.subscription = this.store.select('employees').subscribe(
      data => {
        if (data.detail) {
          this.employeeForm.patchValue({
            email: data.detail.email,
            first_name: data.detail.first_name,
            last_name: data.detail.last_name
          });
        }
      }
    );
    this.activatedRoute.params.subscribe((params: Params) => {
      const parameters = this.activatedRoute.snapshot;
      const parentParans = parameters.parent.params;
      this.companyId = parentParans['companyId'];
      this.userId = parameters.params ? parameters.params.id : null;
      if (this.userId) {
          this.employeesService.receiveEmployee(this.companyId, this.userId);
      }
      else {
        if (this.employeeForm) {
          this.employeeForm.patchValue({
            email: null,
            first_name: null,
            last_name: null
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateEmployee() {
    this.employeesService.updateEmployee(
      this.companyId, this.userId, this.employeeForm.value
    );
  }

  avatarUploaded($event) {
    this.userImageUrl = $event.attachment.url;
    this.employeeForm.patchValue({
      attachment: $event.attachment
    });
  }

}
