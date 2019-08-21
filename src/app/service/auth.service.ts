import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(   public angularFireAuth: AngularFireAuth,
    public router: Router
   
  ) {
    
    this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }
 
 
  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
 
  async register(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }
 
  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }
 
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
 
  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }
 
 
  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
 
  // async  loginWithGoogle() {
  //   return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  // }
 
  //  }
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }


loginUser(value){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then(
      res => resolve(res),
      err => reject(err))
  })
 }
 
 logoutUser(){
  return new Promise((resolve, reject) => {
    if(firebase.auth().currentUser){
      firebase.auth().signOut()
      .then(() => {
        console.log("LOG Out");
        resolve();
      }).catch((error) => {
        reject();
      });
    }
  })
}

userDetails(){
  return firebase.auth().currentUser;
}

async  loginWithGoogle() {
  return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

async  loginWithfacebook() {
  return await this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
}

async  loginWithtwitter() {
  return await this.angularFireAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
}

}
