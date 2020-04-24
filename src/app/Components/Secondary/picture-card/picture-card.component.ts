import { Component, OnInit, Input } from '@angular/core';
import { Movie } from'../my-lists/listOption'; 
import { MatDialog } from '@angular/material/dialog';

import { MoviePageComponent } from '../movie-page/movie-page.component';


@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {

  @Input() watchMeList: Movie[]; 
  constructor(public dialog: MatDialog) { }

    openMoviePage(movie: Movie): void {
    const dialogRef = this.dialog.open(MoviePageComponent, {
      data: {
        MovieName: movie.MovieName, MovieDesc: movie.MovieDesc, MoviePic: movie.MoviePic, 
        MovieBackGround: movie.MovieBackGround, MovieRating: movie.MovieRating
      }
      
    });
  }
  

  ngOnInit(): void {
  }
  


}


