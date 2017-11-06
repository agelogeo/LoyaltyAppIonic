import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { Chart } from 'chart.js';
import {MyLinks} from "../../services/mylinks";
import {Http} from "@angular/http";
import {PieChartForm} from "../../model/piechartForm";
import {LineChartForm} from "../../model/linechartForm";

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {


  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  title:any;
  Linetitle:any;
  results = [];
  myDate : string;



  constructor(private actionSheetCtrl:ActionSheetController,private ml: MyLinks,public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController,private alertCtrl:AlertController,private toastCtrl: ToastController) {
  }

  pieChartForm = new PieChartForm();
  lineChartForm = new LineChartForm();

  getDate(){

    this.makeTheLineCall(this.myDate.slice(0,10),'5','Today');
  }

  lineChartSettings(){
    var date = new Date();
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Chart Line - Choose free dimension',
      buttons: [
        {
          text: 'Today',
          role: 'destructive',
          handler: () => {

            this.makeTheLineCall('2017-11-6','5','Today');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  pieChartSettings(){
    var date = new Date();
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Chart Pie - Choose free dimension',
      buttons: [
        {
          text: 'Today',
          role: 'destructive',
          handler: () => {

            this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'-1','Today');
          }
        },{
          text: 'Yesterday',
          handler: () => {
            this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'1','Yesterday');
          }
        },{
          text: 'Last week',
          handler: () => {
            this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'7','Last week');
          }
        },{
          text: 'Last month',
          handler: () => {
            this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'30','Last month');
          }
        },{
          text: 'Last 6 months',
          handler: () => {
            this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'180','Last 6 months');
          }
        },{
          text: 'Last year',
          handler: () => {
            this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'365','Last year');
          }
        },{
          text: 'All Time',
          handler: () => {
            this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'1000','All Time');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  getAvailableMonths(){
    return this.results;
  }

  makeThePieCall(date : string, hours : string, interval : string, title : string){
    this.title=title;
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_get_pie_chart+'&date='+date+'&interval='+interval+'&hours='+hours);
    this.http.get(this.ml.base+this.ml.a_get_pie_chart+'&date='+date+'&interval='+interval+'&hours='+hours)
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

        this.pieChartForm = new PieChartForm();
        for(var i=0;i<data.results.length;i++){
          this.pieChartForm.names.push(data.results[i].name);
          this.pieChartForm.counts.push(data.results[i].count);
          this.pieChartForm.getRandomColor();
        }
        this.startPieChart(title);
      }
    });

  }

  makeTheLineCall(date : string, hours : string, title : string){
    this.Linetitle=title;
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_get_visits_by_day+'&date='+date+'&hours='+hours);
    this.http.get(this.ml.base+this.ml.a_get_visits_by_day+'&date='+date+'&hours='+hours)
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

        this.lineChartForm = new LineChartForm();
        for(var i=0;i<data.results.length;i++){
          this.lineChartForm.names.push(data.results[i].datetime);
          this.lineChartForm.data.push(data.results[i].visits);
          this.lineChartForm.getRandomColor();
        }
        this.startLineChart(date);
      }
    });

  }

  ionViewDidLoad() {
    this.myDate = new Date().toISOString();
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_get_available_months);
    this.http.get(this.ml.base+this.ml.a_get_available_months)
      .map(res => res.json()).subscribe(data => {

      if (data.error != null) {
        const toast = this.toastCtrl.create({
          message: data.message
        });
        toast.present();
      }else {
        loading.dismiss();
        for(var i=0;i<data.results.length;i++){
          this.results.push(data.results[i].MONTH);
        }
      }
    });




    var date = new Date();
    this.makeThePieCall((date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString(),date.getHours().toString(),'1000','All Time');

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }

    });





  }

  startPieChart(selected : string){
    this.title = 'Used coupons '+selected;
    if(this.doughnutChart!=null)
      this.doughnutChart.destroy();
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: this.pieChartForm.names,
        datasets: [{
          label: '% of coupons used',
          data: this.pieChartForm.counts,
          backgroundColor: this.pieChartForm.colors,
          hoverBackgroundColor: this.pieChartForm.hover_colors
        }]
      },
      options : {
        animation: {
          duration : 3000
        }
      }

    });
  }

  startLineChart(selected : string){
    this.Linetitle = 'Total visits : '+selected;
    if(this.lineChart!=null)
      this.lineChart.destroy();
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.lineChartForm.names,
        datasets: [
          {
            label: "Total Visits",
            fill: false,
            lineTension: 0.1,
            backgroundColor: this.lineChartForm.colors,
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.lineChartForm.data,
            spanGaps: false,
          }
        ]
      }

    });
  }
}
