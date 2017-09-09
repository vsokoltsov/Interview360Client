import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  routerLinks = [
    { label: 'Sign in', link: 'sign-in' },
    { label: 'Sign up', link: 'sign-up' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
