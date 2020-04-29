import { Component, OnInit } from '@angular/core';

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import {Movie} from '../../Class/Movie/movie';
import {MovieAPI} from '../../Class/MovieAPI/movie-api';

@Component({
  selector: 'app-watch-it',
  templateUrl: './watch-it.component.html',
  styleUrls: ['./watch-it.component.scss']
})
export class WatchItComponent implements OnInit {

  // watchMeList = WatchMeMovies;
  movies: Movie[] = [];

  constructor() { }

  ngOnInit(): void {
    MovieAPI.search('a').then(result => {
      this.movies = result;
    });
  }

}
