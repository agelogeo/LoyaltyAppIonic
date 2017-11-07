import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { Chart } from 'chart.js';
import {MyLinks} from "../../services/mylinks";
import {Http} from "@angular/http";
import {PieChartForm} from "../../model/piechartForm";
import {LineChartForm} from "../../model/linechartForm";
import {DaysChartForm} from "../../model/dayschartForm";

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
export class StatsPage implements OnInit{


  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  barTitle:any;
  doughnutChart: any;
  doughnutTitle:any;
  lineChart: any;
  lineTitle:any;

  results = [];
  myDate : string;


  date = new Date();



  constructor(private actionSheetCtrl:ActionSheetController,private ml: MyLinks,public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController,private alertCtrl:AlertController,private toastCtrl: ToastController) {
  }

  pieChartForm = new PieChartForm();
  lineChartForm = new LineChartForm();
  daysChartForm = new DaysChartForm();


  ngOnInit() {
    this.myDate = new Date().toISOString();

    console.log(this.ml.base+this.ml.a_get_available_months);
    this.http.get(this.ml.base+this.ml.a_get_available_months)
      .map(res => res.json()).subscribe(data => {

      if (data.error != null) {
        const toast = this.toastCtrl.create({
          message: data.message
        });
        toast.present();
      }else {
        for(var i=0;i<data.results.length;i++){
          this.results.push(data.results[i].MONTH);
        }
      }
    });

  }

  // BAR CANVAS
  daysChartSettings(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Days Chart - Choose free dimension',
      buttons: [
        {
          text: 'Last week',
          handler: () => {
            this.makeTheDaysCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'7','Last week');
          }
        },{
          text: 'Last month',
          handler: () => {
            this.makeTheDaysCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'30','Last month');
          }
        },{
          text: 'Last 6 months',
          handler: () => {
            this.makeTheDaysCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'180','Last 6 months');
          }
        },{
          text: 'Last year',
          handler: () => {
            this.makeTheDaysCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'365','Last year');
          }
        },{
          text: 'All Time',
          handler: () => {
            this.makeTheDaysCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'1000','All Time');
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

  makeTheDaysCall(date : string, hours : string, interval : string, title : string){
    const loading = this.loadingCtrl.create({
      content : 'Please wait..'
    });
    loading.present();

    console.log(this.ml.base+this.ml.a_get_days_chart+'&date='+date+'&interval='+interval);
    this.http.get(this.ml.base+this.ml.a_get_days_chart+'&date='+date+'&interval='+interval)
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

        this.daysChartForm = new DaysChartForm();
        for(var i=0;i<data.results.length;i++){
          this.daysChartForm.names.push(data.results[i].names);
          this.daysChartForm.counts.push(data.results[i].counts);
          this.daysChartForm.getRandomColor();
        }
        this.barTitle=title;
        this.startDaysChart();
      }
    });

  }
  // END OF BAR CANVAS



  // DOUGHNAT GRAPH
  pieChartSettings(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Chart Pie - Choose free dimension',
      buttons: [
        {
          text: 'Today',
          role: 'destructive',
          handler: () => {

            this.makeThePieCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'-1','Today');
          }
        },{
          text: 'Yesterday',
          handler: () => {
            this.makeThePieCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'1','Yesterday');
          }
        },{
          text: 'Last week',
          handler: () => {
            this.makeThePieCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'7','Last week');
          }
        },{
          text: 'Last month',
          handler: () => {
            this.makeThePieCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'30','Last month');
          }
        },{
          text: 'Last 6 months',
          handler: () => {
            this.makeThePieCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'180','Last 6 months');
          }
        },{
          text: 'Last year',
          handler: () => {
            this.makeThePieCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'365','Last year');
          }
        },{
          text: 'All Time',
          handler: () => {
            this.makeThePieCall((this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate()).toString(),this.date.getHours().toString(),'1000','All Time');
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

  makeThePieCall(date : string, hours : string, interval : string, title : string){

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
        this.doughnutTitle=title;
        this.startPieChart();
      }
    });

  }
  //END OF DOUGHNAT GRAPH


  //LINE CHART
  getAvailableMonths(){
    return this.results;
  }

  getDate(){
    this.makeTheLineCall(this.myDate.slice(0,10),'5','Today');
  }


  makeTheLineCall(date : string, hours : string, title : string){
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
        this.lineTitle=date;
        this.startLineChart();
      }
    });

  }
  // END OF LINE CHART




  startDaysChart(){
    if(this.barChart!=null)
      this.barChart.destroy();
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.daysChartForm.names,
        datasets: [{
          label: '# of Votes',
          data: this.daysChartForm.counts,
          borderWidth: 1,
          backgroundColor: this.daysChartForm.colors,
          hoverBackgroundColor: this.daysChartForm.hover_colors
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

  startPieChart(){
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

  startLineChart(){
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
