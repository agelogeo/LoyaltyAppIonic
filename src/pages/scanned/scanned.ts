import {Component, OnInit} from '@angular/core';
import { IonicPage,  NavController, NavParams} from 'ionic-angular';
import {Customer} from "../../model/customer";

/**
 * Generated class for the ScannedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanned',
  templateUrl: 'scanned.html',
})
export class ScannedPage implements OnInit{
  customer = new Customer();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.customer.id=this.navParams.get('id');
    this.customer.name=this.navParams.get('name');
    this.customer.surname=this.navParams.get('surname');
    this.customer.phone=this.navParams.get('phone');
    this.customer.barcode=this.navParams.get('barcode');
    this.customer.stamps=this.navParams.get('stamps');
    this.customer.coupons_used=this.navParams.get('coupons_used');
    this.customer.visits=this.navParams.get('visits');
    this.customer.last_visit=this.navParams.get('last_visit');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannedPage');
  }

  ionViewWillEnter(){

  }



  ngOnInit(){
    console.log(this.customer);
  }

}
