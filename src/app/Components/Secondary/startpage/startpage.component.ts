import { Component, OnInit } from '@angular/core';
//remember to import and inject the routing modules

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  /*btnClick= function () {
    this.router.navigateByUrl('/user');//where there is user we should insert the route
};*/

btnClick= function () {//this is only temporary until when we add routing
  console.log("it works!");
};

}

