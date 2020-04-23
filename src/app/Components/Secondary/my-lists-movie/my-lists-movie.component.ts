import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../my-lists/listOption';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-lists-movie',
  templateUrl: './my-lists-movie.component.html',
  styleUrls: ['./my-lists-movie.component.scss']
})
export class MyListsMovieComponent implements OnInit {
  @Input() Option1: boolean; 
  @Input() WatchedList: Movie[]; 

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>){

    if(event.previousContainer.id !== event.previousContainer.id){
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex); 

    } else {
      moveItemInArray(this.WatchedList, event.previousIndex, event.currentIndex); 
      

    }
  }
}
