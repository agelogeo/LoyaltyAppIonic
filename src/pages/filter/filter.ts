import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'page-filter',
  template: `
    <ion-list radio-group>
      <ion-list-header>
        Sort Filter
      </ion-list-header>

      <ion-item>
        <ion-label>Default</ion-label>
        <ion-radio checked="true" value="default" (click)="onAction('default')"></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>Name</ion-label>
        <ion-radio value="name" (click)="onAction('name')"></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>Stamps</ion-label>
        <ion-radio value="stamps" (click)="onAction('stamps')"></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>Barcode</ion-label>
        <ion-radio value="barcode" (click)="onAction('barcode')"></ion-radio>
      </ion-item>

      <ion-item>
        <ion-label>Visits</ion-label>
        <ion-radio value="visits" (click)="onAction('visits')"></ion-radio>
      </ion-item>
    </ion-list>
  `
})

export class FilterPage{
  constructor(private viewCtrl: ViewController){}

  onAction(action: string){
    this.viewCtrl.dismiss({action: action});
  }
}

