import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent implements OnInit, AfterContentInit {

  loggedInUser = false;

  constructor(private auth: AngularFireAuth,
              private router: Router) {
    this.auth.onAuthStateChanged(user => {
      if (user && !this.loggedInUser) {
        this.loggedInUser = true;
        this.router.navigate(['test/mainpage']);
      } else if (!user) {
        this.loggedInUser = false;
      }
      // console.log(user);
    });

    if (this.auth.currentUser) {
      this.loggedInUser = true;
      // this.router.navigate(['test/mainpage']);
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut();
  }

  ngAfterContentInit(): void {
  }

}
