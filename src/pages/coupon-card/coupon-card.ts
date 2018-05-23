import { Component } from '@angular/core';
import {
  AlertController, IonicPage,  NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Coupon} from "../../model/coupon";
import {Http} from "@angular/http";
import {NgForm} from "@angular/forms";
import {MyLinks} from "../../services/mylinks";

/**
 * Generated class for the CouponCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon-card',
  templateUrl: 'coupon-card.html',
})
export class CouponCardPage {
  coupon : Coupon;
  mode : string;


  constructor(private ml:MyLinks,private toastCtrl: ToastController,private alertCtrl: AlertController,private http : Http,private viewCtrl : ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.coupon=this.navParams.get('couponId');
    this.mode=this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponCardPage');
  }

  dismiss(customer : any){
    this.viewCtrl.dismiss(customer);
  }

  isFormTheSame(form : NgForm){
    if(this.coupon.name==form.value.name &&
      this.coupon.required_stamps==form.value.required_stamps)
      return true;
    return false;
  }

  onSubmit(form : NgForm){
    if(this.mode=='edit'){
      console.log(this.ml.base+this.ml.a_coupon_save+'&id='+this.coupon.id+'&name='+form.value.name+'&required='+form.value.required_stamps);
      this.http.get(this.ml.base+this.ml.a_coupon_save+'&id='+this.coupon.id+'&name='+form.value.name+'&required='+form.value.required_stamps)
        .map(res => res.json()).subscribe(data => {

        if (data.error != null) {
          const alert = this.alertCtrl.create({
            title: 'Error',
            message: data.message,
            buttons: [{
              text : 'Ok',
              handler: () => {
              }
            }]
          });
          alert.present();
        }else {
          const toast = this.toastCtrl.create({
            message: 'Οι αλλαγές αποθηκεύτηκαν.',
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 2000
          });
          toast.present();
          this.coupon.name=form.value.name;
          this.coupon.required_stamps=form.value.required_stamps;
          this.dismiss(this.coupon);
        }
      });
    }else if(this.mode=='add'){
      console.log(this.ml.base+this.ml.a_coupon_creation+'&name='+form.value.name+'&required='+form.value.required_stamps);
      this.http.get(this.ml.base+this.ml.a_coupon_creation+'&name='+form.value.name+'&required='+form.value.required_stamps)
        .map(res => res.json()).subscribe(data => {

        if (data.error != null) {
          const alert = this.alertCtrl.create({
            title: 'Error',
            message: data.message,
            buttons: [{
              text : 'Ok',
              handler: () => {
              }
            }]
          });
          alert.present();
        }else {
          const toast = this.toastCtrl.create({
            message: 'Το κουπόνι προστέθηκε επιτυχώς.',
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 2000
          });
          toast.present();

          this.dismiss(null);
        }
      });
    }

  }

}
