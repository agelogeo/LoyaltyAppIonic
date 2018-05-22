import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {Http} from "@angular/http";
import {Coupon} from "../../model/coupon";
import {MyLinks} from "../../services/mylinks";
import {Operator} from "../../model/operator";
import {OperatorCardPage} from "../operator-card/operator-card";

/**
 * Generated class for the OperatorsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operators-list',
  templateUrl: 'operators-list.html',
})
export class OperatorsListPage {
  operators : any;



  ionViewDidLoad() {
    console.log('ionViewDidLoad OperatorsListPage');
  }

  constructor(private modalCtrl:ModalController,private toastCtrl:ToastController,private alertCtrl:AlertController,private http: Http,private ml : MyLinks,private loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CouponsHomePage');
    this.getOperators();
  }

  getOperators(){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.ml.loading_html,
      cssClass: 'loading',
      duration: 5000
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_get_db+this.ml.a_get_db+"&filter=operators");
    this.http.get(this.ml.base+this.ml.a_get_db+this.ml.a_get_db+"&filter=operators")
      .map(res => res.json()).subscribe(data => {

      if (data.error != null) {
        const alert = this.alertCtrl.create({
          title: 'Error',
          message: data.message,
          buttons: [{
            text : 'Ok',
            handler: () => {
              loading.dismiss();
            }
          }]
        });
        alert.present();
      }else {
        loading.dismiss();
        var operators : Operator[] = [];

        for(var item of data.results){
          const o = new Operator();
          o.id=item.id;
          o.username=item.username;
          o.password=item.password;
          o.access_level=item.access_level;
          o.first_name=item.first_name;
          o.last_name=item.last_name;
          o.phone=item.phone;

          operators.push(o);
        }
        this.operators=operators;
      }
    });

  }


  onDelete(operator:Operator,i : number){
    console.log(operator);
    console.log(i);
    const alert = this.alertCtrl.create({
      title: 'ΠΡΟΣΟΧΗ !!!',
      message: 'Αμα διαγράψετε τον συντονιστή δεν θα μπορείτε να ανακτήσετε τον λογαριασμό.',
      buttons: [
        {
          text : 'Ακύρωση',
          role : 'cancel',
          handler : () => {
          }
        },
        {
          text : 'Διαγραφή',
          handler: () => {
            this.deleteOperator(operator,i);
          }
        }
      ]
    });
    alert.present();
  }

  deleteOperator(operator:Operator,i : number){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.ml.loading_html,
      cssClass: 'loading',
      duration: 5000
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_operator_deletion+'&id='+operator.id);
    this.http.get(this.ml.base+this.ml.a_operator_deletion+'&id='+operator.id)
      .map(res => res.json()).subscribe(data => {

      if (data.error != null) {
        const alert = this.alertCtrl.create({
          title: 'Error',
          message: data.message,
          buttons: [{
            text : 'Ok',
            handler: () => {
              loading.dismiss();
            }
          }]
        });
        alert.present();
      }else {
        loading.dismiss();
        this.operators.splice(i,1);
        const toast = this.toastCtrl.create({
          message: 'Ο συντονιστής '+operator.first_name+' '+operator.last_name+ ' διαγράφτηκε επιτυχώς',
          duration: 1500,
        });
        toast.present();
      }
    });
  }

    onLoadOperatorCard(operator:Coupon,i : number){
      let modal = this.modalCtrl.create(OperatorCardPage,{ operatorId: operator,mode : 'edit'});
      modal.onDidDismiss(operator => {
        if (operator != null) {
          this.operators[i] = operator;
        }
        //this.openDatabaseStats('default');
      });
      modal.present();
    }

    onAddOperator(){
      let modal = this.modalCtrl.create(OperatorCardPage,{ operatorId: null,mode : 'add'});
      modal.onDidDismiss(operator => {
        if (operator != null) {
          this.getOperators();
        }
        //this.openDatabaseStats('default');
      });
      modal.present();
    }


}
