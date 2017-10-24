import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DatabaseStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-database-stats',
  templateUrl: 'database-stats.html',
})
export class DatabaseStatsPage {

  customers : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatabaseStatsPage');
  }

  ionViewWillEnter(){
    this.customers=this.navParams.get('customers');
  }

}
