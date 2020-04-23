import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  user = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
    });

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }
  login(): void {
    this.errorMessage = '';
    this.auth.signInWithEmailAndPassword(this.user.get('email').value, this.user.get('password').value)//logging in
    .then((credential) => {
      if(credential.user.emailVerified){
      console.log(credential.user.displayName);//this is only used to check that we actually log in
      // DO YOUR REDIRECTION HERE
    }else{//if the account is not verified we log out the user
      this.errorMessage = 'YOUR ACCOUNT IS NOT VERIFIED, CHECK YOUR EMAIL';
      this.auth.signOut().catch((e) => console.log(e));
    }
    })
    .catch((e) => this.errorMessage = "INCORRECT EMAIL/PASSWORD COMBINATION!");
    this.user.reset();//reset all the values in the form
  }
  
}
