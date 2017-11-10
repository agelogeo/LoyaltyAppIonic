import {Component} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Customer} from "../../model/customer";
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";

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
  position : number;


  constructor(private toastCtrl: ToastController,private loadingCtrl : LoadingController,private alertCtrl: AlertController,private http : Http,private viewCtrl : ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.originalCustomer=this.navParams.get('customerId');
    this.position=this.navParams.get('position');
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
    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_save&id='+this.originalCustomer.id+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_save&id='+this.originalCustomer.id+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone)
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

}
