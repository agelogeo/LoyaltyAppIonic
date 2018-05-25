import {Component} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Customer} from "../../model/customer";
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {MyLinks} from "../../services/mylinks";
import {CouponsConsumePage} from "../coupons-consume/coupons-consume";

/**
 * Generated class for the CustomerCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-card',
  templateUrl: 'customer-card.html',
})
export class CustomerCardPage {
  originalCustomer : Customer;
  mode : string;


  constructor(private modalCtrl: ModalController,private myLinks : MyLinks,private toastCtrl: ToastController,private loadingCtrl : LoadingController,private alertCtrl: AlertController,private http : Http,private viewCtrl : ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.originalCustomer=this.navParams.get('customerId');
    this.mode=this.navParams.get('mode');
  }

  dismiss(customer : any){
    this.viewCtrl.dismiss(customer);
  }

  isFormTheSame(form : NgForm){
   if(this.originalCustomer.name==form.value.name &&
     this.originalCustomer.surname==form.value.surname &&
     this.originalCustomer.phone==form.value.phone &&
     this.originalCustomer.barcode==form.value.barcode &&
     this.originalCustomer.stamps==form.value.stamps &&
     this.originalCustomer.coupons_used==form.value.coupons_used &&
     this.originalCustomer.visits==form.value.visits &&
     this.originalCustomer.last_visit==form.value.last_visit )
      return true;
   return false;
  }

  onSaveCustomer(form : NgForm){
    console.log(this.myLinks.base+this.myLinks.a_customer_save+'&id='+this.originalCustomer.id+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone);
    this.http.get(this.myLinks.base+this.myLinks.a_customer_save+'&id='+this.originalCustomer.id+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone)
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
          message: 'Changes were saved successfully.',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 2000
        });
        toast.present();
        this.originalCustomer.name=form.value.name;
        this.originalCustomer.surname=form.value.surname;
        this.originalCustomer.phone=form.value.phone;
        this.dismiss(this.originalCustomer);
      }
    });
  }

  onConsumeCoupon(){
    let modal = this.modalCtrl.create(CouponsConsumePage,{ customerId: this.originalCustomer });
    modal.onDidDismiss(customer => {
      if (customer != null) {
        this.originalCustomer = customer;
      }
      //this.openDatabaseStats('default');
    });
    modal.present();
  }

  onAddStamp(){
    let date = new Date();
    console.log("Current Date ",date.getHours(),date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate());
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.myLinks.loading_html,
      cssClass: 'loading',
      duration: 5000
    });
    loading.present();

    console.log(this.myLinks.base+this.myLinks.a_stamp_change_add+'&id='+this.originalCustomer.id+'&value=1&coupon=null&date='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&hours='+date.getHours());
    this.http.get(this.myLinks.base+this.myLinks.a_stamp_change_add+'&id='+this.originalCustomer.id+'&value=1&coupon=null&date='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&hours='+date.getHours())
      .map(res => res.json()).subscribe(data => {

      this.originalCustomer.stamps=data.stamps;

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
      }
    });
  }
}
