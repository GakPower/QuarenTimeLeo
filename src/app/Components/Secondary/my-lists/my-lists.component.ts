import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Class/Movie/movie';
import { MovieAPI } from '../../Class/MovieAPI/movie-api';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {
  MostPopular = true;
  New = false;


  // WatchedList = WatchedMovies;
  MostPopularList: Movie[] = [];
  NewMovies: Movie[] = [];

  constructor() {}

  ngOnInit(): void {
    MovieAPI.getUpcoming().then(movies => {
      this.NewMovies = movies;
    });

    MovieAPI.getMostPopular().then(movies => {
      this.MostPopularList = movies;
    })
  }

  selectMostPopular() {
    this.MostPopular = true,
      this.New = false;

  }
  selectNew() {
    this.MostPopular = false,
      this.New = true;

  }
}
