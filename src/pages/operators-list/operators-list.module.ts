import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperatorsListPage } from './operators-list';

@NgModule({
  declarations: [
    OperatorsListPage,
  ],
  imports: [
    IonicPageModule.forChild(OperatorsListPage),
  ],
})
export class OperatorsListPageModule {}
