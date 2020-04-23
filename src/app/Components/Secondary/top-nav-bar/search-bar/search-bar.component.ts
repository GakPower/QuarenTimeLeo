import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  loggedInUser = false;
  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedInUser = true;
      } else {
        this.loggedInUser = false;
      }
    });
  }

  ngOnInit(): void {
  }

}
