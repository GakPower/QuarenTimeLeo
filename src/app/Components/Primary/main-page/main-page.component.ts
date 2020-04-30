import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MovieAPI} from '../../Class/MovieAPI/movie-api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  input = '';

  constructor( ) {
  }

  ngOnInit(): void {
  }

  updateInput(input) {
    this.input = input;
  }

}
