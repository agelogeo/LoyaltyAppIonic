import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperatorLoginPage } from './operator-login';

@NgModule({
  declarations: [
    OperatorLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(OperatorLoginPage),
  ],
})
export class OperatorLoginPageModule {}
