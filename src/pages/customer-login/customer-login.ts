import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {CustomerHomePage} from "../customer-home/customer-home";
import {Http} from "@angular/http";

/**
 * Generated class for the CustomerLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController,private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerLoginPage');
  }


  onLoginCustomer(form : NgForm){
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_login&username='+form.value.barcode);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_login&username='+form.value.barcode)
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
          message: 'You logged in successfully',
          buttons: [{
            text : 'Ok',
            handler: () => {
              loading.dismiss();
            }
          }]
        });
        alert.present();
        this.navCtrl.setRoot(CustomerHomePage,{id:data.id,
                                                      name:data.name,
                                                      surname:data.surname,
                                                      phone:data.phone,
                                                      barcode:data.barcode,
                                                      stamps:data.stamps,
                                                      coupons_used:data.coupons_used,
                                                      visits:data.visits,
                                                      last_visit:data.last_visit});
      }
    });
  }
}