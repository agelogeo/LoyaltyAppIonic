import {Component} from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { timer } from 'rxjs/observable/timer';

import { HomePage } from '../pages/home/home';
import {AndroidPermissions} from "@ionic-native/android-permissions";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;

  showSplash = true;

  constructor(private androidPermissions: AndroidPermissions,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false)
    });

  }


}

