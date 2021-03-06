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
import {MyLinks} from "../../services/mylinks";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage implements OnInit{



  constructor(private myLinks : MyLinks,private storage: Storage,private accountService:AccountService,public navCtrl: NavController,private loadingCtrl: LoadingController,private http: Http,private alertCtrl:AlertController) {

  }

  ngOnInit(){
    if((<any>window).cordova){



      console.log('HOME WILL ENTER');

      /*const loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: this.myLinks.loading_html,
        cssClass: 'loading',
        duration: 1000
      });
      loading.present();*/


      this.storage.get('accountService')
        .then( (acc : AccountService) => {
          console.log('acc : '+acc);
          if(acc!=null){
            this.accountService = acc;
            if(acc.loggedIn){
              if(acc.role=='customer'){
                this.navCtrl.setRoot(CustomerHomeTabsPage,{customer : acc.customer});
              }else if(acc.role=='operator'){
                this.navCtrl.setRoot(TabsPage,{operator : acc.operator});

              }

            }
          }
          //loading.dismiss();
        })
        .catch( err => console.log(err));


    }
  }

  onCreateCustomer(form : NgForm){


    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.myLinks.loading_html,
      cssClass: 'loading',
      duration: 1000
    });
    loading.present();

    console.log(this.myLinks.base+this.myLinks.a_customer_creation+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone);
    this.http.get(this.myLinks.base+this.myLinks.a_customer_creation+'&name='+form.value.name+'&surname='+form.value.surname+'&phone='+form.value.phone)
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
