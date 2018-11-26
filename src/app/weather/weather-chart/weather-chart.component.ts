import { Component, Input, OnChanges } from '@angular/core';
import * as _moment from 'moment';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnChanges {

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member chartData
   * @description A JSON array containing the chart data sent by the parent component
   */
  @Input() chartData: Array<Object>;

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member chartData
   * @description A string containing the metric selected from the parent component
   */
  @Input() metric: String;

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member xChartOptions
   * @description A JSON object containing the chart configurations
   */
  private xChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member xChartLabels
   * @description An array to hold the labels for the chart
   */
  private xChartLabels: Array<any>;

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member xChartType
   * @description A string to hold the chart type
   */
  private xChartType: string = 'line';

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member xChartLegend
   * @description A flag to set whether the chart legends to be shown or not
   */
  private xChartLegend: boolean = true;

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member xChartData
   * @description A JSON array to hold the chart data to be used by the chart
   */
  private xChartData: Array<any>;

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member isDataAvailable
   * @description A flag to show/ hide the chart on the basis of data availability
   */
  public isDataAvailable: boolean = false;

  /**
   * @package Weather
   * @class WeatherChartComponent
   * @member chartTypesArray
   * @description An array containing all the chart types to be shown for selection
   */
  public chartTypesArray = ['bar', 'line', 'radar'];

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
