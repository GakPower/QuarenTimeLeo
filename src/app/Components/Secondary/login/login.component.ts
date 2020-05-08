import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage = '';
  user = new FormGroup({
  email: new FormControl(),
  password: new FormControl()
  });

  constructor(private auth: AngularFireAuth,
              private router: Router,
              private db: AngularFirestore) {}

  login(): void {
    this.errorMessage = '';

    this.auth.signInWithEmailAndPassword(this.user.get('email').value, this.user.get('password').value).then((credential) => {
        if (credential.user.emailVerified){
          this.db.collection('users')
            .doc(credential.user.uid)
            .get().subscribe(next => {
              if (next.data().takenSurvey) {
                this.router.navigate([`/mainpage`]);
              } else {
                this.router.navigate([`/poll`]);
              }
            });
        } else { // if the account is not verified we log out the user
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
