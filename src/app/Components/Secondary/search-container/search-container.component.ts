import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Movie} from '../../Class/Movie/movie';
import {MovieAPI} from '../../Class/MovieAPI/movie-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit, OnChanges {

  @Input() input = '';
  movies: Movie[] = [];
  constructor() {
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }

  /**
   * 
   * 
   */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.input && changes.input.currentValue) {
      MovieAPI.search(changes.input.currentValue).then(result => {
        this.movies = result;
      });
    }
  }
  

}
