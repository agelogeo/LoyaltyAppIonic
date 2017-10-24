import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {FilterPage} from "../filter/filter";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private popoverCtrl:PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatabaseStatsPage');
  }

  ionViewWillEnter(){
    this.customers=this.navParams.get('customers');
  }

  onFilter(event: MouseEvent){
      const popover = this.popoverCtrl.create(FilterPage);
      popover.present({ev: event});
      popover.onDidDismiss(
        data => {
          if (data == null) {

          }else{
            if (data.action == "android"){

            } else if (data.action == "ios"){

            }else if (data.action == "windows"){

            }
          }
        }
      )

  }
}
