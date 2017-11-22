import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponCardPage } from './coupon-card';

@NgModule({
  declarations: [
    CouponCardPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponCardPage),
  ],
})
export class CouponCardPageModule {}
