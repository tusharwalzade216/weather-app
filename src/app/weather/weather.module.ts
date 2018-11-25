import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { WeatherHomeComponent } from './weather-home/weather-home.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@NgModule({
  declarations: [
    WeatherHomeComponent,
    WeatherChartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class WeatherModule { }
