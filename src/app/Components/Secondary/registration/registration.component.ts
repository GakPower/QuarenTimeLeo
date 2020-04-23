import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  errorMessage: string = '';
  user = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    repeat: new FormControl()
  });

  constructor(public auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }


register(): void {
  
  this.errorMessage = '';
  var saveusername:string = this.user.get('username').value;//we need to save this in a variable because of scope
  
  if(this.user.get('password').value.length < 8){//check for custom made response input error
    this.errorMessage = 'PASSWORD TOO SHORT, MINIMUM OF 8 CHARACTERS';
  } else if(this.user.get('password').value === this.user.get('repeat').value){//check for custom made response input error
      this.auth.createUserWithEmailAndPassword(this.user.get('email').value, this.user.get('password').value)
        .then((credential) => {
          credential.user.updateProfile({
          displayName: saveusername,
          }) .then(() => {
                // console.log(credential.user.displayName),  // testing purposes
              credential.user.sendEmailVerification().catch((e) => console.log(e));  //send email verification                                                 
              this.router.navigate([`../${saveusername}/poll`]);                    // THE QUOTATION ARE IMPORTANT !!!!
              })
    
        //when router functioning we redirect the user to another page 
        })
        .catch((e) => {
          switch (e.message) {
            case 'The email address is badly formatted.':
              this.errorMessage = 'EMAIL WITH WRONG FORMAT';
              break;
            case 'The email address is already in use by another account.': 
              this.errorMessage = 'THE EMAIL ADDRESS IS ALREADY IN USE';
              break;
            default:
              console.log(e);
          }
        });
    } else{//check for custom made response input error
        this.errorMessage = 'PASSWORD MISMATCH';
      }
  
      this.user.reset();//reset all the values in the form
}



}
