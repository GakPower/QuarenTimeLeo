import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  @Output() searchInputChange: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
  }

  ngOnInit(): void {
  }

  emitInputChange(input) {
    this.searchInputChange.emit(input);
  }

}
