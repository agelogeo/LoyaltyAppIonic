import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import 'rxjs';
import {CustomerHomePage} from "../customer-home/customer-home";
import {CustomerLoginPage} from "../customer-login/customer-login";
import {OperatorLoginPage} from "../operator-login/operator-login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

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
        }else if(data.success == 1){
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
          this.navCtrl.push(CustomerLoginPage,{phone : form.value.phone});
        }else{
          const alert = this.alertCtrl.create({
            title: 'Oups..',
            message: 'Something went wrong',
            buttons: [{
              text : 'Ok',
              handler: () => {
                loading.dismiss();
              }
            }]
          });
          alert.present();
        }

    });
    console.log("Test");
  }

  goToLogin(){
    this.navCtrl.push(CustomerLoginPage);
  }

  goToAdmin(){
    this.navCtrl.push(OperatorLoginPage);
  }

}
