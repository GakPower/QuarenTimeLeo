import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MoviePageComponent } from '../movie-page/movie-page.component';
<<<<<<< HEAD
import { WatchedMovies} from '../my-lists/myLists'; 
=======
import {Movie} from '../../Class/Movie/movie';
>>>>>>> 43f521ef31b9f3accd15a8b56599114484145365

@Component({
  selector: 'app-my-lists-movie',
  templateUrl: './my-lists-movie.component.html',
  styleUrls: ['./my-lists-movie.component.scss']
})
export class MyListsMovieComponent implements OnInit {
<<<<<<< HEAD
  @Input() Option1: boolean; 
  @Input() WatchedList: Movie[]; 
  watchedMovies = WatchedMovies; 
=======
  @Input() Option1: boolean;
  @Input() WatchedList: Movie[];
>>>>>>> 43f521ef31b9f3accd15a8b56599114484145365

  constructor(public dialog: MatDialog) { }

  openMoviePage(movie: Movie): void {
  this.dialog.open(MoviePageComponent, {
    data: movie
  });
}
  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>){
<<<<<<< HEAD


    if(event.previousContainer.id !== event.previousContainer.id){
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex); 
      console.log(event)

    } else {
      moveItemInArray(this.WatchedList, event.previousIndex, event.currentIndex);
      console.log(event) 

=======
    if (event.previousContainer.id !== event.previousContainer.id){
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.WatchedList, event.previousIndex, event.currentIndex);
>>>>>>> 43f521ef31b9f3accd15a8b56599114484145365
    }
  }
}
