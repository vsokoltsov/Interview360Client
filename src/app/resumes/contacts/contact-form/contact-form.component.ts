import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray,
  Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';

import { Resume } from '../../resume.model';
import { User } from '../../../auth/user.model';
import { Contact } from '../../contact.model';
import { ResumesService } from '../../resumes.service';
import * as fromApp from '../../../store/app.reducers';
import * as ResumesActions from '../../store/resumes.actions';
import * as ContactActions from '../../store/contact.actions';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  userSubscription: Subscription;
  resumeSubscription: Subscription;
  contactSubscription: Subscription;
  currentUser: User;
  resume: Resume;
  contact: Contact;
  form: {};
  formErrors: {} = {};

  constructor(private store: Store<fromApp.AppState>,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private resumesService: ResumesService) { }

  ngOnInit() {
    this.initForm();
    this.setResumeSubscription();
    this.setUserSubscription();
    this.handleUrlParametersChange();
  }

  submit() {
    let params = null;
    const contactValue = {
      contact: {
        ...this.contactForm.value,
        social_networks: {
          ...this.contactForm.value.social_networks
        }
      }
    };
    params = {
      ...this.form,
      ...contactValue
    };

    if (this.contact) {
      params = {
        ...params,
        contact: {
          ...params.contact,
          id: this.contact.id
        }
      }
    }
    this.resumesService.saveForm(params);
    this.location.back();
  }

  returnBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  private initForm() {
    this.contactForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
      'phone_comment': new FormControl(null),
      'social_networks': new FormArray([])
    });
  }

  private setResumeSubscription() {
    this.resumeSubscription = this.store.select('resumes').subscribe(
      data => {
        if (data.detail) {
          this.resume = data.detail;
          if (this.resume.contact) {
            this.contact = this.resume.contact;
            this.contactForm.patchValue({
              'id': this.resume.contact.id,
              'email': this.resume.contact.email,
              'phone': this.resume.contact.phone,
              'phone_comment': this.resume.contact.phone_comment
            });
          }
        }
        if (data.form) {
          this.form = data.form;
          const contact = this.form['contact'];
          if (contact) {
            this.contactForm.patchValue({
              'id': contact['id'],
              'email': contact['email'],
              'phone': contact['phone'],
              'phone_comment': contact['phone_comment']
            });
          }
        }
        if (data.formErrors) {
          this.formErrors = data.formErrors['contact'];
        }
      }
    );
  }

  private setUserSubscription() {
    this.userSubscription = this.store.select('auth').subscribe(
      data => {
        if (data.currentUser) {
          this.currentUser = data.currentUser;
          this.contactForm.patchValue({
            'email': this.currentUser.email
          });
          (<FormControl>this.contactForm.get('email')).patchValue(this.currentUser.email);
        }
      }
    );
  }

  private handleUrlParametersChange() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const resumeId = params['id'];
      if (resumeId) {
        this.resumesService.getResume(resumeId);
      }
      else {
        if (this.contactForm) {
          this.contactForm.patchValue({
            'phone': null,
            'phone_comment': null,
            'social_networks': []
          });
        }
      }
    });
  }
}
