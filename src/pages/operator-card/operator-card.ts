import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {Operator} from "../../model/operator";
import {MyLinks} from "../../services/mylinks";

/**
 * Generated class for the OperatorCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operator-card',
  templateUrl: 'operator-card.html',
})
export class OperatorCardPage {
  operator : Operator;
  mode : string;


  constructor(private ml:MyLinks,private toastCtrl: ToastController,private alertCtrl: AlertController,private http : Http,private viewCtrl : ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.operator=this.navParams.get('operatorId');
    this.mode=this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorCardPage');
  }

  dismiss(operator : any){
    this.viewCtrl.dismiss(operator);
  }

  isFormTheSame(form : NgForm){
    if(this.operator.username==form.value.username &&
      this.operator.password==form.value.password &&
      this.operator.access_level==form.value.access_level &&
      this.operator.first_name==form.value.first_name &&
      this.operator.last_name==form.value.last_name &&
      this.operator.phone==form.value.phone )
      return true;
    return false;
  }

  onSubmit(form : NgForm){
    if(this.mode=='edit'){
      console.log(this.ml.base+this.ml.a_operator_save+'&id='+this.operator.id+'&username='+form.value.username+'&password='+form.value.password+'&access_level='+form.value.access_level+'&first_name='+form.value.first_name+'&last_name='+form.value.last_name+'&phone='+form.value.phone);
      this.http.get(this.ml.base+this.ml.a_operator_save+'&id='+this.operator.id+'&username='+form.value.username+'&password='+form.value.password+'&access_level='+form.value.access_level+'&first_name='+form.value.first_name+'&last_name='+form.value.last_name+'&phone='+form.value.phone)
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
          //this.operator.name=form.value.name;
          //this.operator.required_stamps=form.value.required_stamps;
          this.dismiss(this.operator);
        }
      });
    }else if(this.mode=='add'){
      console.log(this.ml.base+this.ml.a_operator_creation+'&username='+form.value.username+'&password='+form.value.password+'&access_level='+form.value.access_level+'&first_name='+form.value.first_name+'&last_name='+form.value.last_name+'&phone='+form.value.phone);
      this.http.get(this.ml.base+this.ml.a_operator_creation+'&username='+form.value.username+'&password='+form.value.password+'&access_level='+form.value.access_level+'&first_name='+form.value.first_name+'&last_name='+form.value.last_name+'&phone='+form.value.phone)
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
            message: 'Ο συντονιστής προστέθηκε επιτυχώς.',
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 2000
          });
          toast.present();
          this.dismiss('');
        }
      });
    }

  }


}
