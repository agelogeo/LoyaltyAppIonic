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
import {CustomerHomeTabsPage} from "../pages/customer-home-tabs/customer-home-tabs";
import {DatabaseStatsPage} from "../pages/database-stats/database-stats";
import {FilterPage} from "../pages/filter/filter";
import {MyLinks} from "../services/mylinks";
import {StatsPage} from "../pages/stats/stats";
import {CustomerCardPage} from "../pages/customer-card/customer-card";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {FileTransfer} from "@ionic-native/file-transfer";
import {IonicStorageModule} from "@ionic/storage";
import {AccountService} from "../services/account";
import {CustomerSettingsPage} from "../pages/customer-settings/customer-settings";
import {OperatorSettingsPage} from "../pages/operator-settings/operator-settings";
import {CouponsHomePage} from "../pages/coupons-home/coupons-home";
import {CouponCardPage} from "../pages/coupon-card/coupon-card";
import {OperatorAdminsPage} from "../pages/operator-admins/operator-admins";
import {SharePage} from "../pages/share/share";
import {SocialSharing} from "@ionic-native/social-sharing";
import {OperatorsListPage} from "../pages/operators-list/operators-list";
import {OperatorCardPage} from "../pages/operator-card/operator-card";
import {CouponsConsumePage} from "../pages/coupons-consume/coupons-consume";
import {FeedbackPage} from "../pages/feedback/feedback";
import {EmailComposer} from "@ionic-native/email-composer";
import {AndroidPermissions} from "@ionic-native/android-permissions";

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
    ScannedPage,
    CustomerHomeTabsPage,
    DatabaseStatsPage,
    FilterPage,
    StatsPage,
    CustomerCardPage,
    CustomerSettingsPage,
    OperatorSettingsPage,
    CouponsHomePage,
    CouponCardPage,
    OperatorAdminsPage,
    SharePage,
    OperatorsListPage,
    OperatorCardPage,
    CouponsConsumePage,
    FeedbackPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    ScannedPage,
    CustomerHomeTabsPage,
    DatabaseStatsPage,
    FilterPage,
    StatsPage,
    CustomerCardPage,
    CustomerSettingsPage,
    OperatorSettingsPage,
    CouponsHomePage,
    CouponCardPage,
    OperatorAdminsPage,
    SharePage,
    OperatorsListPage,
    OperatorCardPage,
    CouponsConsumePage,
    FeedbackPage
  ],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    MyLinks,
    AccountService,
    InAppBrowser,
    FileTransfer,
    EmailComposer,
    AndroidPermissions,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
