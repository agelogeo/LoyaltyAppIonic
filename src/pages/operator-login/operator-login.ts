import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {TabsPage} from "../operator-tabs/operator-tabs";

/**
 * Generated class for the OperatorLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operator-login',
  templateUrl: 'operator-login.html',
})
export class OperatorLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController,private alertCtrl:AlertController,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorLoginPage');
  }

  onLoginOperator(form : NgForm){
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=operator_login&username='+form.value.username+'&password='+form.value.password);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=operator_login&username='+form.value.username+'&password='+form.value.password)
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
          position:'middle',
          duration: 2000
        });
        loading.dismiss();
        toast.present();
        this.navCtrl.setRoot(TabsPage,{id:data.id,
          username:data.username,
          password:data.password,
          access_level:data.access_level,
          first_name:data.first_name,
          last_name:data.last_name,
          phone:data.phone});
      }
    });
  }
}
