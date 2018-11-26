import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
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
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ]
})
export class WeatherModule { }
