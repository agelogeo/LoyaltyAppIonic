import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import 'rxjs';
import {CustomerLoginPage} from "../customer-login/customer-login";
import {OperatorLoginPage} from "../operator-login/operator-login";
import {AccountService} from "../../services/account";
import {CustomerHomeTabsPage} from "../customer-home-tabs/customer-home-tabs";
import {TabsPage} from "../operator-tabs/operator-tabs";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage implements OnInit{



  constructor(private storage: Storage,private accountService:AccountService,public navCtrl: NavController,private loadingCtrl: LoadingController,private http: Http,private alertCtrl:AlertController) {

  }

  ngOnInit(){
    if((<any>window).cordova){

      console.log('HOME WILL ENTER');

      this.storage.get('accountService')
        .then( (acc : AccountService) => {
          console.log('acc : '+acc);
          if(acc!=null){
            this.accountService = acc;
            if(acc.loggedIn){
              if(acc.role=='customer'){
                this.navCtrl.setRoot(CustomerHomeTabsPage,{customer : acc.customer});
              }else if(acc.role=='operator'){
                this.navCtrl.setRoot(TabsPage,{id:acc.operator.id,
                  username:acc.operator.username,
                  password:acc.operator.password,
                  access_level:acc.operator.access_level,
                  first_name:acc.operator.first_name,
                  last_name:acc.operator.last_name,
                  phone:acc.operator.phone});
              }
            }
          }
        })
        .catch( err => console.log(err));

    }
  }

  onCreateCustomer(form : NgForm){


    const loading = this.loadingCtrl.create({
      content : 'Signin you up..'
    });
    loading.present();

    console.log('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_creation&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone);
    this.http.get('https://loyaltyapp.000webhostapp.com/loyalty.php?db=id755156_loyalty_db&action=customer_creation&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone)
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
        }else if(data.success == 1){
          const alert = this.alertCtrl.create({
            title: 'Success',
            message: 'You account have been created successfully.',
            buttons: [{
              text : 'Ok',
              handler: () => {
                loading.dismiss();
              }
            }]
          });
          alert.present();
          this.navCtrl.push(CustomerLoginPage,{phone : form.value.phone});
        }else{
          const alert = this.alertCtrl.create({
            title: 'Oups..',
            message: 'Something went wrong',
            buttons: [{
              text : 'Ok',
              handler: () => {
                loading.dismiss();
              }
            }]
          });
          alert.present();
        }

    });
    console.log("Test");
  }

  goToLogin(){
    this.navCtrl.push(CustomerLoginPage);
  }

  goToAdmin(){
    this.navCtrl.push(OperatorLoginPage);
  }

}
