import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {environment} from '../../../../environments/environment';
import 'firebase/auth';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  user = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth: AngularFireAuth,
              private router: Router,
              private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  login(): void {
    this.errorMessage = '';

    console.log(this.user.get('email').value);
    console.log(this.user.get('password').value);

    this.auth.signInWithEmailAndPassword(this.user.get('email').value, this.user.get('password').value).then((credential) => {
        console.log('ONE');
        if (credential.user.emailVerified){
          console.log('Two');
          this.db.collection('users')
            .doc(credential.user.uid)
            .get().subscribe(next => {
              console.log('Three');
              if (next.data().takenSurvey) {
                this.router.navigate([`/mainpage`]);
              } else {
                this.router.navigate([`/poll`]);
              }
            });
        } else { // if the account is not verified we log out the user
          console.log('Four');
          this.errorMessage = 'your account is not verified, check your email';
          this.auth.signOut().catch((e) => console.log(e));
        }
      })
      .catch((e) => this.errorMessage = 'Incorrect email / password combination!');

    // reset all the values in the form
    this.user.reset();
  }
  onSignup() {
    this.router.navigate(['/register']);
  }
}
