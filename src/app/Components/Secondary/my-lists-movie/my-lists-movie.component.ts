import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MoviePageComponent } from '../movie-page/movie-page.component';
import {Movie} from '../../Class/Movie/movie';

@Component({
  selector: 'app-my-lists-movie',
  templateUrl: './my-lists-movie.component.html',
  styleUrls: ['./my-lists-movie.component.scss']
})
export class MyListsMovieComponent implements OnInit {
  @Input() Option1: boolean;
  @Input() WatchedList: Movie[];

  constructor(public dialog: MatDialog) { }

  openMoviePage(movie: Movie): void {
  this.dialog.open(MoviePageComponent, {
    data: movie
  });
}
  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>){
    if (event.previousContainer.id !== event.previousContainer.id){
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.WatchedList, event.previousIndex, event.currentIndex);
    }
  }
}
