import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatabaseStatsPage } from './database-stats';

@NgModule({
  declarations: [
    DatabaseStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(DatabaseStatsPage),
  ],
})
export class DatabaseStatsPageModule {}
