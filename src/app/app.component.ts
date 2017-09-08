import { Component, ViewChild } from '@angular/core';
import { MdDrawer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav') sidenav: MdDrawer;
  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    // {
    //   name: 'Work 1',
    //   updated: new Date('1/28/16'),
    // },
    // {
    //   name: 'Work 2',
    //   updated: new Date('1/28/16'),
    // },
    // {
    //   name: 'Work 3',
    //   updated: new Date('1/28/16'),
    // }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  toggleNavigation() {
    this.sidenav.toggle();
  }
}
