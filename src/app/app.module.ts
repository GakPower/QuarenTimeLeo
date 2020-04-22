import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PictureCardComponent } from './Components/Secondary/picture-card/picture-card.component';
import { WatchItComponent } from './Components/Secondary/watch-it/watch-it.component';
import { TopTenComponent } from './Components/Secondary/top-10/top-ten/top-ten.component';
import { TopTenMovieComponent } from './Components/Secondary/top-10/top-ten-movie/top-ten-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    PictureCardComponent,
    WatchItComponent,
    TopTenComponent,
    TopTenMovieComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
