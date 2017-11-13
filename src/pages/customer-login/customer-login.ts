import {Component, Injectable} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {CustomerHomeTabsPage} from "../customer-home-tabs/customer-home-tabs";
import {AccountService} from "../../services/account";
import {Customer} from "../../model/customer";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the CustomerLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Injectable()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {

  remember : boolean = false;

  constructor(private storage: Storage,private transfer: FileTransfer,private accountService : AccountService,public navCtrl: NavController, public navParams: NavParams,private http:Http,private toastCtrl:ToastController,private loadingCtrl:LoadingController,private alertCtrl:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerLoginPage');
  }


  onLoginCustomer(form : NgForm){

    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="lds-css ng-scope">
  <div style="width:100%;height:100%" class="lds-wedges">
    <div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</div>`,
      duration: 3000
    });
    loading.present();
    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_login&username='+form.value.barcode);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_login&username='+form.value.barcode)
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

        const c = new Customer();
        c.id=data.id;
        c.name = data.name;
        c.surname = data.surname;
        c.phone = data.phone;
        c.barcode = data.barcode;
        c.stamps = data.stamps;
        c.coupons_used = data.coupons_used;
        c.visits = data.visits;
        c.last_visit = data.last_visit;


        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = 'https://chart.googleapis.com/chart?cht=qr&chl='+c.barcode+'&chs=250x250';
        if ((<any>window).cordova) {
          // running on device/emulator
          fileTransfer.download(url, cordova.file.dataDirectory + c.barcode+'.png')
            .then((entry) => {
              console.log('download complete: ' + entry.toURL());
              console.log(entry);
              c.image_url = entry.toURL();
              this.accountService.LogIn('customer',c);

              if(this.remember){
                this.storage.set('accountService',this.accountService).then( () => console.log('accountService saved.'));
              }else{
                this.storage.set('accountService',null).then( () => console.log('accountService set to null.'));
              }

            }, (error) => {
              console.log('DOWNLOAD : '+error);
              // handle error
            });

        } else {
          // running in dev mode
          c.image_url = url;
        }


        /**/
        this.navCtrl.setRoot(CustomerHomeTabsPage,{customer: c});
      }
    });
  }
}
