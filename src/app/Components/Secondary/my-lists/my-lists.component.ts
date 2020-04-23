import { Component, OnInit } from '@angular/core';
import { Movie } from '../my-lists/listOption';
import { WatchedMovies } from '../my-lists/myLists'; 


@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {
  Option3: Boolean = false; 
  Option2: Boolean = false; 
  Option1: Boolean = true;

  WatchedList = WatchedMovies; 
 
  

  constructor() { }

  ngOnInit(): void {
  }

  selectOption1(){

    this.Option3 = false, 
    this.Option2 = false, 
    this.Option1 = true; 

  }
  selectOption2(){
    this.Option3 = false, 
    this.Option1 = false, 
    this.Option2 = true; 

  }
  selectOption3(){

    this.Option1 = false, 
    this.Option2 = false, 
    this.Option3 = true; 
  }

  

}
