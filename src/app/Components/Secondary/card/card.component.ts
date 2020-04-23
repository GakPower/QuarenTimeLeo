import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  checked = false;

  constructor() { }

  emitDeleteEvent() {
    this.delete.emit();
  }

}
