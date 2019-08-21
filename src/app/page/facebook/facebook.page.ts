import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.page.html',
  styleUrls: ['./facebook.page.scss'],
})
export class FacebookPage implements OnInit {
  
  loading: any;
  facebook: any;
  isLoggedIn:boolean = false;
  users: any;
  constructor(
    private navCtrl: NavController,
     private fb: Facebook, 
     public loadingCtrl: LoadingController,
      private plt: Platform,
       public afAuth: AngularFireAuth,
       public loadingController: LoadingController,
       private fireAuth: AngularFireAuth,
       private router: Router

  ) { }

  // facebookLogin(){
  //   return this.facebook.login4(['email'])
  //     .then( response => {
  //       const facebookCredential = firebase.auth.FacebookAuthProvider
  //         .credential(response.authResponse.accessToken);
  
  //       firebase.auth().signInWithCredential(facebookCredential)
  //         .then( success => { 
  //           console.log("Firebase success: " + JSON.stringify(success)); 
  //         });
  
  //     }).catch((error) => { console.log(error) });
  // }
  
  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }


  // for facebook login



  async login() {

    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.onLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + error)
      });
  }
  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/profile"]);
        this.loading.dismiss();
      })

  }
  onLoginError(err) {
    console.log(err);
  }
  
  // ngOnInit() {
  
  // }
}
