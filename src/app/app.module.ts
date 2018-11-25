import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppConstants } from './app.constants';
import { AppRoutingModule } from './app-routing.module';
import { WeatherModule } from './weather/weather.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    WeatherModule
  ],
  providers: [AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
