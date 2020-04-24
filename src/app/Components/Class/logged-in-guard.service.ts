import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {loggedIn} from '@angular/fire/auth-guard';

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
    console.log(this.loggedIn);
    return this.loggedIn;
  }
}
