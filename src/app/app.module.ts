import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PictureCardComponent } from './Components/Secondary/picture-card/picture-card.component';
import { WatchItComponent } from './Components/Secondary/watch-it/watch-it.component';
import { PollComponent } from './Components/Secondary/poll/poll.component';
import { ProfileComponent } from './Components/Primary/profile/profile.component';

import { CardComponent } from './Components/Secondary/card/card.component';
import { TopTenComponent } from './Components/Secondary/top-10/top-ten/top-ten.component';
import { TopTenMovieComponent } from './Components/Secondary/top-10/top-ten-movie/top-ten-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    PictureCardComponent,
    WatchItComponent,
    TopTenComponent,
    TopTenMovieComponent,
    PollComponent,
    ProfileComponent,
    CardComponent,
    WatchItComponent,
    TopTenComponent
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
