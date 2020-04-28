import { Component, } from '@angular/core';
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

  user = {
    fireUser: null,
    name: 'User Userson',
    email: '',
    // avatar: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm208batch7-adj-09.png?w=1000&dpr=1&fit=default&crop=default&auto=null&fm=png&q=75&vib=3&con=3&usm=15&bg=transparent&ixlib=js-2.2.1&s=bdad6d5b0b529765d41000ef8cffcaad',
    avatar: '\ud83d\udcbb',
  };

  topics = [
    // {title: 'Watch List', color: '#FFC857'}, {title: 'Favourite', color: '#E9724C'} , {title: 'Black List', color: '#C5283D'} , {title: 'Watched', color: '#255f85'}
  ];
  colors = [
    '#FFC857',
    '#E9724C',
    '#C5283D',
    '#255f85',
    '#9ed964'
  ];

  movies: Movie[] = [];
  cards = ['15661', '65161', '78913'];
  selectedTopic = -1;

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

      MovieAPI.getMostPopular().then(movies => {
        this.movies = movies;
      });
    });
  }

  addTopic() {
    this.topics.push({color: this.colors[4], title: 'Fav', movieIDs: []});

    this.db.collection('users').doc(this.user.fireUser.uid).update({
      lists: this.topics
    });
  }
  removeTopic(index) {
    this.topics.splice(index, 1);
  }
  clickedTopic(index) {
    this.selectedTopic = index;
    // this.movies = [];
    // this.topics[index].movieIDs.forEach(movieID => {
    //   MovieAPI.getMovie(movieID).then(result => {
    //     this.movies.push(result);
    //   });
    // });
    // console.log(this.movies);
    console.log(index);
  }

  removeCard(index) {
    this.cards.splice(index, 1);
  }
  changeAvatar(avatar: string){
    this.user.avatar =  avatar;
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
          this.topics.push({color, title, movieIDs});
        });

        // this.movies = [];
        // this.topics[0].movieIDs.forEach(movieID => {
        //   MovieAPI.getMovie(movieID).then(result => {
        //     this.movies.push(result);
        //   });
        // });
        // console.log(this.movies);
      });
  }

  private getColorIDOf(color: string): number {
    console.log(color);
    return this.colors.indexOf(color);
  }

}
