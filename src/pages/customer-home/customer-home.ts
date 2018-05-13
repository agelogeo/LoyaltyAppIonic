import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {App, Img, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Customer} from "../../model/customer";
import {InAppBrowser, InAppBrowserEvent} from '@ionic-native/in-app-browser';
import {Storage} from "@ionic/storage";
import {AccountService} from "../../services/account";
import {HomePage} from "../home/home";
import {CustomerSettingsPage} from "../customer-settings/customer-settings";
import QRCode from 'qrcode';

/**
 * Generated class for the CustomerHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-customer-home',
  templateUrl: 'customer-home.html',
})
export class CustomerHomePage implements OnInit{

  generated = '';
  customer = new Customer();

  constructor(private loadingCtrl: LoadingController,private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams) {
    this.customer = this.navParams.get('customer');


  }

  displayQrCode() {
    return this.generated !== '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerHomePage');
  }

  ngOnInit(){
    console.log(this.customer);
    const qrcode = QRCode;
      const self = this;
      qrcode.toDataURL(this.customer.barcode, { errorCorrectionLevel: 'H', scale : 10 }, function (err, url) {
        self.generated = url;
      })

  }

  openInAppBrowser(){
    const browser = this.iab.create('https://www.facebook.com/ionicframework/');

    browser.on('loadstop').subscribe((ev: InAppBrowserEvent)=>{

        browser.insertCSS(".youtube_done_button { position: absolute; top: 100px; width: 100%; background: rgba(255, 0, 0, 0.8); color: #2196F3; padding: 10px; font-size: 200px}");
        browser.executeScript("(function () { \n" +
          "    var body = document.querySelector('body'); \n" +
          "    var button = document.createElement('div'); \n" +
          "    button.innerHTML = 'Done'; \n" +
          "    button.classList.add('youtube_done_button');\n" +
          "    body.appendChild(button); \n" +
          "})();");
        browser.show();
    });
  }

  onSettings(){
    this.navCtrl.push(CustomerSettingsPage,{ customerId: this.customer,mode : 'edit'});
  }

}
