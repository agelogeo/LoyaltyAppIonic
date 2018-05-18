import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {Http} from "@angular/http";
import {Coupon} from "../../model/coupon";
import {CouponCardPage} from "../coupon-card/coupon-card";
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

  constructor(private modalCtrl:ModalController,private toastCtrl:ToastController,private alertCtrl:AlertController,private http: Http,private ml : MyLinks,private loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
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

  onDelete(coupon:Coupon,i : number){
    console.log(coupon);
    console.log(i);
    const alert = this.alertCtrl.create({
      title: 'ΠΡΟΣΟΧΗ !!!',
      message: 'Αμα διαγράψετε το κουπόνι αυτό θα διαγράψτε και τους μετρητές που σχετίζονται με αυτο.Δεν θα μπορείτε να ανακτήσετε αυτό το κουπόνι.',
      buttons: [
        {
          text : 'Ακύρωση',
          role : 'cancel',
          handler : () => {
          }
        },
        {
          text : 'Διαγραφή',
          handler: () => {
            this.deleteCoupon(coupon,i);
          }
        }
      ]
    });
    alert.present();
  }

  deleteCoupon(coupon:Coupon,i : number){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.ml.loading_html,
      cssClass: 'loading',
      duration: 5000
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_coupon_deletion+'&id='+coupon.id);
    this.http.get(this.ml.base+this.ml.a_coupon_deletion+'&id='+coupon.id)
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
        this.coupons.splice(i,1);
        const toast = this.toastCtrl.create({
          message: 'Το κουπόνι '+coupon.name+ ' διαγράφτηκε επιτυχώς',
          duration: 1500,
        });
        toast.present();
      }
    });
  }

  onLoadCouponCard(coupon:Coupon,i : number){
    let modal = this.modalCtrl.create(CouponCardPage,{ couponId: coupon,mode : 'edit'});
    modal.onDidDismiss(coupon => {
      if (coupon != null) {
        this.coupons[i] = coupon;
      }
      //this.openDatabaseStats('default');
    });
    modal.present();
  }

  onAddCoupon(){
    let modal = this.modalCtrl.create(CouponCardPage,{ couponId: null,mode : 'add'});
    modal.onDidDismiss(coupon => {
      if (coupon != null) {
        this.getCoupons();
      }
      //this.openDatabaseStats('default');
    });
    modal.present();
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

  }
}
