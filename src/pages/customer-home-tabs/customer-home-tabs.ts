import {Component} from "@angular/core";

import {QrPage} from "../qr/qr";
import {NavParams} from "ionic-angular";
import {CustomerHomePage} from "../customer-home/customer-home";

@Component({
  selector: 'customer-page-tabs',
  template: `
    <ion-tabs color="dark">
      <ion-tab [root]="homePage" tabTitle="Home" tabIcon="home" [rootParams]="homeParams"></ion-tab>
      <ion-tab [root]="scanPage" tabTitle="Deals" tabIcon="book" ></ion-tab>
    </ion-tabs>
  `
})
export class CustomerHomeTabsPage{
  homePage = CustomerHomePage;
  scanPage : any;
  homeParams : any;

  constructor(private params: NavParams) {

    console.log(this.params); // returns NavParams {data: Object}
    this.homeParams = this.params;
  }


}
