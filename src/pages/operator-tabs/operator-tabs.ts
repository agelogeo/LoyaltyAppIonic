import {Component} from "@angular/core";
import {OperatorHomePage} from "../operator-home/operator-home";
import {QrPage} from "../qr/qr";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs color="dark">
      <ion-tab [root]="homePage" tabTitle="Αρχική" tabIcon="home" [rootParams]="homeParams"></ion-tab>
      <ion-tab [root]="scanPage" tabTitle="Σάρωση" tabIcon="qr-scanner" ></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage{
  homePage = OperatorHomePage;
  scanPage = QrPage;
  homeParams : any;

  constructor(private params: NavParams) {

    console.log(this.params); // returns NavParams {data: Object}
    this.homeParams = this.params;
  }


}
