import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {CustomerHomePage} from "../customer-home/customer-home";
import {Http} from "@angular/http";
import {CustomerHomeTabsPage} from "../customer-home-tabs/customer-home-tabs";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private toastCtrl:ToastController,private loadingCtrl:LoadingController,private alertCtrl:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerLoginPage');
  }


  onLoginCustomer(form : NgForm){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="lds-css ng-scope">
  <div style="width:100%;height:100%" class="lds-wedges">
    <div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</div>`,
      duration: 3000
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
        const toast = this.toastCtrl.create({
          message: 'You logged in successfully',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 2000
        });
        loading.dismiss();
        toast.present();
        this.navCtrl.setRoot(CustomerHomeTabsPage,{id:data.id,
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
