import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AccountService} from "../../services/account";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the OperatorSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operator-settings',
  templateUrl: 'operator-settings.html',
})
export class OperatorSettingsPage {

  constructor(private app:App,private storage: Storage,private accountService:AccountService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorSettingsPage');
  }

  onLogOut(){
    this.accountService.LogOut();
    this.storage.set('accountService',this.accountService)
      .then(() => {
        this.app.getRootNav().setRoot(HomePage);
        console.log('Log out successfully');
      })
      .catch( err => console.log(err));
  }
}
