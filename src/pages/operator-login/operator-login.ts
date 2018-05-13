import {Component, Injectable} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {TabsPage} from "../operator-tabs/operator-tabs";
import {MyLinks} from "../../services/mylinks";
import {Operator} from "../../model/operator";
import {FileTransferObject, FileTransfer} from "@ionic-native/file-transfer";
import {AccountService} from "../../services/account";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the OperatorLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var cordova: any;

@IonicPage()
@Injectable()
@Component({
  selector: 'page-operator-login',
  templateUrl: 'operator-login.html',
})
export class OperatorLoginPage {

  remember : boolean = false;

  constructor(private myLinks:MyLinks,private storage: Storage,private transfer: FileTransfer,private accountService : AccountService,private ml: MyLinks,public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController,private alertCtrl:AlertController,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorLoginPage');
  }

  onLoginOperator(form : NgForm){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.myLinks.loading_html,
      cssClass: 'loading',
      duration: 5000
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
        const toast = this.toastCtrl.create({
          message: 'You logged in successfully',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 2000
        });
        loading.dismiss();
        toast.present();

        const operator = new Operator();
        operator.id=data.id;
        operator.username = data.username;
        operator.password = data.password;
        operator.access_level = data.access_level;
        operator.first_name = data.first_name;
        operator.last_name = data.last_name;
        operator.phone = data.phone;
        operator.same_day_twice = data.same_day_twice;
        operator.stamp_value = data.stamp_value;

        this.accountService.LogIn('operator',operator);
        console.log(operator);

        if(this.remember){
          this.storage.set('accountService',this.accountService).then( () => console.log('accountService saved.'));
        }else{
          this.storage.set('accountService',null).then( () => console.log('accountService set to null.'));
        }


        /**/
        this.navCtrl.setRoot(TabsPage,{operator: this.accountService.operator});


      }
    });
  }
}
