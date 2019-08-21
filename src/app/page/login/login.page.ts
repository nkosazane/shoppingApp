import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { TwitterConnect, TwitterConnectResponse } from '@ionic-native/twitter-connect/ngx';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: HTMLIonLoadingElement;
  facebook: any;
  // facebook: any;
  // public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any;
  // authService: any;
  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public alertCtrl:AlertController,
    private twitter: TwitterConnect,
public loadingController: LoadingController
    
  ) { this.selectedVal = 'login';
  this.isForgotPassword = false; }

  // ionViewDidLoad() {
  //   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  // }
  // signIn(phoneNumber: number){
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+" + phoneNumber;
  
  //   firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then( confirmationResult => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //   })
  //   .catch(function (error) {
  //     console.error("SMS not sent", error);
  //   });
  
  // }

  ngOnInit() {
    
    // for validating
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

validation_messages = {
  'email': [
    { type: 'required', message: 'Email is required.' },
    { type: 'pattern', message: 'Please enter a valid email.' }
  ],
  'password': [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Password must be at least 5 characters long.' }
  ]
};

loginUser(value){
  this.authService.loginUser(value)
  .then(res => {
    console.log(res);
    this.errorMessage = "";
    this.navCtrl.navigateForward('/dashboard');
  }, err => {
    this.errorMessage = err.message;
  })
}
 // Open Popup to Login with Google Account
 googleLogin() {
  this.authService.loginWithGoogle()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateForward('/home')
      
      this.isUserLoggedIn();
    }, err => {
      this.showMessage("danger", err.message);
    });
}
// facebookLogin() {
  
//   this.authService.loginWithfacebook()
//     .then(res => {
//       console.log(res);
//      this.navCtrl.navigateForward('/home')
      
//       this.isUserLoggedIn();
//     }, err => {
//       this.showMessage("danger", err.message);
//     });
// }


goToRegisterPage(){
  this.navCtrl.navigateForward('/register');
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // Comman Method to Show Message and Hide after 2 seconds
  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }
 
  // Called on switching Login/ Register tabs
  public onValChange(val: string) {
    this.showMessage("", "");
    this.selectedVal = val;
  }
 
  // Check localStorage is having User Data
  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }
 
  // SignOut Firebase Session and Clean LocalStorage
  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  // Login user with  provided Email/ Password
  loginUser1() {
    this.responseMessage = "";
    this.authService.login(this.emailInput, this.passwordInput)
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In!");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  // Register user with  provided Email/ Password
  registerUser() {
    this.authService.register(this.emailInput, this.passwordInput)
      .then(res => {
 
        // Send Varification link in email
        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage("success", "Registration Successful! Please Verify Your Email");
        }, err => {
          this.showMessage("danger", err.message);
        });
        this.isUserLoggedIn();
 
 
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
  // Send link on given email to reset password
  forgotPassword() {
    this.authService.sendPasswordResetEmail(this.emailInput)
      .then(res => {
        console.log(res);
        this.isForgotPassword = false;
        this.showMessage("success", "Please Check Your Email");
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
 
// // facebook log in
// facebookLogin(): Promise<any> {
//   return this.facebook.loginWithfacebook(['email'])
//     .then( response => {
//       const facebookCredential = firebase.auth.FacebookAuthProvider
//         .credential(response.authResponse.accessToken);

//       firebase.auth().signInWithCredential(facebookCredential)
//         .then( success => { 
//           console.log("Firebase success: " + JSON.stringify(success)); 
//         });

//     }).catch((error) => { console.log(error) });
// }
 // Open Popup to Login with Google Account
 
 // Send link on given email to reset password
 facebookLogin() {
  this.authService.loginWithfacebook()
    .then(res => {
      console.log(res);
     
      this.showMessage("success", "Please Check Your Email");
      this.navCtrl.navigateForward('/home');
    }, err => {
      this.showMessage("danger", err.message);
    });
}
twitterlogin() {
  this.authService.loginWithtwitter()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateForward('/home')
      
      this.isUserLoggedIn();
    }, err => {
      this.showMessage("danger", err.message);
    });
}

  }


