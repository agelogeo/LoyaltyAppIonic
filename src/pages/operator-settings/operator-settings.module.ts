import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperatorSettingsPage } from './operator-settings';

@NgModule({
  declarations: [
    OperatorSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(OperatorSettingsPage),
  ],
})
export class OperatorSettingsPageModule {}
