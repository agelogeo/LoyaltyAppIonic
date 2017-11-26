import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AccountService} from "../../services/account";

/**
 * Generated class for the OperatorAdminsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operator-admins',
  templateUrl: 'operator-admins.html',
})
export class OperatorAdminsPage {
  operator : any;
  constructor(private aS:AccountService,public navCtrl: NavController, public navParams: NavParams) {
    this.operator=this.aS.operator;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorAdminsPage');
  }

  onSaveParams(form: NgForm){

  }

  isFormTheSame(form : NgForm){
    /*if(this.aS.operator.first_name==form.value.name &&
      this.aS.operator.last_name==form.value.surname &&
      this.aS.operator.phone==form.value.phone &&
      this.aS.operator.username==form.value.username)
      return true;
    return false;*/
  }

}
