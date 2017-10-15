import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerLoginPage } from './customer-login';

@NgModule({
  declarations: [
    CustomerLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerLoginPage),
  ],
})
export class CustomerLoginPageModule {}
