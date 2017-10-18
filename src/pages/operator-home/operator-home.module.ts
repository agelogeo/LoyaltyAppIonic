import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperatorHomePage } from './operator-home';

@NgModule({
  declarations: [
    OperatorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(OperatorHomePage),
  ],
})
export class OperatorHomePageModule {}
