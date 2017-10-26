import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  PopoverController, ToastController
} from 'ionic-angular';
import {FilterPage} from "../filter/filter";
import {Customer} from "../../model/customer";
import {Http} from "@angular/http";
import {MyLinks} from "../../services/mylinks";

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

  constructor(private toastCtrl:ToastController,public actionSheetCtrl: ActionSheetController,private ml: MyLinks,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private popoverCtrl:PopoverController,private http:Http,private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatabaseStatsPage');
  }

  ionViewWillEnter(){
    this.openDatabaseStats('default');
  }

  onFilter(event: MouseEvent){
      /*const popover = this.popoverCtrl.create(FilterPage);
      popover.present({ev: event});
      popover.onDidDismiss(
        data => {
          if (data == null) {

          }else{
            this.openDatabaseStats(data.action);
          }
        }
      )*/

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort Filter',
      buttons: [
        {
          text: 'Default',
          role: 'destructive',
          handler: () => {
            this.openDatabaseStats('default');
          }
        },{
          text: 'Name',
          handler: () => {
            this.openDatabaseStats('name');
          }
        },{
          text: 'Stamps',
          handler: () => {
            this.openDatabaseStats('stamps');
          }
        },{
          text: 'Barcode',
          handler: () => {
            this.openDatabaseStats('barcode');
          }
        },{
          text: 'Total Visits',
          handler: () => {
            this.openDatabaseStats('visits');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();

  }

  openDatabaseStats(filter:string){
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_get_db+'&filter='+filter);
    this.http.get(this.ml.base+this.ml.a_get_db+'&filter='+filter)
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
        loading.dismiss();
        var customers : Customer[] = [];

        for(var item of data.results){
          const c = new Customer();
          c.id=item.id;
          c.name=item.name;
          c.surname=item.surname;
          c.phone=item.phone;
          c.barcode=item.barcode;
          c.stamps=item.stamps;
          c.coupons_used=item.coupons_used;
          c.visits=item.visits;
          c.last_visit=item.last_visit;
          customers.push(c);
        }
        this.customers=customers;
      }
    });

  }

  onDelete(customer:Customer,i : number){
    console.log(customer);
    console.log(i);
    const alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'If you click Yes ,you won\'t be able to recover this customer',
      buttons: [
        {
        text : 'No',
        role : 'cancel',
        handler : () => {
        }
        },
        {
        text : 'Delete',
          handler: () => {
            this.deleteCustomer(customer,i);
          }
        }
      ]
    });
    alert.present();
  }

  deleteCustomer(customer:Customer,i : number){
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_customer_deletion+'&id='+customer.id);
    this.http.get(this.ml.base+this.ml.a_customer_deletion+'&id='+customer.id)
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
        loading.dismiss();
        this.customers.splice(i,1);
        const toast = this.toastCtrl.create({
          message: customer.name+' '+customer.surname+' was removed successfully',
          duration: 1500,
        });
        toast.present();
      }
    });
  }
}
