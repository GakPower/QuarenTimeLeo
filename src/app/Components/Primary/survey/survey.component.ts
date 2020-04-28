import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  constructor() { }

  geners: string [] = ['Action', 'Romance', 'War', 'Fantasy', 'Family', 'Science-fiction']; 


  ngOnInit(): void {
  }

}
