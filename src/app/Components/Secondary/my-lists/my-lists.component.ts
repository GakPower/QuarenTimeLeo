import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Class/Movie/movie';
import { MovieAPI } from '../../Class/MovieAPI/movie-api';
import { MatDialog } from '@angular/material/dialog';
import { MoviePageComponent } from '../movie-page/movie-page.component';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {
  selectedCategoryIndex = 0;

  MostPopularList: Movie[] = [];
  NewMovies: Movie[] = [];
  showedMovies: Movie[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    MovieAPI.getMostPopular().then(movies => {
      this.MostPopularList = movies;
      this.showedMovies = movies;
    });
    MovieAPI.getUpcoming().then(movies => {
      this.NewMovies = movies;
    });
  }

  openMoviePage(movie: Movie): void {
    this.dialog.open(MoviePageComponent, {
      data: movie
    });
  }

  changeSelectedCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.showedMovies = index === 0 ? this.MostPopularList : this.NewMovies;
  }
}
