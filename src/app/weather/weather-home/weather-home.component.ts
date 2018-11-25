import { Component } from '@angular/core';
import * as _moment from 'moment';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent {

  private metricsArray = [
    { key: 'Max Temperature', value: 'Tmax' },
    { key: 'Min Temperature', value: 'Tmin' },
    { key: 'Rainfall', value: 'Rainfall' }
  ];
  private locationsArray = [
    { key: 'UK', value: 'UK' },
    { key: 'England', value: 'England' },
    { key: 'Scotland', value: 'Scotland' },
    { key: 'Wales', value: 'Wales' }
  ];

  private inputObj = {
    fromDate: _moment().subtract(3, 'months'),
    toDate: _moment(),
    selectedMetric: 'Tmax',
    selectedLocation: 'UK'
  }

  private chartData: Array<Object> = [];
  private chartMetric: String;

  constructor(private _weatherService: WeatherService) { }

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @method onSubmit
   * @description A method to get weather data from the service
   * @returns void
   */
  onSubmit() {
    this.chartData = [], this.chartMetric = undefined;

    const monthsBetweenArray = this.getAllMonthsBetweenTwoDates(this.inputObj.fromDate.format('YYYY-MM-d'), this.inputObj.toDate.format('YYYY-MM-d'));

    this._weatherService.getDataByMetricLocation(this.inputObj.selectedMetric, this.inputObj.selectedLocation).subscribe((res) => {
      let filteredData = [];
      for (let index = 0; index < res.length; index++) {
        if (monthsBetweenArray.includes([res[index]['year'], res[index]['month']].join('-'))) {
          filteredData.push(res[index]);
        }
      }
      this.chartData = filteredData;
      this.chartMetric = this.inputObj.selectedMetric;
    });
  }

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @method getAllMonthsBetweenTwoDates
   * @description A method to return months between the two given dates
   * @param startDate A start date in this format YYYY-MM-d
   * @param endDate A end date in this format YYYY-MM-d
   * @returns A String array with months, eg. 2018-6
   */

  getAllMonthsBetweenTwoDates(startDate: String, endDate: String): Array<String> {
    var start = startDate.split('-');
    var end = endDate.split('-');
    var startYear = parseInt(start[0]);
    var endYear = parseInt(end[0]);
    var dates = [];

    for (var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        var month = j + 1;
        dates.push([i, month].join('-'));
      }
    }
    return dates;
  }
}
