import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponsConsumePage } from './coupons-consume';

@NgModule({
  declarations: [
    CouponsConsumePage,
  ],
  imports: [
    IonicPageModule.forChild(CouponsConsumePage),
  ],
})
export class CouponsConsumePageModule {}
