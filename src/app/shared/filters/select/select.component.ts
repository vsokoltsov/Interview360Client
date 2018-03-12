import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SelectItem } from '../select.item.model';

@Component({
  selector: 'filter-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() SelectItem;
  @Output() onOrderSelected = new EventEmitter<string>();
  selectedItem: SelectItem;
  orderDirection: boolean = true;
  @Input() reset: boolean;

  constructor() { }

  ngOnInit() {
  }

}
