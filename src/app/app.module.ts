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
import { PollComponent } from './Components/Secondary/poll/poll.component';
import { ProfileComponent } from './Components/Primary/profile/profile.component';
import { CardComponent } from './Components/Secondary/card/card.component';
import { TopTenComponent } from './Components/Secondary/top-10/top-ten/top-ten.component';
import { RouterModule} from '@angular/router';

import { TopNavBarComponent } from './Components/Secondary/top-nav-bar/top-nav-bar.component';
import { SearchBarComponent } from './Components/Secondary/top-nav-bar/search-bar/search-bar.component';
import { NavButtonsComponent } from './Components/Secondary/top-nav-bar/nav-buttons/nav-buttons.component';

import { TopTenMovieComponent } from './Components/Secondary/top-10/top-ten-movie/top-ten-movie.component';
import { TopicComponent } from './Components/Secondary/topic/topic.component';
import { LoginComponent } from './Components/Secondary/login/login.component';
import { RestorepasswordComponent } from './Components/Secondary/restorepassword/restorepassword.component';
import { StartpageComponent } from './Components/Secondary/startpage/startpage.component';
import { MoviePageComponent } from './Components/Secondary/movie-page/movie-page.component';


const routes = [  
  {path: '', component: StartpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: ':username/poll', component: PollComponent}  
/*  {path: 'register', component: RegisterComponent},
  {path: 'chat', component: ChatComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**',   redirectTo: '/login', pathMatch: 'full' },*/
];


@NgModule({
  declarations: [
    AppComponent,
    PictureCardComponent,
    WatchItComponent,
    TopTenComponent,
    TopNavBarComponent,
    SearchBarComponent,
    NavButtonsComponent,
    TopTenMovieComponent,
    RegistrationComponent,
    PollComponent,
    ProfileComponent,
    CardComponent,
    WatchItComponent,
    TopTenComponent,
    LoginComponent,
    RestorepasswordComponent,
    StartpageComponent,
    MoviePageComponent,
    TopTenComponent,
    TopicComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
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
