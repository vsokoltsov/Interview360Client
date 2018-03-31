import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SelectItem } from '../select.item.model';

@Component({
  selector: 'filter-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input('items') selectItems: SelectItem[];
  @Output() select = new EventEmitter<any>();
  selectedItem: SelectItem;
  @Input() reset: boolean;

  constructor() { }

  ngOnInit() {
  }

  onSelected(event: {}) {
    this.select.emit(event);
  }

}
