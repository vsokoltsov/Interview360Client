import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: '[app-order-filter]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnChanges {
  @Input() orders: string[];
  @Output() onOrderSelected = new EventEmitter<string>();
  selectedOrder: string;
  orderDirection: boolean = true;
  @Input() disable: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.disable) {
      this.selectedOrder = null;
    }
  }

  selectOrder(order: string) {
    if (this.selectedOrder === order) {
      this.orderDirection = !this.orderDirection;
    } else {
      this.selectedOrder = order;
      this.orderDirection = true;
    }
    this.onOrderSelected.emit(this.correctOrderValue());
  }

  correctOrderValue() {
    return this.orderDirection ? this.selectedOrder : `-${this.selectedOrder}`;
  }

}
