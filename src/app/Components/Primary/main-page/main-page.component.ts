import {Component, OnInit} from '@angular/core';
import { Movie } from '../../Class/Movie/movie';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import {MovieAPI} from '../../Class/MovieAPI/movie-api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  movies: Movie[] = [];
  user: User;
  input = '';

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth) {
    auth.currentUser.then(value => {
      this.user = value;
    });
  }

  updateInput(input) {
    this.input = input;
  }

  ngOnInit(): void {
    this.db.collection('users')
      .doc(this.user.uid)
      .get().subscribe(next => {
      MovieAPI.getMovieByIds(next.data().recommendations).then(result => {
        this.movies = result;
      });
    });
  }

}
