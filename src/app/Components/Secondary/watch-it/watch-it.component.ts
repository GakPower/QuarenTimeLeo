import { Component, OnInit } from '@angular/core';

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import { Movie } from '../../Class/Movie/movie';
import { MovieAPI } from '../../Class/MovieAPI/movie-api';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Component({
  selector: 'app-watch-it',
  templateUrl: './watch-it.component.html',
  styleUrls: ['./watch-it.component.scss']
})
export class WatchItComponent implements OnInit {

  // watchMeList = WatchMeMovies;
  movies: Movie[] = [];

  user: User;





  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    auth.currentUser.then(value => {
      this.user = value;
    });
  }

  ngOnInit(): void {

    this.db.collection('users').doc(this.user.uid).collection('recommended').get().subscribe(next => {

      this.movies = MovieAPI.getMovieByIds(next.docs[0].data().recomendations);
    })

  }

}
