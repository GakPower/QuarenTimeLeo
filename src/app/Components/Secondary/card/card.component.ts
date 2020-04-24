import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() immutable = false;
  checked = false;

  constructor() { }

  emitDeleteEvent() {
    this.delete.emit();
  }

  ngOnInit(): void {
  }

}
