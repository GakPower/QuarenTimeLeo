import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-restorepassword',
  templateUrl: './restorepassword.component.html',
  styleUrls: ['./restorepassword.component.scss']
})
export class RestorepasswordComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';
  successMessage_2: string = '';
  user = new FormGroup({
    email: new FormControl(),
    });
  constructor(public auth: AngularFireAuth, private router: Router) { }

sendresetemail(): void {
  this.errorMessage = '';
  this.successMessage = '';
  this.successMessage_2 = '';
  this.auth.sendPasswordResetEmail(this.user.get('email').value)
  .then(() => {
    this.router.navigateByUrl('../login');
    //this.successMessage = "The email has been successfully sent, follow the link on the email to reset your password.";
    //this.successMessage_2 = "Back to login page";
  })
  .catch((e) => {
    switch (e.code) {
      case 'auth/invalid-email':
        this.errorMessage = 'EMAIL WITH WRONG FORMAT';
          break;
      case 'auth/user-not-found': 
      this.errorMessage = 'THE EMAIL ADDRESS IS NOT IN USE';
          break;
      default:
          console.log(e);
        }
    });
    this.user.reset();//reset all the values in the form
}

  ngOnInit(): void {
  }

}
