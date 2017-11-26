import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperatorAdminsPage } from './operator-admins';

@NgModule({
  declarations: [
    OperatorAdminsPage,
  ],
  imports: [
    IonicPageModule.forChild(OperatorAdminsPage),
  ],
})
export class OperatorAdminsPageModule {}
