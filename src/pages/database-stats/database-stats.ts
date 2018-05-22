import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams,
   ToastController
} from 'ionic-angular';
import {Customer} from "../../model/customer";
import {Http} from "@angular/http";
import {MyLinks} from "../../services/mylinks";
import {StatsPage} from "../stats/stats";
import {CustomerCardPage} from "../customer-card/customer-card";
import {AccountService} from "../../services/account";

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
  showSearchBar : boolean = false;
  customers : any;
  fullCustomers : any;


  constructor(public aS:AccountService,private myLinks : MyLinks,private modalCtrl: ModalController,private toastCtrl:ToastController,public actionSheetCtrl: ActionSheetController,private ml: MyLinks,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private http:Http,private loadingCtrl:LoadingController) {
  }


  ionViewWillEnter(){
    this.openDatabaseStats('default');
  }

  onFilter(){

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
      spinner: 'hide',
      content: this.myLinks.loading_html,
      cssClass: 'loading',
      duration: 5000
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
      title: 'Είστε σίγουρος;',
      message: 'Δεν θα μπορείτε να ανακτήσετε αυτόν τον πελάτη.',
      buttons: [
        {
        text : 'Ακύρωση',
        role : 'cancel',
        handler : () => {
        }
        },
        {
        text : 'Διαγραφή',
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
      spinner: 'hide',
      content: this.myLinks.loading_html,
      cssClass: 'loading',
      duration: 5000
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
          message: customer.name+' '+customer.surname+' διαγράφτηκε επιτυχώς.',
          duration: 1500,
        });
        toast.present();
      }
    });
  }

  onStats(){
    this.navCtrl.push(StatsPage);
  }

  onLoadCustomerCard(customer:Customer,i : number){
    let modal = this.modalCtrl.create(CustomerCardPage,{ customerId: customer,mode : 'edit'});
    modal.onDidDismiss(customer => {
      if (customer != null) {
        this.customers[i] = customer;
      }
        //this.openDatabaseStats('default');
    });
    modal.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.onSearchCancel();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.customers = this.customers.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.surname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.phone.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.barcode.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onSearchCancel(){
    this.customers=this.fullCustomers;
  }

  onToggleSearchBar(){
    if(this.showSearchBar)
      this.showSearchBar=false;
    else{
      this.showSearchBar=true;
      this.fullCustomers=this.customers;
    }
  }
}
