import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject } from '@angular/core'; 

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {



  constructor(
  public dialogRef: MatDialogRef<MoviePageComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
