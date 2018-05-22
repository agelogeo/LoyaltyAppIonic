import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import {NgForm} from "@angular/forms";

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  constructor(public emailComposer: EmailComposer,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(form : NgForm){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send

        this.emailComposer.requestPermission().then((granted : boolean) => {
          if(granted){
            let email = {
              to: 'agelogeo@gmail.com',
              subject: 'Loyalty App feedback from '+form.value.name,
              body: form.value.message+' '+form.value.mail,
              isHtml: false,
              app: "gmail"
            };

            this.emailComposer.open(email);
          }
        });

        this.emailComposer.hasPermission().then( () => {

            let email = {
              to: 'agelogeo@gmail.com',
              subject: 'Loyalty App feedback from '+form.value.name,
              body: form.value.message+' '+form.value.mail,
              isHtml: false,
              app: "gmail"
            };
          this.emailComposer.open(email);
        });



      }
    });
  }

}
