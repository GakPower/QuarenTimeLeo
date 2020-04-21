import { Component, OnInit } from '@angular/core';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'; 

@Component({
  selector: 'app-watch-it',
  templateUrl: './watch-it.component.html',
  styleUrls: ['./watch-it.component.scss']
})
export class WatchItComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
