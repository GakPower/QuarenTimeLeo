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
    avatar: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm208batch7-adj-09.png?w=1000&dpr=1&fit=default&crop=default&auto=null&fm=png&q=75&vib=3&con=3&usm=15&bg=transparent&ixlib=js-2.2.1&s=bdad6d5b0b529765d41000ef8cffcaad',
    email: 'test@gmail.com'
  };
   
  topics = [
    {title: 'Watch List', color: '#FFC857'}, {title: 'Favourite', color: '#E9724C'} ,{title: 'Black List', color: '#C5283D'} , {title: 'Watched', color: '#255f85'}
  ];

  WatchList: Movie[] = [];
  cards = ['15661', '65161', '78913'];
  selectedTopic = -1;

  clickedProfile = false;

  clickedAvatar = false;
  Saved = false; 

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
  changeAvatar(avatar: string){
    this.user.avatar =  avatar; 
  }

  
}
