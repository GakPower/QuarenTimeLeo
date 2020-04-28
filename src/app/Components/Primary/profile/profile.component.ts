import { Component, } from '@angular/core';
import {Movie} from '../../Class/Movie/movie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user = {
    name: 'User Userson',
    avatar: '😈',
    email: 'test@gmail.com'
  };

  topics = [
    {title: 'Watch List', color: '#64c7d9'}, {title: 'Favourite', color: 'red'} ,{title: 'Black List', color: 'purple'} , {title: 'watched', color: 'purple'}
  ];

  WatchList: Movie[] = [];
  cards = ['15661', '65161', '78913'];
  selectedTopic = -1;

  clickedProfile = false;

  clickedAvatar = false;

  constructor() { }

  addTopic() {
    this.topics.push({title: 'Fav2', color: '#9ed964'});
  }
  removeTopic(index) {
    this.topics.splice(index, 1);
  }
  clickedTopic(index) {
    this.selectedTopic = index;
  }

  removeCard(index) {
    this.cards.splice(index, 1);
  }
}
