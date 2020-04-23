import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

//remember to import and inject the routing modules

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSignup() { 
    this.router.navigateByUrl('/register');
  }
  onLogin() {
    //console.log("suvvess")
    this.router.navigateByUrl('/login');
  };



}

