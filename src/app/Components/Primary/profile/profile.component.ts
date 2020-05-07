import { Component, Input, EventEmitter, Output } from '@angular/core';
import {Movie} from '../../Class/Movie/movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {MovieAPI} from '../../Class/MovieAPI/movie-api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Input() immutable = false;



 


  user = {
    fireUser: null,
    name: 'User Userson',
    email: '',
    avatar: '\ud83d\udcbb',
  };
  
  topics = [];
  colors = [
    '#FFC857',
    '#E9724C',
    '#C5283D',
    '#255f85',
    '#9ed964'
  ];

  movies: Movie[] = [];
  ///???cards = ['15661', '65161', '78913'];
  selectedTopic = -1;
  

  sendEmail = false;
  disabledSendButton = false;

  clickedProfile = false;
  // \ud83d\ude06
  clickedAvatar = false;
  Saved = false;

  constructor(private auth: AngularFireAuth,
              private db: AngularFirestore) {
    auth.currentUser.then(value => {
      this.user.fireUser = value;
      this.user.name = value.displayName;
      this.user.email = value.email;

      this.loadLists();
    });
  }

  addTopic() {
    this.topics.push({ color: this.colors[4], title: 'Fav', movieIDs: [] });

    this.db.collection('users').doc(this.user.fireUser.uid).update({
      lists: this.topics
    });
  }
  
  removeTopic(index) {
    this.topics.splice(index, 1);
    this.selectedTopic = -1;
    this.db.collection('users').doc(this.user.fireUser.uid).update({
      lists: this.topics
    });
  }

  


  /////////BUG IS HERE///////////
  emitDeleteEvent(index) {
    console.log(this.movies[index]);
    this.topics[index].movieIDs.splice(index, 1);
    console.log(index);
    this.movies.splice(index, -1);
    this.db.collection('users').doc(this.user.fireUser.uid).update({
      lists: this.topics
    });
    console.log(this.movies);
  }
//////////////////////////////////

  clickedTopic(index) {
    this.selectedTopic = index;
    this.movies = [];
    this.topics[index].movieIDs.forEach(movieID => {
      MovieAPI.getMovie(movieID).then(result => {
        this.movies.push(result);
      });
    });
  }

  changeAvatar(avatar: string) {
    this.user.avatar = avatar;
  }

  loadLists() {
    this.db.collection('users')
      .doc(this.user.fireUser.uid)
      .get().subscribe(next => {
        this.user.avatar = String.fromCodePoint(next.data().icon);
        const lists = next.data().lists;
        this.topics = [];
        lists.forEach(list => {
          const color = list.color;
          const title = list.title;
          const movieIDs = list.movieIDs;
          this.topics.push({ color, title, movieIDs });
        });
      });
  }

  sendPassResetEmail() {
    this.disabledSendButton = true;
    this.auth.sendPasswordResetEmail(this.user.email).then(() => {
      this.sendEmail = true;
      setTimeout(() => {
        this.sendEmail = false;
        this.disabledSendButton = false;
      }, 3000);
    })
      .catch(() => {
        this.sendEmail = false;
        this.disabledSendButton = false;
      });
  }

}
