import { Component, OnInit } from '@angular/core';
import { Movie } from '../../my-lists/listOption';
import { TopTenMovies } from '../../my-lists/myLists';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MoviePageComponent } from '../../movie-page/movie-page.component';

export interface Dialogdata{
 
  MovieName: String; 
  MoviePic: String; 
  Moviedesc: String; 
  MovieBackGround: String; 
  MovieRating: number; 

  }

@Component({
  selector: 'app-top-ten-movie',
  templateUrl: './top-ten-movie.component.html',
  styleUrls: ['./top-ten-movie.component.scss']
})
export class TopTenMovieComponent implements OnInit {

  
  topTenMovies = TopTenMovies;

  constructor(public dialog: MatDialog) { }




  ngOnInit(): void {
  }
  openMoviePage(movie: Movie): void {
    const dialogRef = this.dialog.open(MoviePageComponent, {
      data: {
        MovieName: movie.MovieName, MovieDesc: movie.MovieDesc, MoviePic: movie.MoviePic, 
        MovieBackGround: movie.MovieBackGround, MovieRating: movie.MovieRating
      }
      
    });
    console.log(movie.MovieName)
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.previousContainer) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.topTenMovies, event.previousIndex, event.currentIndex);
    }

  }

}
