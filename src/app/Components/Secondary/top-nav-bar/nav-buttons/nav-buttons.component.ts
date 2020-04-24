import { Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent {

  loggedInUser = false;

  constructor(private auth: AngularFireAuth,
              private router: Router) {
    firebase.initializeApp(environment.firebase);
    this.auth.onAuthStateChanged(user => {
      if (user && !this.loggedInUser) {
        this.loggedInUser = true;
        this.router.navigate(['test/mainpage']);
      } else if (!user) {
        this.loggedInUser = false;
      }
      // console.log(user);
    });

    if (firebase.auth().currentUser) {
      this.loggedInUser = true;
      // this.router.navigate(['test/mainpage']);
    }
  }

  logout() {
    this.auth.signOut();
  }

}
