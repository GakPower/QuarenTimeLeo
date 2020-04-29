import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MovieAPI} from '../../Class/MovieAPI/movie-api';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onSignup() {
    this.router.navigateByUrl('/register');
  }
  onLogin() {
    this.router.navigateByUrl('/login');
  }
}

