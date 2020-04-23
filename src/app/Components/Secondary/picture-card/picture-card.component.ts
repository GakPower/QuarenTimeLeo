import { Component, OnInit, Input } from '@angular/core';
import { Movie } from'../my-lists/listOption'; 

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {

  @Input() watchMeList: Movie[]; 
  constructor() { }

  ngOnInit(): void {
  }

}
