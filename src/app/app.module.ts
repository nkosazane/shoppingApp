import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import {TwitterConnect} from '@ionic-native/twitter-connect/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './service/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase';
 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyDSTZ7yJxkV5do7tpcSkg0tCeeBmNCRN_g",
  authDomain: "shopphingapp.firebaseapp.com",
  databaseURL: "https://shopphingapp.firebaseio.com",
  projectId: "shopphingapp",
  storageBucket: "shopphingapp.appspot.com",
  messagingSenderId: "501255727670",
  appId: "1:501255727670:web:add88239c7f9d763"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,  
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFirestoreModule,
     AngularFireAuthModule,
     ReactiveFormsModule
    
    ],
  providers: [

    StatusBar,
    SplashScreen,
    AuthService,
    Facebook,
    TwitterConnect,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
