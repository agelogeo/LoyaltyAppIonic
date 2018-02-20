import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-share',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h4>Choose your platform</h4>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button icon-left outline round block color="menuText" (click)="onAction('android')"><ion-icon name="logo-android"></ion-icon>Android</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button icon-left outline block round color="menuText" (click)="onAction('ios')"><ion-icon name="logo-apple"></ion-icon>iOS</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button icon-left outline block round color="menuText"  (click)="onAction('windows')"><ion-icon name="logo-windows"></ion-icon>Windows</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})

export class SharePage{
  constructor(private viewCtrl: ViewController){}

  onAction(action: string){
    this.viewCtrl.dismiss({action: action});
  }
}
