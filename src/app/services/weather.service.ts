import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient, private _appConstants: AppConstants) { }

  /**
   * @package Services
   * @class WeatherService
   * @method getDataByMetricLocation
   * @description A method to get data from the desired API
   * @param metric a metric name chosen by the user
   * @param location a location name chosen by the user
   * @returns A JSON array with requested data
   */
  getDataByMetricLocation(metric: String, location: String): Observable<any> {
    return this._http.get(this._appConstants.serverUrl + metric + '-' + location + '.json').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getDataByMetricLocation'))
    );
  }

  /**
   * @package Services
   * @class WeatherService
   * @method extractData
   * @description A method to return data from the response received
   * @param res JSON/ String response received from the requesting service
   * @returns A JSON array with requested data
   */
  public extractData(res: Response): any {
    let body = res;
    return body || [];
  }

  /**
   * @package Services
   * @class WeatherService
   * @method handleError
   * @description A method to return human readable errors
   * @param operation service method that requested a resource
   * @param result usually an error response from a server
   * @returns An observable of error response
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
