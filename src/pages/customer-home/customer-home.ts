import {Component, OnInit, ViewChild} from '@angular/core';
import {Img, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Customer} from "../../model/customer";
import {InAppBrowser, InAppBrowserEvent} from '@ionic-native/in-app-browser';
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



  image2 : string;

  customer = new Customer();

  constructor(private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams) {
    this.customer.id=this.navParams.get('id');
    this.customer.name=this.navParams.get('name');
    this.customer.surname=this.navParams.get('surname');
    this.customer.phone=this.navParams.get('phone');
    this.customer.barcode=this.navParams.get('barcode');
    this.customer.stamps=this.navParams.get('stamps');
    this.customer.coupons_used=this.navParams.get('coupons_used');
    this.customer.visits=this.navParams.get('visits');
    this.customer.last_visit=this.navParams.get('last_visit');
    this.image2="https://chart.googleapis.com/chart?cht=qr&chl="+this.customer.barcode+"&chs=250x250";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerHomePage');
  }

  ngOnInit(){
    console.log(this.customer);
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

}
