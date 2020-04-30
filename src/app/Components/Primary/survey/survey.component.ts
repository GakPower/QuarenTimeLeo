import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Class/Movie/movie';
import { MovieAPI } from '../../Class/MovieAPI/movie-api';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  MovieList: Movie[] = []; 

  constructor() { }

  geners: string [] = ['Action', 'Romance', 'War', 'Fantasy', 'Family', 'Science-fiction']; 


  ngOnInit(): void {

    MovieAPI.getMostPopular().then(movies => {
      this.MovieList = movies; 
    })
  }

}
