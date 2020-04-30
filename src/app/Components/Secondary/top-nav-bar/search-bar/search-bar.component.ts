import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MovieAPI} from '../../../Class/MovieAPI/movie-api';
import {Movie} from '../../../Class/Movie/movie';
import {MoviePageComponent} from '../../movie-page/movie-page.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SearchContainerComponent} from '../../search-container/search-container.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(input: string) {
    this.inputChange.emit(input);
  }

}
