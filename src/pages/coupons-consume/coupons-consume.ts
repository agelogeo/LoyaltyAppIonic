import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams, ViewController
} from 'ionic-angular';
import {Http} from "@angular/http";
import {Coupon} from "../../model/coupon";
import {MyLinks} from "../../services/mylinks";
import {Customer} from "../../model/customer";

/**
 * Generated class for the CouponsConsumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupons-consume',
  templateUrl: 'coupons-consume.html',
})
export class CouponsConsumePage {
  originalCustomer : Customer;
  coupons : any;

  constructor(private viewCtrl: ViewController,private alertCtrl:AlertController,private http: Http,private ml : MyLinks,private loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.originalCustomer=this.navParams.get('customerId');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CouponsHomePage');
    this.getCoupons();
  }

  getCoupons(){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.ml.loading_html,
      cssClass: 'loading',
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
          console.log(this.originalCustomer.stamps +" required : "+item.required_stamps);
          if(this.originalCustomer.stamps >= parseInt(item.required_stamps)){
            const c = new Coupon();
            c.id=item.id;
            c.name=item.name;
            c.required_stamps=item.required_stamps;
            coupons.push(c);
          }
        }
        this.coupons=coupons;
      }
    });

  }

  onTapCoupon(coupon : Coupon, i : number){
    const alert = this.alertCtrl.create({
      title: 'Είστε σίγουρος;',
      message: 'Θα αφαιρεθούν οι απαιτούμενες σφραγίδες απο τον χρήστη',
      buttons: [
        {
          text : 'Ακύρωση',
          role : 'cancel',
          handler : () => {
          }
        },
        {
          text : 'Εξαργύρωση',
          handler: () => {
            this.ConsumeCoupon(coupon,i);
          }
        }
      ]
    });
    alert.present();

  }

  ConsumeCoupon(coupon : Coupon, i : number){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.ml.loading_html,
      cssClass: 'loading',
      duration: 5000
    });
    loading.present();
    let date = new Date();
    console.log(this.ml.base+this.ml.a_get_db+this.ml.a_stamp_change_remove+'&id='+this.originalCustomer.id+'&value='+coupon.required_stamps+'&coupon='+coupon.id+'&date='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&hours='+date.getHours());
    this.http.get(this.ml.base+this.ml.a_get_db+this.ml.a_stamp_change_remove+'&id='+this.originalCustomer.id+'&value='+coupon.required_stamps+'&coupon='+coupon.id+'&date='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&hours='+date.getHours())
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
        this.originalCustomer.stamps=this.originalCustomer.stamps-coupon.required_stamps;
        this.viewCtrl.dismiss(this.originalCustomer);
      }
    });
  }
}
