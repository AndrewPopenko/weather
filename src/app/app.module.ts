import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { GeocodingService } from "./service/geocoding.service";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { TemperatureUnitPipe } from './pipe/temperature-unit.pipe';
import { SpeedUnitPipe } from './pipe/speed-unit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    TemperatureUnitPipe,
    SpeedUnitPipe
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        HttpClientModule,
        MatButtonModule,
        MatSelectModule,
    ],
  providers: [
    GeocodingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
