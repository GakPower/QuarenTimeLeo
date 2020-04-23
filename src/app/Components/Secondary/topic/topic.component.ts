import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit{
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  @Input() title: string;
  @Input() isSelected: boolean;
  @Input() color: string;

  editing = false;
  inputText = this.title;

  colors = [
    '#9ed964',
    '#64c7d9',
    '#c064d9',
    '#d9ae64'
  ];

  constructor() {}

  editTitle() {
    this.title = this.inputText;
    this.editing = false;
  }

  emitDeleteEvent() {
    this.delete.emit();
  }
  emitClickedEvent() {
    this.clicked.emit();
  }

  changeColor(index) {
    this.color = this.colors[index];
  }

  ngOnInit(): void {
    this.inputText = this.title;
  }
}
