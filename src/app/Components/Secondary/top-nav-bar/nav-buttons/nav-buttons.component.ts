import { Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {MoviePageComponent} from '../../movie-page/movie-page.component';
import {MovieAPI} from '../../../Class/MovieAPI/movie-api';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent {

  user: User;

  constructor(private auth: AngularFireAuth,
              private db: AngularFirestore,
              private dialog: MatDialog) {
    auth.currentUser.then(value => {
      this.user = value;
    });
  }

  logout() {
    this.auth.signOut();
  }

  getRandomMovie() {
    this.db.collection('users')
      .doc(this.user.uid)
      .collection('recommended')
      .get().subscribe(next => {
        let movieIDs = [];
        //const movieIDs = [];
        console.log(next);
        next.docs.forEach(doc => {
          movieIDs = doc.data().recomendations;
         // movieIDs.push(doc.data().id);
          console.log(movieIDs); 
        });

        const randomIndex = Math.floor(Math.random() * movieIDs.length);

        MovieAPI.getMovie(movieIDs[randomIndex]).then(movie => {
          this.dialog.open(MoviePageComponent, {
            data: movie
          });
        });
      });
  }

}
