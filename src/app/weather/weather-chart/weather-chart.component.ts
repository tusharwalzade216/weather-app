import { Component, Input, OnChanges } from '@angular/core';
import * as _moment from 'moment';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnChanges {

  @Input() chartData: Array<Object>;
  @Input() metric: String;

  private xChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  private xChartLabels: Array<any>;
  private xChartType: string = 'line';
  private xChartLegend: boolean = true;

  private xChartData: Array<any>;
  private isDataAvailable: boolean = false;

  constructor() { }

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @method ngOnChanges
   * @description A lifecycle hook called on updation of chartData & metric
   * @returns void
   */
  ngOnChanges() {
    if (this.chartData.length && this.metric != undefined) {
      this.isDataAvailable = true;
    }
    let valuesArr = [], labelsArr = [];
    this.chartData.forEach((obj) => {
      labelsArr.push(_moment().month(obj['month'] - 1).format("MMM") + '\' ' + obj['year']);
      valuesArr.push(obj['value']);
    });
    this.xChartLabels = labelsArr;
    this.xChartData = [
      { data: valuesArr, label: this.metric }
    ];
  }
}
