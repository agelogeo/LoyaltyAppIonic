import { Component } from '@angular/core';
import {
  AlertController, App, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AccountService} from "../../services/account";
import {Storage} from "@ionic/storage";
import {Customer} from "../../model/customer";
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";

/**
 * Generated class for the CustomerSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-settings',
  templateUrl: 'customer-settings.html',
})
export class CustomerSettingsPage {
  originalCustomer : Customer;
  mode : string;
  passwordToggle: boolean = false;
  notificationToggle: boolean = false;
  notificationValue: string = "notifications-off";

  constructor(private toastCtrl: ToastController,private loadingCtrl : LoadingController,private alertCtrl: AlertController,private http : Http,private app:App,private storage: Storage,private accountService:AccountService,public navCtrl: NavController, public navParams: NavParams) {
    this.originalCustomer=this.navParams.get('customerId');
    this.mode=this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSettingsPage');
  }

  onLogOut(){
    this.accountService.LogOut();
    this.storage.set('accountService',this.accountService)
      .then(() => {
        this.app.getRootNav().setRoot(HomePage);
        console.log('Log out successfully');
      })
      .catch( err => console.log(err));
  }

  isFormTheSame(form : NgForm){
    if(this.originalCustomer.name==form.value.name &&
      this.originalCustomer.surname==form.value.surname &&
      this.originalCustomer.phone==form.value.phone )
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
        //this.dismiss(this.originalCustomer);
      }
    });
  }

  isPasswordEnabled(){
    return this.passwordToggle;
  }

  isNotificationsEnabled(){
    return this.notificationToggle;
  }
}
