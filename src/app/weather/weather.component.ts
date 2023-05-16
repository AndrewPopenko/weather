import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GeocodingService } from "../service/geocoding.service";
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { WeatherService } from "../service/weather.service";
import { Option } from "../shared/option";
import { Geo } from "../shared/geo";
import { Units } from "../shared/units";
import { ErrorService } from "../service/error.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
    unit: new FormControl(Units.Metric)
  });

  options: Option[] = [];
  units = [Units.Metric, Units.Imperial];
  unit: Units = Units.Metric;
  // need data model
  // @ts-ignore
  weatherData: any;
  errorMsg: Observable<string> = new Observable<string>();

  private readonly destroyed: Subject<void> = new Subject<void>();

  constructor(
    private geocodingService: GeocodingService,
    private weatherService: WeatherService,
    private errorService: ErrorService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  findCity(ctrl: string | Object): Observable<any> {
    // @ts-ignore
    ctrl = typeof ctrl === 'object' ? ctrl['key']?.split(' ') : ctrl
    // @ts-ignore
    return this.geocodingService.getCitiesList(ctrl)
  }

  ngOnInit(): void {
    this.errorMsg = this.errorService.errorMessage$();

    // @ts-ignore
    this.formGroup.get('city').valueChanges
      .pipe(
        takeUntil(this.destroyed),
        // @ts-ignore
        debounceTime(300),
        filter((value: string) => value !== undefined && value !== null && value !== ''),
        switchMap((ctrl: string) => this.findCity(ctrl)))
      .subscribe(
        // need data model but I use any
        (resp: any) => {
          // clear list of cities
          this.options = [];
          resp?.forEach((it: any) => {
            const cityNameWithCountryCode = `${ it?.name } ${ it?.country }`;
            const geoLocation = { 'lat': it?.lat, 'lon': it?.lon };
            this.options.push({ key: cityNameWithCountryCode, val: geoLocation });
          });
        }
      );
  }

  displayFn(val: any): string {
    return val && val.key ? val.key : '';
  }

  onSubmit() {
    this.errorService.setErrorMessage('')
    // @ts-ignore
    this.unit = this.formGroup.value.unit
    // @ts-ignore
    this.weatherService.getCurrentWeather(this.formGroup.value.city['val'] as Geo, this.formGroup.value.unit as string)
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.weatherData = res;
      });
  }

  formatTime(timestamp: number, timezone: number) {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString([], { timeStyle: 'short' });
  }

  formatDate(timestamp: number, timezone: number) {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleDateString();
  }
}
