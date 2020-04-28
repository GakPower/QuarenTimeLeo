import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MovieAPI} from '../../Class/MovieAPI/movie-api';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor(private router: Router) {
    // MovieAPI.getMostPopular().then(movies => {
    //   movies.forEach(movie => {
    //     MovieAPI.getTrailer(movie.id).then(trailer => {
    //       console.log(trailer);
    //     });
    //   });
    // });
    MovieAPI.getGenres([36]);

  }

  ngOnInit(): void {
  }

  onSignup() {
    this.router.navigateByUrl('/register');
  }
  onLogin() {
    this.router.navigateByUrl('/login');
  }
}

