import { Component } from '@angular/core';
import {
  AlertController, App, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {AccountService} from "../../services/account";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";
import {Operator} from "../../model/operator";
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";

/**
 * Generated class for the OperatorSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operator-settings',
  templateUrl: 'operator-settings.html',
})
export class OperatorSettingsPage {
  operator = new Operator();

  constructor(private toastCtrl: ToastController,private loadingCtrl : LoadingController,private alertCtrl: AlertController,private http : Http,private app:App,private storage: Storage,private accountService:AccountService,public navCtrl: NavController, public navParams: NavParams) {
    this.operator=this.navParams.get('operatorId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorSettingsPage');
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
    if(this.operator.first_name==form.value.name &&
      this.operator.last_name==form.value.surname &&
      this.operator.phone==form.value.phone &&
      this.operator.username==form.value.username)
      return true;
    return false;
  }

  onSaveOperator(form : NgForm){
    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_save&id='+this.operator.id+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_save&id='+this.operator.id+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone)
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
        this.operator.first_name=form.value.name;
        this.operator.last_name=form.value.surname;
        this.operator.phone=form.value.phone;
        //this.dismiss(this.originalCustomer);
      }
    });
  }
}
