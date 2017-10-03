import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../../profile.service';
import { User } from '../../../auth/user.model';
import { UploaderComponent } from '../../../shared/uploader/uploader.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  user: User;
  userImageUrl: string;
  infoForm: FormGroup;
  subscription: Subscription;
  infoFormErrors = { email: null };

  constructor(
    private profileService: ProfileService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.infoForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required]),
      'attachment': new FormControl(null, [])
    });

    this.subscription = this.store.select('profile').subscribe(
      data => {
        if(data.profile) {
          this.user = data.profile;
          if (this.user.attachment) {
              this.userImageUrl = this.user.attachment.medium_url;
          }
          this.infoForm.patchValue({
            email: data.profile.email,
            first_name: data.profile.first_name,
            last_name: data.profile.last_name,
            attachment: data.profile.attachment
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateProfile() {
    this.profileService.updateProfile(this.user.id, this.infoForm.value);
  }

  avatarUploaded($event) {
    this.userImageUrl = $event.attachment.url;
    this.infoForm.patchValue({
      attachment: $event.attachment
    });
  }
}
