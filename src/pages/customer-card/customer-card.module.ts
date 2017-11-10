import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCardPage } from './customer-card';

@NgModule({
  declarations: [
    CustomerCardPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCardPage),
  ],
})
export class CustomerCardPageModule {}
