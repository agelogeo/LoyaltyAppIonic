export class DaysChartForm{

  names = [];
  counts = [];
  colors = [];
  hover_colors = [];


  constructor(){

  }

  getRandomColor() {
    //var letters = '0123456789ABCDEF'.split('');
    var red : number;
    red = Math.floor(Math.random() * (255 - 0)) + 0;

    var green : number;
    green = Math.floor(Math.random() * (255 - 0)) + 0;

    var blue : number;
    blue = Math.floor(Math.random() * (255 - 0)) + 0;

    this.colors.push('rgba('+red+','+green+','+blue+', 0.8)');
    this.hover_colors.push('rgba('+red+','+green+','+blue+', 1.0)');
  }
}
