import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  current = 1;
  total = 10;
  answerType = 0;
  question = '';
  answers = [];

  selectedIndex = -1;

  questions = [
    {question: 'What movie is your favorite?', answerType: 0, answers: [
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg'
      ]},
    {question: 'hello', answerType: 1, answers: []},
    {question: 'hi', answerType: 2, answers: []},
  ];
  constructor(public auth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
    this.answerType = this.questions[this.current - 1].answerType;
    this.question = this.questions[this.current - 1].question;
    this.answers = this.questions[this.current - 1].answers;
  }

  goToNext() {
    if (this.current === this.total) {
      this.router.navigate([`/mainpage`]);
    }
    if (this.current < this.total) {
      this.current++;
    }
    this.answerType = this.questions[this.current - 1].answerType;
    this.question = this.questions[this.current - 1].question;
    this.answers = this.questions[this.current - 1].answers;
  }

  goToBack() {
    if (this.current > 1) {
      this.current--;
    }
    this.answerType = this.questions[this.current - 1].answerType;
    this.question = this.questions[this.current - 1].question;
    this.answers = this.questions[this.current - 1].answers;
  }

}
