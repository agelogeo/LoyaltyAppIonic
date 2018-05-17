import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperatorCardPage } from './operator-card';

@NgModule({
  declarations: [
    OperatorCardPage,
  ],
  imports: [
    IonicPageModule.forChild(OperatorCardPage),
  ],
})
export class OperatorCardPageModule {}
