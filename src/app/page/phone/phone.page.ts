import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../service/window.service';
import * as firebase from 'firebase';
import { PhoneNumber } from '../../phone';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  constructor(private win: WindowService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }
  
  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  


}

}
