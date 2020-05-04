import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Movie } from '../../Class/Movie/movie';
import { MovieAPI } from '../../Class/MovieAPI/movie-api';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';




@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  user = {
    fireUser: null,
    name: '',
    email: '',
    avatar: '',
  };


  MovieRating: number;  // rarting provided by user on each movie
  index: number = 0;    // to keep position of movies a user skip without rating. 
  numberOfRatedMovies: number = 0; 
  userRatings: any[] = []; // The array that has the ratings of each user. 
                           //pos[0] = email, pos[1]= average rating. 
  MovieList: Movie[] = [];

  SumOfRatings: number = 0; //The sum of the total ratings of movies. 
  


  constructor(private router: Router, private auth: AngularFireAuth) {
    auth.currentUser.then(value => {
      this.user.fireUser = value;
      this.user.name = value.displayName;
      this.user.email = value.email;
    });
  }
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;
  ngOnInit(): void {
    this.userRatings = Array(9744).fill(0);
    this.userRatings[0] = this.user.email;

    MovieAPI.getMostPopular().then(movies => {
      this.MovieList = movies;
    })
   // console.log(this.user.email);
  }
  setRating(number: number) {
    this.MovieRating = number;
    this.numberOfRatedMovies = this.numberOfRatedMovies + 1;
    this.index = this.index + 1;
    this.userRatings[this.index + 1] = number; 
    this.SumOfRatings = this.SumOfRatings + number; 
   // console.table(this.userRatings);
  }
  skipRating() {
    this.index = this.index + 1;
  }
  onSubmitSurvey() {
    if(this.numberOfRatedMovies > 3) {
      this.router.navigate([`/mainpage`]);
      this.userRatings[1] = (this.SumOfRatings / this.numberOfRatedMovies); 
      //console.table(this.userRatings)
    } else {
    }
  }
}
