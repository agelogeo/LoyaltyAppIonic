import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponsHomePage } from './coupons-home';

@NgModule({
  declarations: [
    CouponsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CouponsHomePage),
  ],
})
export class CouponsHomePageModule {}
