import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'passwordConfirmation': new FormControl(null, [Validators.required, this.matchingPassword.bind(this)])
    });
  }

  matchingPassword(control: FormControl): {[s: string]: boolean } {
    const passwordConfirmation = control.value;
    if (this.signUpForm) {
      const password = this.signUpForm.get('password').value;
      if (password !== passwordConfirmation) {
        return {
          notMatching: true
        };
      }
    }
    return null;

  }

}
