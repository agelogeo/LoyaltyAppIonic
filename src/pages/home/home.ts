import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import 'rxjs';
import {Logger} from "@ionic/app-scripts/dist/logger/logger";
import {CustomerHomePage} from "../customer-home/customer-home";
import {CustomerLoginPage} from "../customer-login/customer-login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController,private loadingCtrl: LoadingController,private http: Http,private alertCtrl:AlertController) {

  }

  onCreateCustomer(form : NgForm){


    const loading = this.loadingCtrl.create({
      content : 'Signin you up..'
    });
    loading.present();

    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_creation&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_creation&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone)
      .map(res => res.json()).subscribe(data => {

        if (data.error != null) {
          const alert = this.alertCtrl.create({
            title: 'Error',
            message: data.message,
            buttons: [{
              text : 'Ok',
              handler: () => {
                loading.dismiss();
              }
            }]
          });
          alert.present();
        }else {
          const alert = this.alertCtrl.create({
            title: 'Success',
            message: 'You account have been created successfully.',
            buttons: [{
              text : 'Ok',
              handler: () => {
                loading.dismiss();
              }
            }]
          });
          alert.present();
          this.navCtrl.push(CustomerHomePage,{name : form.value.name, surname : form.value.surname, phone : form.value.phone});
        }
    });
    console.log("Test");
  }

  goToLogin(){
    this.navCtrl.push(CustomerLoginPage);
  }

}
