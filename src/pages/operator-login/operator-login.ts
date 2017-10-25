import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {TabsPage} from "../operator-tabs/operator-tabs";
import {MyLinks} from "../../services/mylinks";

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

  constructor(private ml: MyLinks,public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController,private alertCtrl:AlertController,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorLoginPage');
  }

  onLoginOperator(form : NgForm){
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_operator_login+'&username='+form.value.username+'&password='+form.value.password);
    this.http.get(this.ml.base+this.ml.a_operator_login+'&username='+form.value.username+'&password='+form.value.password)
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
        loading.dismiss();
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
