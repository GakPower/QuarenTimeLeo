import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PictureCardComponent } from './Components/Secondary/picture-card/picture-card.component';
import { WatchItComponent } from './Components/Secondary/watch-it/watch-it.component';
import { RegistrationComponent } from './Components/Secondary/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//imported for filling forms

@NgModule({
  declarations: [
    AppComponent,
    PictureCardComponent,
    WatchItComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
     ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
