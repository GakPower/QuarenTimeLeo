import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  loggedIn = false;
  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe(next => {
      this.loggedIn = next != null;
    });
  }

  canActivate(): boolean {
    return this.loggedIn;
  }
}
