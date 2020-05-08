import { Component } from '@angular/core';
import {Movie} from './Components/Class/Movie/movie';
import {MovieAPI} from './Components/Class/MovieAPI/movie-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movie: Movie;

  constructor() {
    MovieAPI.getMostPopular().then(movies => {
      this.movie = movies[0];
    });
  }
}
