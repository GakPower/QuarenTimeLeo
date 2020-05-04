import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Movie } from '../../Class/Movie/movie';
import { MovieAPI } from '../../Class/MovieAPI/movie-api';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {



  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  trailer: string;
  userId: string;
  movies: number[];
  constructor(public dialogRef: MatDialogRef<MoviePageComponent>,
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    @Inject(MAT_DIALOG_DATA) public data: Movie) {
    MovieAPI.getTrailer(data.id).then(result => {
      this.trailer = result;
    });
    auth.currentUser.then(value => {
      this.userId = value.uid;

    })
  }

  adding = false;


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  openTrailerOnNewTab() {
    if (this.trailer) {
      window.open(this.trailer, '_blank');
    }
  }

  emitClickedEvent() {
    this.clicked.emit();
  }

  addMovieToList(movieId: number) {
    this.db.collection('users').doc(this.userId).update({
      lists: [
        {
          title: 'Watch List',
          movieIDs: [].push(movieId), 
        }]
    })
  }

}