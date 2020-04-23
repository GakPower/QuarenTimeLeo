import { Component, OnInit } from '@angular/core';
import { Movie } from '../../my-lists/listOption';
import { TopTenMovies } from '../../my-lists/myLists';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-top-ten-movie',
  templateUrl: './top-ten-movie.component.html',
  styleUrls: ['./top-ten-movie.component.scss']
})
export class TopTenMovieComponent implements OnInit {
  topTenMovies = TopTenMovies; 

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>){
    if(event.previousContainer !== event.previousContainer){
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.topTenMovies, event.previousIndex, event.currentIndex);
    }

  }

}
