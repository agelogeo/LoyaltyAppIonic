import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannedPage } from './scanned';

@NgModule({
  declarations: [
    ScannedPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannedPage),
  ],
})
export class ScannedPageModule {}
