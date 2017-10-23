import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpModule} from "@angular/http";
import {CustomerHomePage} from "../pages/customer-home/customer-home";
import {CustomerLoginPage} from "../pages/customer-login/customer-login";
import {OperatorHomePage} from "../pages/operator-home/operator-home";
import {OperatorLoginPage} from "../pages/operator-login/operator-login";
import { QRScanner } from '@ionic-native/qr-scanner';
import {QrPage} from "../pages/qr/qr";
import {TabsPage} from "../pages/operator-tabs/operator-tabs";
import {ScannedPage} from "../pages/scanned/scanned";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerHomePage,
    CustomerLoginPage,
    OperatorHomePage,
    OperatorLoginPage,
    QrPage,
    TabsPage,
    ScannedPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerHomePage,
    CustomerLoginPage,
    OperatorHomePage,
    OperatorLoginPage,
    QrPage,
    TabsPage,
    ScannedPage
  ],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
