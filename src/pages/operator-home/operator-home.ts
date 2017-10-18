import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Operator} from "../../model/operator";

/**
 * Generated class for the OperatorHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operator-home',
  templateUrl: 'operator-home.html',
})
export class OperatorHomePage implements OnInit{

  operator = new Operator();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.operator.id=this.navParams.get('id');
    this.operator.username=this.navParams.get('username');
    this.operator.password=this.navParams.get('password');
    this.operator.access_level=this.navParams.get('access_level');
    this.operator.first_name=this.navParams.get('first_name');
    this.operator.last_name=this.navParams.get('last_name');
    this.operator.phone=this.navParams.get('phone');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorHomePage');
  }

  ngOnInit(){
    console.log(this.operator);
  }
}
