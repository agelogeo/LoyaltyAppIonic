import {Component, OnInit} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {ScannedPage} from "../scanned/scanned";
import {Http} from "@angular/http";
import {CustomerCardPage} from "../customer-card/customer-card";
import {Customer} from "../../model/customer";

/**
 * Generated class for the QrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage implements OnInit{


  constructor(private http:Http,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private viewCtrl: ViewController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private qrScanner: QRScanner,
              private toastCtrl:ToastController) {
  }

  ionViewWillEnter() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('AUTHORIZED!!!');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something '+text, text);
            let toast = this.toastCtrl.create({
              message : text,
              duration : 2000
            });
            toast.present();


            this.qrScanner.hide(); // hide camera preview
            this.hideCamera();
            scanSub.unsubscribe(); // stop scanning
            //this.navCtrl.push(ScannedPage,{barcode : text})
            this.goToScanned(text);
          });
          this.showCamera();
          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  ngOnInit(){

  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewWillLeave(){
    this.qrScanner.hide(); // hide camera preview
    this.hideCamera();
    this.qrScanner.disableLight();
    this.qrScanner.destroy();
  }

  goToScanned(barcode){

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
      duration: 5000
    });
    loading.present();

    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_login&username='+barcode);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_login&username='+barcode)
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
        let customer = new Customer();
        customer.id=data.id;
        customer.name=data.name;
        customer.surname=data.surname;
        customer.phone=data.phone;
        customer.barcode=data.barcode;
        customer.stamps=data.stamps;
        customer.coupons_used=data.coupons_used;
        customer.visits=data.visits;
        customer.last_visit=data.last_visit;
        this.navCtrl.push(CustomerCardPage,{customerId : customer,mode : 'scanned'});
        /*this.navCtrl.push(ScannedPage,{id:data.id,
          name:data.name,
          surname:data.surname,
          phone:data.phone,
          barcode:data.barcode,
          stamps:data.stamps,
          coupons_used:data.coupons_used,
          visits:data.visits,
          last_visit:data.last_visit});*/
      }
    });

  }

  toggleLight(){
    this.qrScanner.getStatus().then(res =>{
      if(res.canEnableLight){
        if(res.lightEnabled)
          this.qrScanner.disableLight();
        else
          this.qrScanner.enableLight();
      }
    });
  }

  toggleCamera(){
    this.qrScanner.getStatus().then(data=>{
      if(data.canChangeCamera){
        if(data.currentCamera==0)
          this.qrScanner.useFrontCamera();
        else
          this.qrScanner.useBackCamera();
      }
    })
  }

  manualCode(){
    let prompt = this.alertCtrl.create({
      title: 'Χειροκίνητη εισαγωγή',
      message: 'Παρακαλώ εισάγεται τον κωδικό ή το τηλέφωνο του πελάτη',
      inputs: [
        {
          name: 'barcode',
          type: 'number',
          placeholder: 'Κωδικός ή τηλέφωνο'
        }
      ],
      buttons: [
        {
          text: 'Ακύρωση',
          role: 'cancel'
        },
        {
          text: 'Έλεγχος',
          handler: data => {
            console.log(data);
            this.goToScanned(data.barcode);

          }
        }
      ]
    });
    prompt.present();
  }
}
