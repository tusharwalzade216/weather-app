import { Component } from '@angular/core';
import * as _moment from 'moment';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent {

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @member metricsArray
   * @description A JSON array containing all the metrics shown in the form
   */
  public metricsArray = [
    { key: 'Max Temperature', value: 'Tmax' },
    { key: 'Min Temperature', value: 'Tmin' },
    { key: 'Rainfall', value: 'Rainfall' }
  ];

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @member locationsArray
   * @description A JSON array containing all the locations shown in the form
   */
  public locationsArray = [
    { key: 'UK', value: 'UK' },
    { key: 'England', value: 'England' },
    { key: 'Scotland', value: 'Scotland' },
    { key: 'Wales', value: 'Wales' }
  ];

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @member inputObj
   * @description An object bound to the form; sets default input values
   */
  public inputObj = {
    fromDate: _moment().subtract(2, 'years'),
    toDate: _moment(),
    selectedMetric: 'Tmax',
    selectedLocation: 'UK'
  }

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @member chartData
   * @description An array of objects to hold the data to be sent to chart component
   */
  public chartData: Array<Object> = [];

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @member chartLocation
   * @description A string to hold the location to be sent to the toolbar
   */
  public chartLocation: String;

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @member chartData
   * @description A string to hold the selected metric to be sent to chart component
   */
  public chartMetric: String;

  constructor(private _weatherService: WeatherService) {
    // initially plotting a chart with preset data
    this.onSubmit();
  }

  /**
   * @package Weather
   * @class WeatherHomeComponent
   * @method onSubmit
   * @description A method to get weather data from the service
   * @returns void
   */
  onSubmit() {
    this.chartData = [], this.chartMetric = undefined, this.chartLocation = undefined;

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
      this.chartLocation = this.inputObj.selectedLocation;
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
