import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  constructor(private router: Router) {}

  setRating(number:number){

  }

  ngOnInit(): void {
  }

  onStart() {
    this.router.navigateByUrl('/start');
  }
}
