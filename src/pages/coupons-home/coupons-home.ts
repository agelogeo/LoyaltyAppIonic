import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Coupon} from "../../model/coupon";
import {MyLinks} from "../../services/mylinks";
import {Http} from "@angular/http";

/**
 * Generated class for the CouponsHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupons-home',
  templateUrl: 'coupons-home.html',
})
export class CouponsHomePage {
  coupons : any;

  constructor(private alertCtrl:AlertController,private http: Http,private ml : MyLinks,private loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponsHomePage');
    this.getCoupons();
  }

  getCoupons(){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.ml.loading_html,
      duration: 5000
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_get_db+this.ml.a_get_coupons);
    this.http.get(this.ml.base+this.ml.a_get_db+this.ml.a_get_coupons)
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
        var coupons : Coupon[] = [];

        for(var item of data.results){
          const c = new Coupon();
          c.id=item.id;
          c.name=item.name;
          c.required_stamps=item.required_stamps;

          coupons.push(c);
        }
        this.coupons=coupons;
      }
    });

  }
}
