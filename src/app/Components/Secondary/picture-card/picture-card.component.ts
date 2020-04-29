import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MoviePageComponent } from '../movie-page/movie-page.component';
import { Movie } from '../../Class/Movie/movie';


@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {

  @Input() movie: Movie;
  constructor(public dialog: MatDialog) { }

  openMoviePage(): void {
    this.dialog.open(MoviePageComponent, {
      data: this.movie
    });
  }
  ngOnInit(): void {
  }

}


